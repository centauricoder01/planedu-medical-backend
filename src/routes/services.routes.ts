import { Router } from "express";
import {
  addServices,
  getServices,
  updateServices,
  deleteServices,
} from "../controllers/services.controllers";

const router = Router();

router.route("/addservices").post(addServices);
router.route("/getservices").get(getServices);
router.route("/updateservices/:patientId").patch(updateServices);
router.route("/deleteservices/:userId").delete(deleteServices);

export default router;
