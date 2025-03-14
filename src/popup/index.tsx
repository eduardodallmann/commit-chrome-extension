import { createRoot } from 'react-dom/client';

import '../assets/tailwind.css';

import { App } from './app';

function init() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.add('dark', 'bg-gray-900');
    document.body.classList.remove('bg-gray-100');
  } else {
    document.body.classList.remove('dark', 'bg-gray-900');
    document.body.classList.add('bg-gray-100');
  }

  document.head.insertAdjacentHTML(
    'beforeend',
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block" />`,
  );

  const appContainer = document.createElement('div');
  appContainer.classList.add('w-full', 'h-full');
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  const root = createRoot(appContainer);
  root.render(<App />);
}

init();
