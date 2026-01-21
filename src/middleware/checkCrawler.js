const CRAWLER_USER_AGENTS = [
    "Discordbot",
    "Twitterbot",
    "facebookexternalhit",
    "Slackbot",
    "TelegramBot",
    "WhatsApp",
    "LinkedInBot",
    "SkypeUriPreview"
];

export const checkCrawlerMiddleware = (req, res, next) => {
    const userAgent = req.headers["user-agent"] || "";

    // Check if the request is from any known crawler/bot
    req.isCrawler = CRAWLER_USER_AGENTS.some(crawler =>
        userAgent.includes(crawler)
    );

    // Optionally, identify which specific bot it is
    req.crawlerType = CRAWLER_USER_AGENTS.find(crawler =>
        userAgent.includes(crawler)
    ) || null;

    next();
};