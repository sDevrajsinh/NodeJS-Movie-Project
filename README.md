# 🎬 Movie Management System

A comprehensive full-stack web application for managing your movie collection, built with Node.js, Express.js, and MongoDB following the MVC architecture pattern.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=black)

## ✨ Features

### Core Functionality
- ✅ **Full CRUD Operations** - Create, Read, Update, and Delete movies
- 🖼️ **Image Upload** - Upload movie posters using Multer
- 🔍 **Advanced Search** - Search movies by title, description, or director
- 🎭 **Genre Filtering** - Filter movies by genre
- 📊 **Sorting Options** - Sort by year, title, rating, or date added
- ⭐ **Rating System** - Rate movies from 0-10
- 📱 **Responsive Design** - Works perfectly on all devices

### Technical Features
- 🏗️ **MVC Architecture** - Clean separation of concerns
- 🔄 **Async/Await** - Modern asynchronous programming
- 🛡️ **Input Validation** - Both client and server-side validation
- 📁 **File Handling** - Secure file upload with validation
- 🎨 **Modern UI/UX** - Beautiful, premium design with animations
- 🌐 **RESTful API** - Clean and organized routing
- 💾 **MongoDB Integration** - Efficient database operations with Mongoose

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd "c:\Users\LENOVO\OneDrive\Desktop\NodeJS\Projects\New folder"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   The `.env` file is already created with default values:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/movieDB
   NODE_ENV=development
   ```

4. **Start MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # Windows (if MongoDB is installed as a service)
   net start MongoDB
   
   # Or run mongod directly
   mongod
   ```

5. **Run the application**
   
   Development mode (with auto-restart):
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

6. **Access the application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
movie-management-system/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── movieController.js   # Business logic for movie operations
├── middleware/
│   ├── errorHandler.js      # Error handling middleware
│   ├── logger.js            # Request logging middleware
│   └── upload.js            # Multer file upload configuration
├── models/
│   └── Movie.js             # Mongoose schema and model
├── public/
│   ├── css/
│   │   └── style.css        # Application styles
│   ├── js/
│   │   └── main.js          # Client-side JavaScript
│   └── uploads/             # Uploaded movie posters
├── routes/
│   └── movieRoutes.js       # Express routes
├── views/
│   ├── movies/
│   │   ├── index.ejs        # Movie list page
│   │   ├── new.ejs          # Add movie form
│   │   ├── show.ejs         # Movie details page
│   │   └── edit.ejs         # Edit movie form
│   ├── partials/
│   │   ├── navbar.ejs       # Navigation bar
│   │   └── footer.ejs       # Footer
│   └── error.ejs            # Error page
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
├── package.json            # Project dependencies
├── server.js               # Application entry point
└── README.md               # This file
```

## 🎯 Node.js Concepts Demonstrated

This project comprehensively demonstrates all major Node.js concepts:

### 1. **Modules**
- Built-in modules: `fs`, `path`
- Third-party modules: `express`, `mongoose`, `multer`, `dotenv`
- Custom modules: controllers, models, middleware

### 2. **Express.js**
- Routing and route parameters
- Middleware (built-in and custom)
- Static file serving
- Template engine (EJS)
- Request/response handling

### 3. **MongoDB & Mongoose**
- Schema definition
- Model creation
- CRUD operations
- Validation
- Virtuals and methods
- Query building

### 4. **Async/Await**
- Asynchronous database operations
- Error handling with try/catch
- Promise-based file operations

### 5. **Middleware**
- Custom logger middleware
- Error handling middleware
- File upload middleware (Multer)
- Method override middleware

### 6. **File Upload**
- Multer configuration
- File validation
- Storage configuration
- File size limits

### 7. **MVC Architecture**
- Models: Data structure and database interaction
- Views: EJS templates for UI
- Controllers: Business logic

### 8. **RESTful Routing**
- GET, POST, PUT, DELETE methods
- Route parameters
- Query strings

## 🎨 Features in Detail

### Movie Management
- **Add Movies**: Upload poster, add title, year, genre, rating, director, and description
- **View Movies**: Browse all movies in a beautiful grid layout
- **Search**: Find movies by title, description, or director
- **Filter**: Filter by genre
- **Sort**: Sort by year, title, rating, or date added
- **Edit**: Update movie information and poster
- **Delete**: Remove movies from the collection

### Data Validation
- Title: Required, max 100 characters
- Year: Required, between 1888 and current year + 5
- Description: Required, max 1000 characters
- Genre: Required, predefined options
- Rating: Optional, 0-10
- Poster: Optional, max 5MB, image files only

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/movies` | Get all movies (with optional search/filter) |
| GET | `/movies/new` | Show add movie form |
| POST | `/movies` | Create new movie |
| GET | `/movies/:id` | Get single movie |
| GET | `/movies/:id/edit` | Show edit movie form |
| PUT | `/movies/:id` | Update movie |
| DELETE | `/movies/:id` | Delete movie |

## 🎨 Design Features

- **Modern Dark Theme**: Easy on the eyes
- **Gradient Accents**: Beautiful color transitions
- **Smooth Animations**: Hover effects and transitions
- **Glassmorphism**: Modern UI design trend
- **Responsive Grid**: Adapts to all screen sizes
- **Custom Scrollbar**: Themed scrollbar
- **Loading States**: Visual feedback for actions

## 🔒 Security Features

- Input validation (client and server-side)
- File type validation
- File size limits
- XSS protection through EJS escaping
- Environment variable protection

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/movieDB |
| `NODE_ENV` | Environment mode | development |

## 🤝 Contributing

This is a learning project demonstrating Node.js concepts. Feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues

## 📄 License

ISC License - Feel free to use this project for learning purposes.

## 🙏 Acknowledgments

- Built as a comprehensive demonstration of Node.js, Express, and MongoDB
- Demonstrates MVC architecture and best practices
- Modern UI/UX design principles
- RESTful API design

## 📞 Support

If you encounter any issues:
1. Make sure MongoDB is running
2. Check that all dependencies are installed
3. Verify environment variables are set correctly
4. Check the console for error messages

---

**Happy Movie Managing! 🎬🍿**
