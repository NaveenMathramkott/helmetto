import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";

const app = express();
dotenv.config();

//dataBase config
connectDB();

//middleWare
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//api routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);

// first api
app.get("/", (req, res) => {
  res.send("welcome to E-commerce 2023");
});

//sever creation

const PORT = process.env.PORT;
app.listen(PORT, () =>
  console.log(`server running on ${process.env.DEV_MODE} on port ${PORT}`)
);
