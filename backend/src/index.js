import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./lib/db.js";
import {app , server } from "./lib/socket.js"
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();


const PORT = process.env.PORT;

//middlewares

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
    );

//routes
import authRoutes from "./routes/auth.route.js";
import messageRoute  from "./routes/message.route.js"


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
  }


//server
server.listen(PORT, () => {
    console.log("server is running on PORT:" + PORT);
    connectDB();
});