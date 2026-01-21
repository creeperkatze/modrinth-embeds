import path from "path";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generatePng(svgString)
{
    // Load font from a path relative to this file
    const fontPath = path.join(__dirname, "..", "..", "public", "fonts", "inter.ttf");
    const fontBuffer = readFileSync(fontPath);

    const options = {
        fitTo: {
            mode: "original"
        },
        font: {
            loadSystemFonts: false,
            fontFiles: [fontBuffer],
            defaultFontFamily: "Inter"
        }
    };

    const resvg = new Resvg(svgString, options);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return pngBuffer;
}