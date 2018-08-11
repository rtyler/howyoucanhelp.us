console.debug('Service Worker has been initialized');

const publicKey : string = 'BE42XeNY7SE-DUthy_tRuTpFPKkotXYrJWxlrc3LDGckhSZWM8VoBP6ewrDjfjNdbqCV3ugtm4yvQ1NygznCMDk';

self.addEventListener('push', function(event : any) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'How You Can Help Us';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

