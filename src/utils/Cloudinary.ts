// cloudinaryService.ts
import cloudinary from 'cloudinary';
import { CloudinaryOptions } from '../interfaces/Utility/CloudinaryInterface';
import dotenv from 'dotenv';
dotenv.config();

interface CloudinaryUploadResult {
    public_id: string;
    secure_url: string;
}

export class CloudinaryService {
    private static initialized = false;

    private static cloudinaryImage: CloudinaryOptions = {
        cloud_name: process.env.CLOUD_NAME || '',
        api_key: process.env.CLOUD_API_KEY || '',
        api_secret: process.env.CLOUD_API_SECRET || '',
    };

    static initialize() {
        if (this.initialized) {
            console.warn('CloudinaryService already initialized.');
            return;
        }

        cloudinary.v2.config(this.cloudinaryImage);
        this.initialized = true;
    }

    static async uploadImage(imageAvatar: string, folderData: string): Promise<CloudinaryUploadResult> {
        this.initialize();

        try {
            const result = await cloudinary.v2.uploader.upload(imageAvatar, {
                folder: folderData,
                width: 150,
                crop: 'scale',
            });

            return {
                public_id: result.public_id,
                secure_url: result.secure_url,
            };
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw new Error('Failed to upload image to Cloudinary');
        }
    }

    static async destroyImage(imageAvatar: string): Promise<void> {
        this.initialize();

        try {
            await cloudinary.v2.uploader.destroy(imageAvatar);

        } catch (error) {
            console.error('Error deleting image to Cloudinary:', error);
            throw new Error('Failed to delete image to Cloudinary');
        }
    }
}




// Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'your-cloud-name',
//   api_key: 'your-api-key',
//   api_secret: 'your-api-secret',
// });

// Define an interface for the uploaded image response
// interface CloudinaryUploadResponse extends UploadApiResponse {
//   url: string;
// }

// // Define a type for the upload function's input
// type UploadInput = {
//   file: ReadStream;
//   folder: string;
// };

// Define the upload function
// async function uploadImage({ file, folder }: UploadInput): Promise<CloudinaryUploadResponse> {
//   try {
//     const result = await cloudinary.uploader.upload(file, {
//       folder: folder,
//     });

//     return {
//       ...result,
//       url: result.secure_url,
//     };
//   } catch (error) {
//     throw new Error('Image upload to Cloudinary failed');
//   }
// }

// // Usage example
// (async () => {
//   const filePath = 'path/to/your/image.jpg'; // Replace with the actual file path
//   const folderName = 'uploads'; // Specify the destination folder in Cloudinary

//   const fileStream = createReadStream(filePath); // Assuming you have the file to upload
//   const response = await uploadImage({ file: fileStream, folder: folderName });

//   console.log('Image uploaded to Cloudinary:');
//   console.log(response.url);
// })();

// import cloudinary from 'cloudinary';

// Define Cloudinary configuration interface
// interface CloudinaryConfig {
//   cloud_name: string;
//   api_key: string;
//   api_secret: string;
// }

// // Define Cloudinary image interface
// interface CloudinaryImage {
//   public_id: string;
//   secure_url: string;
// }

// Configure Cloudinary
// const config: CloudinaryConfig = {
//   cloud_name: 'YOUR_CLOUD_NAME',
//   api_key: 'YOUR_API_KEY',
//   api_secret: 'YOUR_API_SECRET'
// };

// cloudinary.v2.config(config);

// Upload image to Cloudinary
// async function uploadImage(path: string): Promise<CloudinaryImage> {
//   try {
//     const result = await cloudinary.v2.uploader.upload(path);
//     const image: CloudinaryImage = {
//       public_id: result.public_id,
//       secure_url: result.secure_url
//     };
//     return image;
//   } catch (error) {
//     console.error(error);
//     throw new Error('Failed to upload image to Cloudinary');
//   }
// }

// // Usage example
// const imagePath = '/path/to/image.jpg';
// uploadImage(imagePath)
//   .then((image) => {
//     console.log(`Uploaded image with public ID ${image.public_id} and URL ${image.secure_url}`);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//   (async () => {
//     const filePath = 'path/to/your/image.jpg'; // Replace with the actual file path
//     const folderName = 'uploads'; // Specify the destination folder in Cloudinary

//     const fileStream = createReadStream(filePath); // Assuming you have the file to upload
//     const response = await uploadImage({ file: fileStream, folder: folderName });

//     console.log('Image uploaded to Cloudinary:');
//     console.log(response.url);
//   })();
