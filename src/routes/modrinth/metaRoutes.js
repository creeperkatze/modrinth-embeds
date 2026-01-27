import express from "express";
import * as metaController from "../../controllers/metaController.js";

const router = express.Router();

// Modrinth meta endpoint
router.get("/modrinth/meta/:type/:id", metaController.getMeta);

// Redirect for backward compatibility
router.get("/meta/modrinth/:type/:id", (req, res) => res.redirect(301, `/modrinth/meta/${req.params.type}/${req.params.id}`));

// Default meta route (Modrinth is the default platform for /meta)
router.get("/meta/:type/:id", metaController.getMeta);

export default router;
