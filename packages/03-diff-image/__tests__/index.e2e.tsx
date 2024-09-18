import fs from 'fs';
import path from 'path';
import jimp from 'jimp';
import pixelmatch from 'pixelmatch';
import pngjs from 'pngjs';
import { createScreenshotBuffer, width, height } from './screenshot';

const { PNG } = pngjs;

const imageDir = path.join(__dirname, 'image');
const imageSnapshotPath = path.join(imageDir, 'page-snapshot.png');
const imagePagePath = path.join(imageDir, 'page.png');
const imageDiffPath = path.join(imageDir, 'page-diff.png');

if (!(fs.existsSync(imageDir) && fs.statSync(imageDir).isDirectory())) {
  fs.mkdirSync(imageDir);
}

describe('Screenshot testing', function () {
  beforeEach(() => {
    jest.setTimeout(10 * 1000);
  });

  it('testing...', function (done) {
    createScreenshotBuffer('/index.html')
      .then(async (buf: Buffer) => {
        fs.writeFileSync(imagePagePath, buf);
        const actual = (await jimp.read(imagePagePath)).scale(1).quality(100).bitmap;
        const expected = (await jimp.read(imageSnapshotPath)).bitmap;
        const diff = new PNG({ width, height });
        const failedPixel = pixelmatch(expected.data, actual.data, diff.data, actual.width, actual.height);
        const failRate = failedPixel / (width * height);

        const buffer = PNG.sync.write(diff, { colorType: 6 });
        fs.writeFileSync(imageDiffPath, buffer);
        console.log();
        // 差异像素的比例，必须为0%
        expect(failRate).toBe(0);
        done();
      })
      .catch(done);
  });
});
