import jimp from "jimp"; // Import the jimp library
import multer, { FileFilterCallback } from 'multer';
// import sharp from 'sharp';
import { Request, Response, NextFunction } from 'express';
import path from "path";
import fs from "fs";

interface RequestWithFiles extends Request {
    files?: Express.Multer.File[];
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/"));
    },
    filename: function (req, file, cb) {
        const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
    },
});

const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback | any): void => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Unsupported file format"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 },
});

// const upload = multer({ storage, fileFilter: multerFilter });

// const imageResizes = async (destination: string, files?: Express.Multer.File[]) => {
//     if (!files) return;
//     await Promise.all(
//         files.map(async (file) => {
//             await sharp(file.path)
//                 .resize(300, 300)
//                 .toFormat("jpeg")
//                 .jpeg({ quality: 90 })
//                 .toFile(`public/images/${destination}/${file.filename}`);
//             fs.unlinkSync(`public/images/${destination}/${file.filename}`);
//         })
//     );
// };


// import fs from "fs";
// import path from "path";


interface File {
  path: string;
  filename: string;
}

async function imageResize(destination: string, files?: Express.Multer.File[]): Promise<void> {
  if (!files) return;

  await Promise.all(
    files.map(async (file) => {
      const resizedImage = await jimp.read(file.path);
      await resizedImage
        .resize(300, 300)
        .quality(90)
        .writeAsync(`public/images/${destination}/${file.filename}`);
        
      fs.unlinkSync(file.path); // Remove the original image file
    })
  );
}

// Example usage
// const files: File[] = [
//   {
//     path: "path/to/image.jpg",
//     filename: "image.jpg",
//   },
//   // ... add more files here
// ];

// imageResize("products", files).catch((error) => {
//   console.error("Error resizing images:", error);
// });



export { upload, imageResize };
