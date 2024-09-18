import React, { useState, act } from 'react';

const image404 = 'https://example/404.png';

export function App(props: { src: string; onLoad?: () => void; onError?: () => void }) {
  const { src, onLoad, onError } = props;

  const [imageSrc, setImageSrc] = useState<string>(src);

  return (
    <div className="app">
      <img
        src={imageSrc}
        onLoad={() => {
          onLoad?.();
        }}
        onError={() => {
          act(() => {
            setImageSrc(image404);
          });
          onError?.();
        }}
      />
    </div>
  );
}
