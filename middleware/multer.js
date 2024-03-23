import multer from "multer";
import path from "path";

export const upload =  multer({
  storage: multer.diskStorage({
    destination: "uploads/",
filename: (req, file, callback) => {
    // TODO: find better way to handle file name
    callback(null, file.originalname);
    }
  }),
  // limit to 2MB to prevent DOS attacks
  limits: { fileSize: 2097152 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
      return cb(null, false);
    }
    cb(null, true);
  },
});