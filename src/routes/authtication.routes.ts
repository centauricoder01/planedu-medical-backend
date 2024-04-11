import { Router } from "express";
import { addUser, forgetPassword, verifyUser } from "../controllers/authenticate.controllers";

const router = Router();

router.route("/signup").post(addUser);
router.route("/verifyuser").post(verifyUser);
router.route("/forgetpassword").post(forgetPassword);

export default router;
