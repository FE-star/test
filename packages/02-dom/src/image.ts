export function renderImage() {
  const img = document.createElement('img');

  img.addEventListener('load', () => {
    console.log('load: 加载图片成功');
  });

  img.addEventListener('error', () => {
    console.log('error: 加载图片失败');
  });

  img.src = 'https://example.com/test.png';

  const root = document.querySelector('#root') as HTMLDivElement;

  root.appendChild(img);
}
