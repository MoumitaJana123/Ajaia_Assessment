const express = require('express');
const router = express.Router();
const Document = require('../models/Document');
const User = require('../models/User');
const verifyToken = require('../middleware/auth');
const multer = require('multer');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

// Dashboard: List owned & shared documents
router.get('/', verifyToken, async (req, res) => {
  try {
    const ownedDocs = await Document.find({ owner: req.user.id }).sort({ updatedAt: -1 });
    const sharedDocs = await Document.find({ sharedWith: req.user.id }).populate('owner', 'email name');
    res.render('dashboard', { user: req.user, ownedDocs, sharedDocs });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create new document
router.post('/create', verifyToken, async (req, res) => {
  try {
    const newDoc = await Document.create({
      title: 'Untitled Document',
      content: '',
      owner: req.user.id
    });
    res.redirect(`/documents/${newDoc._id}`);
  } catch (err) {
    res.status(500).send('Error creating document');
  }
});

// View/Edit specific document
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) return res.status(404).send('Document not found');

    const isOwner = doc.owner.toString() === req.user.id;
    const isShared = doc.sharedWith.map(id => id.toString()).includes(req.user.id);

    if (!isOwner && !isShared) return res.status(403).send('Access Denied');

    res.render('editor', { doc, isOwner });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Save/Update document content & title
router.post('/:id/update', verifyToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const doc = await Document.findById(req.params.id);
    
    if (!doc) return res.status(404).send('Document not found');
    if (doc.owner.toString() !== req.user.id && !doc.sharedWith.map(id => id.toString()).includes(req.user.id)) {
      return res.status(403).send('Access Denied');
    }

    doc.title = title || doc.title;
    doc.content = content;
    await doc.save();

    res.json({ success: true, message: 'Saved successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to save' });
  }
});

// File Upload & Convert to Document
router.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send('No file uploaded');

    const filePath = req.file.path;
    const fileContent = fs.readFileSync(filePath, 'utf8');
    fs.unlinkSync(filePath); // Clean up temp file

    const newDoc = await Document.create({
      title: req.file.originalname,
      content: `<p>${fileContent.replace(/\n/g, '<br>')}</p>`,
      owner: req.user.id
    });

    res.redirect(`/documents/${newDoc._id}`);
  } catch (err) {
    res.status(500).send('Error processing file upload');
  }
});

// Share Document with another user email
router.post('/:id/share', verifyToken, async (req, res) => {
  try {
    const { email } = req.body;
    const doc = await Document.findById(req.params.id);

    if (!doc || doc.owner.toString() !== req.user.id) {
      return res.status(403).send('Unauthorized');
    }

    const targetUser = await User.findOne({ email });
    if (!targetUser) return res.redirect('/documents/' + req.params.id + '?error=UserNotFound');

    if (!doc.sharedWith.includes(targetUser._id)) {
      doc.sharedWith.push(targetUser._id);
      await doc.save();
    }

    res.redirect('/documents/' + req.params.id);
  } catch (err) {
    res.status(500).send('Sharing failed');
  }
});

module.exports = router;