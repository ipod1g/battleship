// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Server as IOServer } from 'socket.io';
import { Socket as NetSocket } from 'net';
import { Server as HTTPServer } from 'http';

type Res = NextApiResponse & {
  socket: NetSocket & {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export default function handler(
  req: NextApiRequest,
  res: Res
) {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new IOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', socket => {
      socket.on('input-change', msg => {
        console.log("holy");

        socket.broadcast.emit('update-input', msg);
      });
    });
  }
  res.end();
}
