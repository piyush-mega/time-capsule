importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Same Firebase configuration as in your index.html
firebase.initializeApp({
  apiKey: "AIzaSyCM1Ut7EPj1NXsHV5t3MH8c0BJK8glj6ok",
  authDomain: "time-capsule-kuchipu.firebaseapp.com",
  projectId: "time-capsule-kuchipu",
  storageBucket: "time-capsule-kuchipu.firebasestorage.app",
  messagingSenderId: "199495526518",
  appId: "1:199495526518:web:2fc4e751309f442f289757",
  measurementId: "G-TDKCYZ39VY"
});

const messaging = firebase.messaging();

// Handle background notification display
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification?.title || "Heartbeat Received 💓";
  const notificationOptions = {
    body: payload.notification?.body || "You just received a sweet heart pulse!",
    icon: "app-icon.png",
    badge: "app-icon.png",
    vibrate: [200, 100, 200],
    data: { url: "./index.html" }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});