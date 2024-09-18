import path from 'path';
import fs from 'fs';
import { createScreenshotBuffer, width, height } from './screenshot';

async function main() {
  const imageDir = path.join(__dirname, 'image');
  const imagePath = path.join(imageDir, 'page-snapshot.png');
  if (!(fs.existsSync(imageDir) && fs.statSync(imageDir).isDirectory())) {
    fs.mkdirSync(imageDir);
  }
  const imageBuffer: Buffer = (await createScreenshotBuffer('/index.html')) as Buffer;
  fs.writeFileSync(imagePath, imageBuffer);
  console.log('快照创建成功！');
}

main();
