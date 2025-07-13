import multer from "multer";
import path from "path"; // Join paths
// Get the file name or extension
// Resolve absolute paths
import fs from "fs"; // Save uploaded files
// Read config files
// Delete temp files
// Read/write JSON or logs

// Create folders
const imageDir = "uploads/patient_images";
const pdfDir = "uploads/patient_documents";
fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(pdfDir, { recursive: true });

export const uploadImage = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, imageDir),
    filename: (_, file, cb) =>
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      ),
  }),
});

export const uploadPDF = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, pdfDir),
    filename: (_, file, cb) =>
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      ),
  }),
  fileFilter: (_, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"));
  },
});
