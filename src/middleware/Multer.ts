
import express, { Request } from 'express';
import multer, { StorageEngine, FileFilterCallback } from 'multer';
import path from 'path';

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void


interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}


// Configure Multer disk storage
const fileStorage: StorageEngine = multer.diskStorage({
    destination: (
        req: Request, 
        file: UploadedFile, 
        cb: DestinationCallback
    ) => {
        cb(null, path.join(__dirname, './uploads'));
    },
    filename: (
        req: Request, 
        file: UploadedFile, 
        cb: FileNameCallback
    ) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extname = path.extname(file.originalname);
        // const filename = file.originalname.split(".")[0];
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    },
});

const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true)
    } else {
        callback(null, false)
    }
}

export const upload = multer({ storage: fileStorage, fileFilter: fileFilter });



// app.post('/upload', upload.single('image'), (req: Request, res: Response) => {
//     const uploadedFile = req.file as UploadedFile;

//     if (!uploadedFile) {
//         return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const filePath = uploadedFile.path;

//     return res.json({ imagePath: filePath });
// });


