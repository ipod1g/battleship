import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;
const ServerTest = () => {
  useEffect(() => {
    async function socketInit() {
      const test = await fetch("/api/socket");
      console.log("ayo", test);

      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("update-input", (msg) => {
        console.log("server just said holy");
      });
    }

    socketInit();
  }, []);

  return (
    <button
      onClick={() => {
        socket.emit("input-change", "hi");
      }}
    >
      ServerTest
    </button>
  );
};

export default ServerTest;
