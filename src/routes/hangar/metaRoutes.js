import express from "express";
import * as hangarController from "../../controllers/hangarController.js";

const router = express.Router();

router.get("/hangar/meta/:slug", hangarController.getHangarMeta);

export default router;
