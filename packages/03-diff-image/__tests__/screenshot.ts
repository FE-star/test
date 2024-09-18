import path from 'path';
import http from 'http';
import puppeteer from 'puppeteer';
import serveHandler from 'serve-handler';

const port = 3001;
const width = 800;
const height = 500;

export { createScreenshotBuffer, width, height };

async function createScreenshotBuffer(pagePath: string) {
  return new Promise<Buffer>((resolve, reject) => {
    const server = http.createServer((req, res) =>
      serveHandler(req, res, {
        public: path.join(__dirname, '..', 'dist')
      })
    );
    server.listen(port, async () => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: width, height: height });
        await page.goto(`http://127.0.0.1:${port}/${pagePath || ''}`);
        const buf = await page.screenshot();
        await browser.close();
        server.close();
        resolve(buf as Buffer);
      } catch (err) {
        server.close();
        console.error(err);
        process.exit(-1);
      }
    });
    server.on('SIGINT', () => process.exit(1));
  });
}
