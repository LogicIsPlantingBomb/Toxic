# Toxic


A full-stack web platform where users post their **unpopular opinions** anonymously, and the community battles it out with **votes** and **comment fights** in real-time.

## 🔥 Features

- ✍️ Anonymous posting of hot takes
- 🗳️ Real-time voting (upvote/downvote)
- 💬 Comment battles with threaded replies
- �� "Battle Royale" logic — harshly downvoted opinions get eliminated
- 🖼️ Image support in posts (via `multer`)
- 🧠 WebSocket-powered live updates (Socket.IO)
- 🎨 Grungy underground fight club-themed UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router DOM
- Framer Motion (for animations)
- Socket.IO Client

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Multer (for image uploads)
- JWT Authentication
- Socket.IO
- CORS + dotenv + Helmet

---

## 🚀 Project Structure

```
backend/
├── app.js
├── controllers/
│   ├── comment.controller.js
│   ├── post.controller.js
│   └── user.controller.js
├── db/
│   └── db.js
├── middlewares/
│   ├── auth.middleware.js
│   └── upload.middleware.js
├── models/
│   ├── userModel.js
│   ├── post.model.js
│   ├── comment.model.js
│   └── blacklistToken.model.js
├── routes/
│   ├── user.routes.js
│   ├── post.routes.js
│   └── comment.routes.js
├── services/
│   └── userServices.js
├── uploads/
│   └── posts/ (Image uploads)
├── .env
├── server.js
└── README.md

frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Feed.jsx
│   │   ├── RegisterUser.jsx
│   │   └── LoginUser.jsx
│   ├── components/
│   └── App.jsx
├── public/
├── .env
└── vite.config.js
```

---

## ⚙️ Setup Instructions

### Backend

1. **Clone repo & install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Create `.env` file**
   ```env
   PORT=3000
   MONGO_URI=your_mongo_connection
   JWT_SECRET=your_jwt_secret
   CLIENT_URL=http://localhost:5173
   ```

3. **Run the server**
   ```bash
   node server.js
   ```

---

### Frontend

1. **Move to frontend & install**
   ```bash
   cd frontend
   npm install
   ```

2. **Create `.env`**
   ```env
   VITE_API_URL=http://localhost:3000
   ```

3. **Run the dev server**
   ```bash
   npm run dev
   ```

---

## 🔪 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/register` | Register new user |
| `POST` | `/api/login` | Login user |
| `POST` | `/api/posts/create` | Create new post (with image) |
| `GET`  | `/api/posts/feed` | Get all posts (paginated) |
| `POST` | `/api/comments/` | Add a comment or reply |
| `GET`  | `/api/comments/:postId` | Get comments for a post |
| `PUT`  | `/api/comments/vote/:commentId` | Upvote/Downvote a comment |

---

## 🔴 WebSocket Events

- `new-comment` → Broadcast new comment in real-time
- `new-vote` → Broadcast updated vote scores
- `post-eliminated` → Notify when a post is downvoted into oblivion

---

## 📸 Screenshots

> _Coming soon..._

---

## 🤝 Contributing

Pull requests welcome! Open an issue or submit a PR if you have ideas for new features or find bugs.

---

## 🧠 Inspiration

Built as a chaotic playground where **freedom of thought** meets **internet gladiator fights** — inspired by underground fight clubs, Reddit hot takes, and late-night Twitter rants.

---


