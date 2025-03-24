import express from 'express'
const authRoutes = express.Router();
import {protectRoute} from "../middleware/auth.middleware.js"
import { signup , login , logout, updateProfile , checkAuth } from "../controllers/auth.controller.js"


authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout );

authRoutes.put("/update-profile" , protectRoute , updateProfile)

authRoutes.get("/check-auth", protectRoute , checkAuth)


export default authRoutes;