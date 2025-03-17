# JavaScript Fullstack Blog App

This repository contains a **Node.js backend** and a **React frontend** for a full-stack web application.

## Demo Url
https://js-fullstack-blog-app-dz.vercel.app/

## Folder Structure

```
/project-root
│── backend/    # Node.js backend (Express, MongoDB)
│── frontend/   # React frontend (React.js)
```

---

## Backend Setup

### Prerequisites
- Node.js 20+
- MongoDB Atlas Account
- Cloudinary Account
- Gmail App Password
- Render Account (for backend deployment)

### Environment Variables
Create a `.env` file inside the `backend/` directory and add the following:

```
ATLAS_URI=mongodb+srv://<username>:<password>@<url>/<database-name>?retryWrites=true&w=majority&appName=<cluster-name>
JWT_SECRET=<your-secret-key>
BACKEND_BASE_URL=<your-backend-url>
EMAIL_USER=<your-gmail-app-user>
EMAIL_PASS=<your-gmail-app-password>
FRONTEND_BASE_URL=<your-frontend-url>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
```

### Installation
```sh
cd backend
npm install
```

### Running the Server
```sh
npm start
npm run dev (for local development)
```

The backend will run on `http://localhost:5050` (or the port specified in your configuration).

### Deployment
The backend is deployed on **Render**. Ensure all environment variables are set in Render's environment settings.

---

## Frontend Setup

### Prerequisites
- Node.js 20+
- Vercel Account (for deployment)

### Environment Variables
Create a `.env` file inside the `frontend/` directory and add the following:

```
REACT_APP_API_BASE_URL=http://localhost:5050
REACT_APP_DEFAULT_FETCH_BLOGS_LIMIT=6
```

### Installation
```sh
cd frontend
npm install
```

### Running the Frontend
```sh
npm start
```

The frontend will run on `http://localhost:3000`.

### Deployment
The frontend is deployed on **Vercel**. Ensure all environment variables are set in Vercel's environment settings.

---

## Tech Stack
- **Backend:** Node.js, Express, MongoDB Atlas
- **Frontend:** React
- **Deployment:** Render (backend), Vercel (frontend)
- **Other Services:** Cloudinary (image hosting), Gmail App Password (email service)

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a pull request

---

## License
[MIT](LICENSE)

