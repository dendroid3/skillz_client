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

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing
  event.preventDefault();
  
  // Save the event so it can be triggered later
  deferredPrompt = event;
  
  // Optionally, update your UI to notify the user they can install the PWA
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';
  
  installButton.addEventListener('click', () => {
    // Show the install prompt
    if (deferredPrompt) {
      deferredPrompt.prompt();

      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        
        // Clear the deferredPrompt so it can only be used once
        deferredPrompt = null;
      });
    }
  });
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
