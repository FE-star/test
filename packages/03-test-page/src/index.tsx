import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.css';

const root = createRoot(document.querySelector('#app') as HTMLDivElement);
const Page = () => {
  return (
    <div className="page">
      <App />
    </div>
  );
};

root.render(<Page />);
