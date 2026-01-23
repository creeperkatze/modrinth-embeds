import sharp from "sharp";
import { performance } from "perf_hooks";

export async function generatePng(svgString)
{
    const startTime = performance.now();

    const pngBuffer = await sharp(Buffer.from(svgString), {
        density: 72
    })
        .resize(800, null, {
            fit: "inside",
            withoutEnlargement: true
        })
        .png()
        .toBuffer();

    const renderTime = performance.now() - startTime;

    return { buffer: pngBuffer, renderTime };
}