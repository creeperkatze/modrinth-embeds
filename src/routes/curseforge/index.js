import express from "express";
import metaRoutes from "./metaRoutes.js";
import projectRoutes from "./projectRoutes.js";

const router = express.Router();

router.use(metaRoutes);
router.use(projectRoutes);

export default router;
