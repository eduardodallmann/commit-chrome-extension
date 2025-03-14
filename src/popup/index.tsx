import { createRoot } from 'react-dom/client';

import '../assets/tailwind.css';

import { Popup } from './popup';

function init() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.body.classList.add('dark', 'bg-gray-900');
  }

  const appContainer = document.createElement('div');
  appContainer.classList.add('w-full', 'h-full');
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
