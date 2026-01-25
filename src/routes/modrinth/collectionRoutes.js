import express from "express";
import * as cardController from "../../controllers/cardController.js";
import * as badgeController from "../../controllers/badgeController.js";

const router = express.Router();

// Modrinth prefixed routes
router.get("/modrinth/collection/:id", cardController.getCollection);

router.get("/modrinth/collection/:id/downloads", badgeController.getCollectionDownloads);
router.get("/modrinth/collection/:id/projects", badgeController.getCollectionProjects);
router.get("/modrinth/collection/:id/followers", badgeController.getCollectionFollowers);

// Bare URL redirects (backward compatibility)
router.get("/collection/:id", (req, res) => res.redirect(301, `/modrinth/collection/${req.params.id}`));
router.get("/collection/:id/downloads", (req, res) => res.redirect(301, `/modrinth/collection/${req.params.id}/downloads`));
router.get("/collection/:id/projects", (req, res) => res.redirect(301, `/modrinth/collection/${req.params.id}/projects`));
router.get("/collection/:id/followers", (req, res) => res.redirect(301, `/modrinth/collection/${req.params.id}/followers`));

export default router;
