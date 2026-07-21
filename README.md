# AI-Native Document Editor

A lightweight full-stack document editor developed for the **Ajaia AI-Native Full Stack Developer Assessment**.

The application allows users to create, edit, save, upload, and share rich-text documents through a clean web interface. It demonstrates full-stack development, persistent storage, document sharing, and practical engineering decisions within a focused project scope.

---

## Features

### Authentication

- Lightweight login using seeded test users
- Session-based authentication
- Document ownership support

### Document Management

- Create new documents
- Rename existing documents
- Rich-text editing
- Save document changes
- Reopen previously saved documents

### Rich Text Editing

Supports:

- Bold
- Italic
- Underline
- Headings
- Ordered Lists
- Bullet Lists

Powered by **Quill.js**.

### File Upload

Supports importing:

- `.txt`
- `.md`

Uploaded files can be converted into editable documents.

### Document Sharing

- Share documents with another registered user
- Owner can grant access
- Separate views for:
  - My Documents
  - Shared With Me

### Persistence

Documents and sharing information are stored in MongoDB, allowing data to remain available after refresh or restart.

### User Experience

- Save status indicator
- Responsive interface
- Basic validation
- Error handling

---

# Tech Stack

## Frontend

- HTML
- Tailwind CSS
- EJS
- JavaScript
- Quill.js Rich Text Editor

## Backend

- Node.js
- Express.js

## Database

- MongoDB Atlas
- Mongoose

## Deployment

- Render

---

# Project Structure

```
Ajia_Assessment/

├── models/
├── routes/
├── views/
├── public/
├── middleware/
├── uploads/
├── app.js
├── package.json
├── README.md
└── ...
```

---

# Local Setup

## 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd Ajia_Assessment
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

SESSION_SECRET=your_session_secret
```

> **Do not commit your `.env` file or database credentials to GitHub.**

---

## 4. Start the application

```bash
npm start
```

or

```bash
npm run dev
```

(if using nodemon)

---

## 5. Open in Browser

```
http://localhost:3000
```

---

# Test User Accounts

Use the following seeded users to test document sharing.

## Alice

Email

```
alice@ajaia.test
```

Password

```
password123
```

---

## Bob

Email

```
bob@ajaia.test
```

Password

```
password123
```

---

# Sharing Workflow

1. Login as Alice.
2. Create a document.
3. Edit and save it.
4. Share it with Bob.
5. Logout.
6. Login as Bob.
7. Open **Shared Documents**.
8. Verify the shared document is accessible.

---

# Supported File Types

- `.txt`
- `.md`

---

# Validation & Error Handling

The application includes basic validation such as:

- Required document title
- Required login credentials
- Invalid login handling
- File type validation
- Unauthorized access protection
- Save error handling

---

# Live Deployment

**Application URL**

```
YOUR_RENDER_URL
```

Example:

```
https://ajia-assessment.onrender.com
```

---

# Repository

GitHub Repository

```
YOUR_GITHUB_REPOSITORY_URL
```

---

# Future Improvements

Given additional development time, the following enhancements would be implemented:

- Real-time collaborative editing
- Document version history
- Commenting system
- Export to PDF
- Markdown export
- Role-based permissions
- Autosave
- Search functionality
- Rich media support
- Responsive mobile optimization

---

# License

This project was created solely for the **Ajaia AI-Native Full Stack Developer Assessment**.

---

# Author

**Moumita Jana**

GitHub

```
YOUR_GITHUB_REPOSITORY_URL
```


## Architecture Overview

```
Browser
    │
    ▼
Express.js Server
    │
    ▼
MongoDB Atlas
```

The application follows a simple MVC architecture:

- Views: EJS templates
- Controllers: Express route handlers
- Models: Mongoose schemas
- Database: MongoDB Atlas

- ## Future Improvements

- Real-time collaboration
- Document version history
- Export to PDF
- Autosave
- Role-based sharing permissions
