import React, { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;
const ServerTest = () => {
  useEffect(() => {
    async function socketInit() {
      // connects to the socket
      socket = io("http://localhost:8080");

      socket.on("connect", () => {
        console.log("Connected, connection id is ", socket.id);
      });

      socket.on("update-input", (msg) => {
        console.log("server just said holy");
      });
    }

    socketInit();

    return () => {};
  }, []);

  return (
    <button
      onClick={() => {
        socket.emit("server-test", "hi");
      }}
    >
      ServerTest
    </button>
  );
};

export default ServerTest;
