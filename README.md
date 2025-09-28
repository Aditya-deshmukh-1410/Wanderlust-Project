# 🌍 Wanderlust - A full-stack property rental platform to explore, list, and review unique stays worldwide

**Wanderlust** is a modern, full-stack property rental web application (inspired by Airbnb) that allows users to explore, review, and share unique stays across the globe.  

This project served as a deep dive into backend logic, database design, and building a dynamic frontend UI — all combined into one seamless, production-ready application.  

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![Website](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://wanderlust-project-3c3u.onrender.com/)


## 🚀 Key Functionalities

Wanderlust provides a robust set of features for both travelers and property owners:

- **CRUD Operations** – Full Create, Read, Update, and Delete functionality for property listings.  
- **Cloud Image Uploads** – Upload and manage property photos using **Cloudinary** for reliable, cloud-based storage.  
- **Review System** – Users can submit ratings and detailed reviews for any property, complete with validation and timestamps.  
- **Interactive Maps** – Utilizes the **Mapbox API** to display property locations with dynamic markers and pop-ups.  
- **RESTful API** – Structured backend built with **Express Routers** for clean, modular code.  
- **Authentication** – Secure user login and authorization implemented using sessions and cookies.  

---

## 📌 Demo

- **Live Project:** [https://wanderlust-project-3c3u.onrender.com/]  


## 🛠️ Tech Stack & Key Utilities

| Category     | Technology                          | Purpose                                         |
|--------------|-------------------------------------|-------------------------------------------------|
| **Frontend** | HTML, CSS, Bootstrap                | UI structure and styling                        |
| **View**     | EJS (Embedded JavaScript)           | Dynamic view rendering                          |
| **Backend**  | Node.js, Express.js                 | Server-side runtime and web framework           |
| **Database** | MongoDB, Mongoose                   | NoSQL database and Object Data Modeling (ODM)   |
| **Storage**  | Cloudinary                          | Cloud-based image hosting and management        |
| **Mapping**  | Mapbox                              | Interactive maps and geocoding                  |
| **Deploy**   | Render                              | Cloud hosting and deployment                    |
| **Utils**    | Multer, Joi, Custom Middleware      | File handling, schema validation, error handling|

---

## 💡 Major Learnings & Challenges

### Major Learnings
- **Full-Stack Architecture** – Designing and structuring a complete app from DB to UI.  
- **Cloud Integration** – Implementing Cloudinary for scalable image storage.  
- **Geospatial Data** – Using Mapbox API for location data, interactive maps, and geocoding.  
- **Deployment** – Successfully deploying a MongoDB-backed full-stack app on Render.  
- **Error Handling Patterns** – Built custom middleware (`ExpressError`, `wrapAsync`) + validation with Joi.  

### Challenges Faced
- **Image Pipeline** – Transition from local storage to persistent Cloudinary uploads with environment variables.  
- **Map Integration** – Configuring Mapbox to display coordinates, markers, and pop-ups dynamically.  

---

## 📌 Project Structure
```
Wanderlust-Project/
├── controllers/        # Request handling logic
├── models/             # Mongoose schemas (User, Listing, Review)
├── routes/             # Express routers
├── views/              # EJS templates
├── public/             # Static CSS, JS, images
├── utils/              # Helpers, validation schemas, error wrappers
├── middleware.js       # Custom middlewares
├── cloudConfig.js      # Cloudinary config
├── app.js               # Entry point
├── package.json
└── README.md

```

## 🧰 Installation & Usage

### Prerequisites

- Node.js & npm installed  
- MongoDB cluster / connection URI  
- Cloudinary account  
- Mapbox token  

### Setup Steps

1. Clone the repo:  
   ```bash
   git clone https://github.com/Aditya-deshmukh-1410/Wanderlust-Project.git

2. cd Wanderlust-Project
   npm install

3. Set up your environment variables (create .env file):
   
   ATLAS_URL="your_mongo_connection_string"
   CLOUD_NAME="your_cloudinary_cloud_name"
   CLOUD_API_KEY="your_cloudinary_api_key"
   CLOUD_API_SECRET="your_cloudinary_api_secret"
   MAP_TOKEN="your_mapbox_access_token"

4. Start the app:
   node app.js or nodemon app.js

5. Open the application in your browser:
   http://localhost:8080

