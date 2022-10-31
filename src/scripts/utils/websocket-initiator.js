import NotificationHelper from './notification-helper';

let socket = null;

const WebSocketInitiator = {
  init(url) {
    socket = new WebSocket(url);
    console.log('ws connected to => ', socket.url);

    socket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log('websocket onmessage handler => ', message);

    const reviewData = JSON.parse(message.data);

    NotificationHelper.sendNotification({
      title: reviewData.name,
      options: {
        body: reviewData.review,
        icon: 'icons/192x192.png',
      },
    });
  },
};

const sendDataToWebsocket = (reviewData) => {
  const data = JSON.stringify(reviewData);

  socket.send(data);
};

export { WebSocketInitiator, sendDataToWebsocket };
