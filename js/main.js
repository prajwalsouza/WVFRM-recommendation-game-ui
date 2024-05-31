

function encodeFirebaseKey(key) {
    return key.replace(/\./g, '_reviews_dot__')
        .replace(/\$/g, '_review_dollarSign__')
        .replace(/\[/g, '_review_openBracket__')
        .replace(/\]/g, '_review_closeBracket__')
        .replace(/#/g, '_reviews_hashTag__');
}

function decodeFirebaseKey(encodedKey) {
    return encodedKey.replace(/_reviews_dot__/g, '.')
        .replace(/_reviews_dollarSign__/g, '$')
        .replace(/_reviews_openBracket__/g, '[')
        .replace(/_reviews_closeBracket__/g, ']')
        .replace(/_reviews_hashTag__/g, '#');
}

ignusTheme.baseHue = 0;
ignusTheme.baseLightness = 80;
ignusTheme.setUp();

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//       navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
//         // Registration was successful
//         console.log('ServiceWorker registration successful with scope: ', registration.scope);
//       }, function(err) {
//         // registration failed :(
//         console.log('ServiceWorker registration failed: ', err);
//       });
//     });
//   }


