import React from 'react';
import {
  Text,
  Alert
} from 'react-native';
import {WebView} from 'react-native-webview';

const MyWebView = (props) => {
  let webview = null;
  console.log('me is here');
  const run = `
    document.body.style.backgroundColor = 'blue';
    true;
  `;
  if(props.callMe) {
    props.callMe(() => {
      webview.injectJavaScript(run);
    });
  }
  return (
    <WebView
      ref={ref => {webview = ref}}
      style={{width: '100%',height:100,borderWidth:2,borderColor:'black'}}
      originWhitelist={['*']}
      scalesPageToFit={false}
      scrollEnabled={false}
      textZoom={100}
      onMessage={props.onMessage}
      source={{html:`
        <html>
          <head>
            <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
            <style type="text/css">
              html, body {
                margin:0;
              }
              img {
                position: absolute;
                top: -1000em;
                left: -1000em;
              }
            </style>
          </head>
          <body>
            <img src="` + props.base64 + `" />
            <canvas />
            <script>
              var canvas = document.querySelector('canvas');
              canvas.width = 140;
              canvas.height = 140;
              var ctx = canvas.getContext('2d');
              var img = document.querySelector('img');
              ctx.filter = "invert()";
              ctx.drawImage(img, 0, 0, 160, 160);
              window.ReactNativeWebView.postMessage(canvas.toDataURL());
            </script>
          </body>
        </html>
      `}} />
  );
};

export {MyWebView};
