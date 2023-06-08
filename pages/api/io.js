import initializeIO from '@server/initializeIO';

const SocketHandler = (request, response) => {
  if (!response.socket.server.io) {
    const io = initializeIO(response.socket.server);
    response.socket.server.io = io;
  }
  response.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default SocketHandler;
