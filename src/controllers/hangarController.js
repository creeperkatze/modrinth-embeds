import hangarClient from "../services/hangarClient.js";
import { apiCache } from "../utils/cache.js";
import logger from "../utils/logger.js";
import { metaKey, PLATFORM } from "../utils/cacheKeys.js";

const API_CACHE_TTL = 3600; // 1 hour;

// Hangar meta endpoint
export const getHangarMeta = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { type = "project" } = req.query;

        const entityType = type === "user" ? "user" : "project";
        const cacheKey = metaKey(PLATFORM.HANGAR, entityType, slug);

        const cached = apiCache.getWithMeta(cacheKey);
        const cachedResult = cached?.value;

        if (cachedResult) {
            const minutesAgo = Math.round((Date.now() - cached.cachedAt) / 60000);
            logger.info(`Showing Hangar meta for ${entityType} "${slug}" (cached ${minutesAgo}m ago)`);
            res.setHeader("Cache-Control", `public, max-age=${API_CACHE_TTL}`);
            return res.json(cachedResult);
        }

        let data;
        let result;

        if (entityType === "user") {
            const userResponse = await hangarClient.getUser(slug);
            data = userResponse;
            result = { name: data?.name || slug };
        } else {
            const projectResponse = await hangarClient.getProject(slug);
            data = projectResponse;
            result = { name: data?.name || slug };
        }

        if (!data) {
            return res.status(404).json({ error: `${entityType} not found` });
        }

        apiCache.set(cacheKey, result);
        logger.info(`Showing Hangar meta for ${entityType} "${slug}"`);

        res.setHeader("Cache-Control", `public, max-age=${API_CACHE_TTL}`);
        res.json(result);
    } catch (err) {
        logger.warn(`Error fetching Hangar meta for "${req.params.slug}": ${err.message}`);
        next(err);
    }
};
