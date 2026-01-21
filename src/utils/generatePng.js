import path from "path";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Load Inter font from public/fonts
const fontPath = path.join(dirname, "..", "..", "public", "fonts", "inter.ttf");
const fontBuffer = readFileSync(fontPath);

export async function generatePng(svgString)
{
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
