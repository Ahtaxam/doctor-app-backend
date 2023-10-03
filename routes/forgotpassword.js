import express from "express";
import { forgotPassword } from "../controllers/forgotpasswordController.js";

const router = express.Router();

router.post('/', forgotPassword)
export default router