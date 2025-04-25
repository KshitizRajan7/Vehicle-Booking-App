import mongoose from "mongoose";

export function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT)
    .then(() => console.log("connected to DB,"))
    .catch((err) => console.error(err));
}
