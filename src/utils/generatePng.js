import sharp from "sharp";

export async function generatePng(svgString, width = 450, height = 400)
{
    const pngBuffer = await sharp(Buffer.from(svgString))
        .resize(width, height)
        .png()
        .toBuffer();

    return pngBuffer;
}
