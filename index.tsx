import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

console.log("Bootstrap: Initializing application...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Bootstrap Error: Root element '#root' not found in document.");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Bootstrap: Application rendered successfully.");
} catch (error) {
  console.error("Bootstrap Error: Failed to render application.", error);
}