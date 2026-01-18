import { Router } from "express";
import {userContact, getAllContacts, deleteContact} from "../controllers/user.controller.js"
// import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/contact").post(userContact);
router.route("/contacts").get(getAllContacts);
router.route("/contacts/:id").delete(deleteContact);
export default router;
