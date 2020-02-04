const { join, resolve } = require('path');
const { writeFile } = require('fs');
const TextToSVG = require('text-to-svg');
const fontPath = resolve(join(__dirname, '../fonts/RobotoMono-Bold.ttf'));
const badgesPath = resolve(join(__dirname, '../../icon_font_badges.json'));
const outputDir = resolve(join(__dirname, '../svg/badges/'));
const textToSVG = TextToSVG.loadSync(fontPath);
const badges = require(badgesPath);

class Badge {
  constructor (data, destination) {
    this.data = data;
    this.destination = destination;
    this.size = 72;
    this.fontSize = 22;
    this.xPadding = 6;
    this.yPadding = 16;
  }

  getPath (text) {
    const badgeWidth = this.size - (this.xPadding * 2);
    const badgeHeight = this.size - (this.yPadding * 2);
    const badgeX = (this.size - badgeWidth) / 2;
    const badgeY = (this.size - badgeHeight) / 2;
    const textX = this.size / 2;
    const textY = this.size / 2;
    const textPath = textToSVG.getPath(text, {
      x: textX,
      y: textY,
      fontSize: this.fontSize,
      anchor: 'center middle',
      attributes: {
        fill: '#fff'
      }
    });

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${this.size}px" height="${this.size}px" viewBox="0 0 ${this.size} ${this.size}" version="1.1">
  <rect x="${badgeX}" y="${badgeY}" width="${badgeWidth}" height="${badgeHeight}" fill="#000" rx="10" />
  ${textPath}
</svg>`;
  }

  write () {
    this.data.forEach(item => {
      const text = item.text || item;
      const fileName = item.fileName || text;
      const fullPath = resolve(join(this.destination, `${fileName || text}.svg`));
      const data = this.getPath(text);

      writeFile(fullPath, data, err => {
        if (err) console.log(err);
        else console.log(`Successfully created ${text} badge at ${fullPath}`);
      });
    });
  }
}

const badge = new Badge(badges, outputDir);
badge.write();
