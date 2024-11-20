import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Handle beforeinstallprompt event to show the install prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  console.log('beforeinstallprompt fired');
  
  // Save the event so it can be triggered later
  deferredPrompt = event;

  // Show the custom install button
  const installButton = document.getElementById('installButton');
  if (installButton) {
    installButton.style.display = 'block';
  }
});

// Handle the install button click
const installButton = document.getElementById('installButton');
if (installButton) {
  installButton.addEventListener('click', () => {
    // Show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();

      // Wait for the user's response
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        // Reset the deferredPrompt
        deferredPrompt = null;
      });
    }
  });
}

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
