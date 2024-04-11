import { Router } from "express";
import { addPatient, getPatient } from "../controllers/patients.controllers";

const router = Router();

router.route("/addpatient").post(addPatient);
router.route("/getpatient").get(getPatient);

export default router;
