import modrinthClient from "../services/modrinthClient.js";
import cache from "../utils/cache.js";
import { generateUserCard } from "../generators/userCard.js";
import { generateProjectCard } from "../generators/projectCard.js";
import { generateOrganizationCard } from "../generators/organizationCard.js";
import { generateCollectionCard } from "../generators/collectionCard.js";
import logger from "../utils/logger.js";
import { generatePng } from "../utils/generateImage.js";

const MAX_AGE = Math.floor(cache.ttl / 1000);

const CARD_CONFIGS = {
    user: {
        paramKey: "username",
        dataFetcher: (client, id, options, convertToPng) => client.getUserStats(id, options.maxProjects, convertToPng),
        generator: generateUserCard
    },
    project: {
        paramKey: "slug",
        dataFetcher: (client, id, options, convertToPng) => client.getProjectStats(id, options.maxVersions, convertToPng),
        generator: generateProjectCard
    },
    organization: {
        paramKey: "id",
        dataFetcher: (client, id, options, convertToPng) => client.getOrganizationStats(id, options.maxProjects, convertToPng),
        generator: generateOrganizationCard
    },
    collection: {
        paramKey: "id",
        dataFetcher: (client, id, options, convertToPng) => client.getCollectionStats(id, options.maxProjects, convertToPng),
        generator: generateCollectionCard
    }
};

const handleCardRequest = async (req, res, next, cardType) => {
    try {
        const config = CARD_CONFIGS[cardType];
        const identifier = req.params[config.paramKey];
        const theme = req.query.theme || "dark";
        const format = req.query.format;

        // Determine if we need to fetch images (only for PNG generation)
        const needsImages = req.isCrawler || format === "image";

        // Parse customization options
        const options = {
            showProjects: req.query.showProjects !== "false",
            showVersions: req.query.showVersions !== "false",
            maxProjects: Math.min(Math.max(parseInt(req.query.maxProjects) || 5, 1), 50),
            maxVersions: Math.min(Math.max(parseInt(req.query.maxVersions) || 5, 1), 50),
            relativeTime: req.query.relativeTime !== "false",
            showSparklines: req.query.showSparklines !== "false",
            color: req.query.color ? `#${req.query.color.replace(/^#/, "")}` : null,
            backgroundColor: req.query.backgroundColor ? `#${req.query.backgroundColor.replace(/^#/, "")}` : null
        };

        const cacheKey = `${cardType}:${identifier}:${theme}:${JSON.stringify(options)}`;

        // Generate PNG for Discord bots or when format=image is requested
        if (needsImages) {
            const pngCacheKey = `${cacheKey}:png`;
            const cachedPng = cache.get(pngCacheKey);

            if (cachedPng) {
                logger.info(`Showing ${cardType} card for "${identifier}" (cached image)`);
                res.setHeader("Content-Type", "image/png");
                res.setHeader("Cache-Control", `public, max-age=${MAX_AGE}`);
                return res.send(cachedPng);
            }

            // Generate new SVG with PNG-converted images, then render to PNG
            const data = await config.dataFetcher(modrinthClient, identifier, options, true);
            const svg = config.generator(data, theme, options);
            const { buffer: pngBuffer, renderTime } = await generatePng(svg);

            // Cache both SVG and PNG
            cache.set(cacheKey, svg);
            cache.set(pngCacheKey, pngBuffer);

            const apiTime = data.timings?.api ? `${Math.round(data.timings.api)}ms` : "N/A";
            const conversionTime = data.timings?.imageConversion ? `${Math.round(data.timings.imageConversion)}ms` : "N/A";
            const pngTime = `${Math.round(renderTime)}ms`;

            logger.info(`Showing ${cardType} card for "${identifier}" (api: ${apiTime}, image conversion: ${conversionTime}, render: ${pngTime})`);
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Cache-Control", `public, max-age=${MAX_AGE}`);
            return res.send(pngBuffer);
        }

        // Serve cached SVG
        const cached = cache.get(cacheKey);
        if (cached) {
            logger.info(`Showing ${cardType} card for "${identifier}" (cached)`);
            res.setHeader("Content-Type", "image/svg+xml");
            res.setHeader("Cache-Control", `public, max-age=${MAX_AGE}`);
            return res.send(cached);
        }

        // Generate fresh SVG without converting images (WebP/GIF/etc. are fine in SVG)
        const data = await config.dataFetcher(modrinthClient, identifier, options, false);
        const svg = config.generator(data, theme, options);

        cache.set(cacheKey, svg);

        const apiTime = data.timings?.api ? `${Math.round(data.timings.api)}ms` : "N/A";
        logger.info(`Showing ${cardType} card for "${identifier}" (api: ${apiTime})`);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", `public, max-age=${MAX_AGE}`);
        res.send(svg);
    } catch (err) {
        const config = CARD_CONFIGS[cardType];
        const identifier = req.params[config.paramKey];
        logger.warn(`Error showing ${cardType} card for "${identifier}": ${err.message}`);
        next(err);
    }
};

export const getUser = (req, res, next) => handleCardRequest(req, res, next, "user");
export const getProject = (req, res, next) => handleCardRequest(req, res, next, "project");
export const getOrganization = (req, res, next) => handleCardRequest(req, res, next, "organization");
export const getCollection = (req, res, next) => handleCardRequest(req, res, next, "collection");
