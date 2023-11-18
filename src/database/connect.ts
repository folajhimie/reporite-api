import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Logging from "../Library/Logging";


mongoose.set('strictQuery',false);
export const dbConnect = async () => {
    try {
      const db = await mongoose.connect(process.env.MONGODB_URI || "", { retryWrites: true, w: 'majority' });
      console.log("Database connected to", db.connection.db.databaseName);
      Logging.warn(`${db} - connected database to the server successfully!!`);
    } catch (err) {
      if (err instanceof Error) {
        console.log("Connection to MongoBD Database has failed", err.message);
        process.exit(1);
      }
    }
};
