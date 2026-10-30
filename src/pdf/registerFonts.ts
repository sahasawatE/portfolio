import path from "node:path";
import { fileURLToPath } from "node:url";
import { Font } from "@react-pdf/renderer";

const fontDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "fonts");

Font.register({
  family: "Noto Sans Thai",
  fonts: [
    { src: path.join(fontDir, "NotoSansThai-Regular.ttf") },
    {
      src: path.join(fontDir, "NotoSansThai-Bold.ttf"),
      fontWeight: 700,
    },
  ],
});

Font.registerHyphenationCallback((word) => [word]);
