import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Replace with your actual config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize FCM
const messaging = getMessaging(app);

// Register the service worker for FCM
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(registration => {
        console.log('Service Worker registered:', registration);
      })
      .catch(err => {
        console.error('Service Worker registration failed:', err);
      });
  });
}

// Request notification permission and get FCM token
async function requestPermissionAndGetToken() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, { vapidKey: 'YOUR_WEB_PUSH_CERTIFICATE_KEY_PAIR' });
      console.log('FCM registration token:', token);
      // You may want to send this token to your server
    } else {
      console.log('Notification permission not granted');
    }
  } catch (err) {
    console.error('Failed to get FCM token', err);
  }
}

requestPermissionAndGetToken();