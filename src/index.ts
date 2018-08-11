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
    }
  });
}

window.addEventListener('load', () => {
    console.debug('Window loaded');
    askPermission();
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
            .then(function(subscription) {
            // The subscription was successful
            console.log('subscription successful');

            // TODO: Send the subscription subscription.endpoint
            // to your server and save it to send a push message
            // at a later date
                // return sendSubscriptionToServer(subscription);
            })
            .catch(function(e) {
            if (Notification.permission === 'denied') {
                // The user denied the notification permission which
                // means we failed to subscribe and the user will need
                // to manually change the notification permission to
                // subscribe to push messages
                console.debug('Permission for Notifications was denied');
            } else {
                // A problem occurred with the subscription, this can
                // often be down to an issue or lack of the gcm_sender_id
                // and / or gcm_user_visible_only
                console.debug('Unable to subscribe to push.', e);
            }
        });
    });

});
