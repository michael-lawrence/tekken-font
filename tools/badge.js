const TextToSVG = require('text-to-svg');
const textToSVG = TextToSVG.loadSync();

const [text] = process.argv.slice(2);

const size = 72;
const fontSize = 22;
const xPadding = 6;
const yPadding = 16;
const badgeWidth = size - (xPadding * 2);
const badgeHeight = size - (yPadding * 2);
const badgeX = (size - badgeWidth) / 2;
const badgeY = (size - badgeHeight) / 2;
const textX = size / 2;
const textY = size / 2;

const textPath = textToSVG.getPath(text, {
  x: textX,
  y: textY,
  fontFamily: 'Helvetica',
  fontWeight: 'bold',
  fontSize,
  anchor: 'center middle',
  attributes: {
    fill: '#fff'
  }
});

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}px" height="${size}px" viewBox="0 0 ${size} ${size}" version="1.1">
  <rect x="${badgeX}" y="${badgeY}" width="${badgeWidth}" height="${badgeHeight}" fill="#000" rx="10" />
  ${textPath}
</svg>`;

console.log(svg);