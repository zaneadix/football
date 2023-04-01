import { Server } from 'socket.io';

import Matchup from '@models/Matchup';

const SocketHandler = (req, res) => {
  console.log(req);
  if (!res.socket.server.io) {
    console.log('Initializing Socket.IO');
    const io = new Server(res.socket.server);
    const matchupStream = Matchup.watch();

    io.on('connection', socket => {
      // socket.broadcast.emit('a user connected');
      socket.on('hello', msg => {
        socket.emit('hello', 'world!');
      });
    });

    matchupStream.on('change', change => {
      console.log(change);
    });

    res.socket.server.io = io;
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default SocketHandler;
