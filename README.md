# Blogian - Full Stack Blog Application

Blogian is a full-stack blog application built with **Next.js**, **MongoDB**, and **Tailwind CSS**. Authenticated users can create, read, update, and delete blogs and comments. The app features a dynamic UI with dark/light mode support, responsive design, and a RESTful API.

---

## 🚀 Features

* ✅ User Authentication using **JWT**
* ✍️ Full **CRUD operations** for Blogs and Comments
* 💬 Only **authors** can edit or delete their own comments
* 👍 Login user can also likes each other comments
* 🔐 Protected routes and pages for authenticated users
* 🌓 **Dark and Light Theme Toggle** using Context API and Tailwind
* 🔍 Blog listing with **sorting, pagination**, and **filtering**
* 🖥️ Fully **Responsive Design** (Mobile & Desktop)
* 📦 RESTful APIs with proper error handling
* 🧠 Global state management with **React Context**

---

## 🛠️ Tech Stack

* **Frontend**: Next.js (App Router), Tailwind CSS, React Icons, Google Fonts
* **Backend**: Node.js API routes in Next.js
* **Database**: MongoDB with Mongoose
* **Authentication**: JWT-based Auth
* **State Management**: React Context

---

## 📁 Project Structure

```
├── app
│   ├── page.js             # Homepage
│   ├── blog
│   │   └── [id]/page.js    # Blog detail page
│   └── login/register.js   # Auth pages
├── components              # Header, Footer, BlogCard, etc.
├── context                 # Theme and Blog Context Providers
├── lib                     # DB connection & JWT utils
├── models                  # Mongoose models (User, Blog, Comment)
├── api                     # Next.js API Routes
├── public                  # Assets
└── styles
```

---

## 🔐 Authentication

* Users can **register** and **login** via `/register` and `/login`
* JWT is stored in HTTP-only cookie
* Protected routes are validated using token in API route
* `getUserFromToken()` is used in API to authenticate user

---

## 📘 Blog APIs

### POST `/api/blog`

* Create a new blog (Auth Required)

### GET `/api/blogs`

* Get all blogs with sorting & pagination

  * Query params: `page`, `limit`, `sortBy`, `category`

### GET `/api/blog/:id`

* Get single blog by ID

### PUT `/api/blog`

* Update blog (Only author can update)

### DELETE `/api/blog`

* Delete blog (Only author can delete)

---

## 💬 Comment APIs

### POST `/api/comment`

* Add comment (Auth Required)

### PUT `/api/comment`

* Update comment (Only author)

### DELETE `/api/comment`

* Delete comment (Only author)

---

## 🌓 Theme Support

* Dark/Light theme toggle via Context API
* User preference stored in localStorage
* Tailwind configured with `darkMode: 'class'`

---

## 🧪 How to Run This Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/blogian.git
cd blogian
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 4. Run the Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`


