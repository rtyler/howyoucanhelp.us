import feathers from '@feathersjs/feathers';

const app =  feathers();
console.debug('Initialized feathers');

// XXX Hack
declare var Notification: any;

if ('PushManager' in window) {
    // Push is available!
    console.debug('Push is enabled for this browser');
}

if ('serviceWorker' in navigator) {
    // Service Workers are available
    console.debug('Service Workers are enabled for this browser');
}



function urlBase64ToUint8Array(base64String : string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const vapidPublicKey : string = 'BE42XeNY7SE-DUthy_tRuTpFPKkotXYrJWxlrc3LDGckhSZWM8VoBP6ewrDjfjNdbqCV3ugtm4yvQ1NygznCMDk';
const convertedVapidKey : Uint8Array = urlBase64ToUint8Array(vapidPublicKey);

function registerServiceWorker() {
  return navigator.serviceWorker.register('worker.js')
  .then(function(registration) {
    console.log('Service worker successfully registered.');
    console.log(registration);

    registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey
    }).then((subscription: any) => {
        console.log(`Received push subscription ${JSON.stringify(subscription)}`);
    }).catch(err => console.log(err));
    return registration;
  })
  .catch(function(err) {
    console.error('Unable to register service worker.', err);
  });
}


function askPermission() {
  return new Promise(function(resolve: Function, reject: Function) {
    const permissionResult = Notification.requestPermission(function(result: string) {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  })
  .then(function(permissionResult: string) {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    }
    else {
        const n = new Notification('Thanks for granting notification permissions!', {});
        registerServiceWorker();
    }
  });
}

window.addEventListener('load', () => {
    console.debug('Window loaded');
    askPermission();
});
