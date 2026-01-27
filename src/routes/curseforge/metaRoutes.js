import express from "express";
import * as curseforgeController from "../../controllers/curseforgeController.js";

const router = express.Router();

router.get("/curseforge/meta/:projectId", curseforgeController.getCfMeta);

export default router;
