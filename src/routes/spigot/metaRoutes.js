import express from "express";
import * as spigotController from "../../controllers/spigotController.js";

const router = express.Router();

router.get("/spigot/meta/:id", spigotController.getSpigotMeta);

export default router;
