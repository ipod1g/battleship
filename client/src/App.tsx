import Start from './stage/Start';
import Game from './stage/Game';
import Finished from './stage/Finished';
import './App.css';
import { useState } from 'react';

// import GenerateShips from './hooks/useGenerateShips';

const App: React.FC = () => {
  const [gameStatus, setGameStatus] = useState('started');

  // console.table('USER ' + userSquares);
  // console.table('OPPONENT ' + opponentSquares);

  return (
    <div className="App">
      {/* {game.status === "created" && <Start />} */}
      {gameStatus === 'started' && <Game />}
      {/* {game.status === "finished" && <Finished />} */}
    </div>
  );
};
export default App;
