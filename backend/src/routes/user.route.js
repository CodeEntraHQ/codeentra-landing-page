import { Router } from "express";
import {userContact} from "../controllers/user.controller.js"
// import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/contact").post(userContact);
export default router;
