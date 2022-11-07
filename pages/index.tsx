import type { NextPage } from "next";
import { useState } from "react";
import Game from "../lib/stage/Game";

const Home: NextPage = () => {
  const [gameStatus, setGameStatus] = useState("started");

  return (
    <div>
      {/* {game.status === "created" && <Start />} */}
      {gameStatus === "started" && <Game />}
      {/* {game.status === "finished" && <Finished />} */}
    </div>
  );
};

export default Home;
