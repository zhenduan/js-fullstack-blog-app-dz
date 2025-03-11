import cloudinaryPackage from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const cloudinary = cloudinaryPackage.v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "blog_covers", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allowed file formats
    // transformation: [{ width: 500, height: 500, crop: "limit" }], // Optional: Resize image
  },
});

// Initialize Multer with the storage engine
const upload = multer({ storage: storage });

export default upload; // Export the upload middleware as the default export
