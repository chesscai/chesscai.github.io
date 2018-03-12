var key
var authSecret
var endpoint
var vapidPublicKey = 'BL-JuHu4DnIRCMievCXvjrA1MyoZ__mPG6fEEMxX0CS0YCHavRzkLctrhtZ2APZuy0AzL-EcF4yRlcp3_l0diGE'
var NOTIFICATION_HOST = 'https://api-pwa-stage.3g.net.cn'

function urlBase64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function getStorageItem (key) {
  return window.localStorage.getItem(key)
}

function setStorageItem (key, value) {
  window.localStorage.removeItem(key)
  window.localStorage.setItem(key, value)
}

function removeStorageItem (key) {
  window.localStorage.removeItem(key)
}

function subscribe () {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
      .then(function (registration) {
        if (registration.pushManager) {
          return registration.pushManager.getSubscription()
            .then(function(subscription) {
              // if subscription exit
              if (subscription) {
                return
              }
              // if user unsubscribe
              if (getStorageItem('vue_pwa_notification_disabled')) {
                return
              }
              // subscribe
              return registration.pushManager.subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
                })
                .then(function (subscription) {
                  var rawKey = subscription.getKey ? subscription.getKey('p256dh') : ''
                  var rawAuthSecret = subscription.getKey ? subscription.getKey('auth') : ''
                  key = rawKey ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawKey))) : ''
                  authSecret = rawAuthSecret ? btoa(String.fromCharCode.apply(null, new Uint8Array(rawAuthSecret))) : ''
                  endpoint = subscription.endpoint
                  // post user's subscription to server
                  return fetch(NOTIFICATION_HOST + '/api/notification/subscribe', {
                      method: 'post',
                      headers: new Headers({
                        'content-type': 'application/json'
                      }),
                      body: JSON.stringify({
                        endpoint: endpoint,
                        key: key,
                        authSecret: authSecret
                      })
                    })
                    .then(function (res) {
                      res.json()
                        .then(json => {
                          // save subscription user_id in localstorage for unsubscribe
                          setStorageItem('vue_pwa_user_id', json.user_id)
                        })
                    })
                    .catch(function (err) {
                      console.log(err)
                    })
                })
            })
        }
      })
      .catch(function (err) {
        console.log('ServiceWorker registration failed: ', err, err.code, err.message, err.name)
      })
  }
}

function unsubscribe() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready
      .then((registration) => {
        if (registration.pushManager) {
          registration.pushManager.getSubscription()
            .then((subscription) => {
              // if subscription don't exit
              if (!subscription) {
                return
              }
              // save unsubscribe status in localstorage
              setStorageItem('vue_pwa_notification_disabled', '1')
              subscription.unsubscribe()
                .then(function () {
                  var vuePwaUserId = getStorageItem('vue_pwa_user_id')
                  if (vuePwaUserId) {
                    // remove subscription user_id in localstorage
                    removeStorageItem('vue_pwa_user_id')
                    // todo
                  }
                })
                .catch((e) => {
                  logger.error('Error thrown while unsubscribing from push messaging', e)
                })
            })
          }
      })
  }
}

// bind unsubscribe button event
document.getElementById("unsubscribe").addEventListener("click", unsubscribe)
// check subscription when serverWorker registed
subscribe()