import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

export const dbConnect = async () => {
    try {
      const db = await mongoose.connect(process.env.MONGO_URI || "", { retryWrites: true, w: 'majority' });
      console.log("Database connected to ", db.connection.db.databaseName);
    } catch (err) {
      if (err instanceof Error) {
        console.log("Connection to MongoBD Database has failed", err.message);
        process.exit(1);
      }
    }
};
