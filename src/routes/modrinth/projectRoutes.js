import express from "express";
import * as cardController from "../../controllers/cardController.js";
import * as badgeController from "../../controllers/badgeController.js";

const router = express.Router();

// Modrinth prefixed routes
router.get("/modrinth/project/:slug", cardController.getProject);

router.get("/modrinth/project/:slug/downloads", badgeController.getProjectDownloads);
router.get("/modrinth/project/:slug/followers", badgeController.getProjectFollowers);
router.get("/modrinth/project/:slug/versions", badgeController.getProjectVersions);

// Bare URL redirects (backward compatibility)
router.get("/project/:slug", (req, res) => res.redirect(301, `/modrinth/project/${req.params.slug}`));
router.get("/project/:slug/downloads", (req, res) => res.redirect(301, `/modrinth/project/${req.params.slug}/downloads`));
router.get("/project/:slug/followers", (req, res) => res.redirect(301, `/modrinth/project/${req.params.slug}/followers`));
router.get("/project/:slug/versions", (req, res) => res.redirect(301, `/modrinth/project/${req.params.slug}/versions`));

export default router;
