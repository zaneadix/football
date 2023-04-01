import { NextResponse } from 'next/server';
import { Server } from 'socket.io';

import Matchup from '@models/Matchup';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(request, params, thing) {
  console.log(params, thing);
  const response = new NextResponse();
  // console.log(response);

  // if (!response?.socket?.server?.io) {
  //   console.log('Initializing Socket.IO');
  //   const io = new Server(res.socket.server);
  //   const matchupStream = Matchup.watch();

  //   io.on('connection', socket => {
  //     // socket.broadcast.emit('a user connected');
  //     socket.on('hello', msg => {
  //       socket.emit('hello', 'world!');
  //     });
  //   });

  //   matchupStream.on('change', change => {
  //     console.log(change);
  //   });

  //   response.socket.server.io = io;
  // }
  // res.end();
  return response;
}
