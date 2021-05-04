import React, { useEffect, useState, useRef } from "react";
import GameInfo from "./Components/GameInfo";
import Board from "./Components/Board";
import Player from "./Components/Player";
import Enemy from "./Components/Enemy";
import { UP, DOWN, LEFT, RIGHT } from "../../../helpers/constants";
import { pluck } from "../../../helpers/utils";
import { makeStyles, Dialog, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "600px",
  },
}));

const getDefaultState = ({ highScore = 0 }) => {
  return {
    playerScore: 0,
    highScore,
    enemySpeed: 5,
    activeEnemies: 1,
    baseScore: 10,
  };
};

const Dodge = (props) => {
  const classes = useStyles();
  const { boardSize, playerSize } = props;
  const half = Math.floor(props.boardSize / 2) * props.playerSize;
  const [playerPos, setPlayerPos] = useState({
    top: half,
    left: half,
  });
  const [enemies, setEnemies] = useState([]);
  const [enemyIndex, setEnemyIndex] = useState(0);
  const [size, setSize] = useState({
    board: boardSize,
    player: playerSize,
    maxDim: boardSize * playerSize,
  });
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [state, setState] = useState(
    getDefaultState({ boardSize, playerSize })
  );
  const [enemyIntervalId, setIntervalEnemy] = useState();
  const [timeIntervalId, setIntervalTime] = useState();
  const [gameIntervalId, setIntervalGame] = useState();

  const placeEnemy = () => {
    // assign to a random side
    const side = pluck([UP, DOWN, LEFT, RIGHT]);

    // generate enemy object
    const newEnemy = generateNewEnemy(playerPos, side);

    // add new enemy to state
    setEnemies(enemies.concat(newEnemy));
  };

  const generateNewEnemy = (position, side) => {
    setEnemyIndex(enemyIndex + 1);

    const newEnemy = { key: enemyIndex + 1, dir: side };
    const { maxDim, player } = size;
    // eslint-disable-next-line default-case
    switch (side) {
      case UP:
        newEnemy.top = maxDim;
        newEnemy.left = position.left;
        break;
      case DOWN:
        newEnemy.top = 0 - player;
        newEnemy.left = position.left;
        break;
      case LEFT:
        newEnemy.top = position.top;
        newEnemy.left = maxDim;
        break;
      case RIGHT:
        newEnemy.top = position.top;
        newEnemy.left = 0 - player;
        break;
    }

    return newEnemy;
  };
  const handlePlayerMovement = (dirObj) => {
    const { top, left } = playerPos;
    const { player, maxDim } = size;

    // check walls
    // eslint-disable-next-line default-case
    switch (dirObj.dir) {
      case UP:
        if (top === 0) return;
        break;
      case DOWN:
        if (top === maxDim - player) return;
        break;
      case LEFT:
        if (left === 0) return;
        break;
      case RIGHT:
        if (left === maxDim - player) return;
        break;
    }
    setPlayerPos({
      top: top + player * dirObj.top,
      left: left + player * dirObj.left,
    });
  };

  const handlePlayerCollision = () => {
    resetGame(false);
  };

  const updateEnemyPositions = () => {
    const { enemySpeed } = state;

    const { player, maxDim } = size;
    setEnemies(
      enemies
        .filter((enemy) => !enemy.remove)
        .map((enemy) => {
          if (
            enemy.top < 0 - player ||
            enemy.top > maxDim + player ||
            enemy.left < 0 - player ||
            enemy.left > maxDim + player
          ) {
            enemy.remove = true;
            return enemy;
          }
          // based on direction, increment the correct value (top / left)
          // eslint-disable-next-line default-case
          switch (enemy.dir) {
            case UP:
              enemy.top -= enemySpeed;
              break;
            case DOWN:
              enemy.top += enemySpeed;
              break;
            case LEFT:
              enemy.left -= enemySpeed;
              break;
            case RIGHT:
              enemy.left += enemySpeed;
              break;
          }
          return enemy;
        })
    );
  };

  const updateTimeAndScore = () => {
    const { playerScore, baseScore } = state;
    const updatedScore = playerScore + baseScore;
    setTimeElapsed(timeElapsed + 1);
    setState({
      ...state,
      playerScore: updatedScore,
      highScore:
        updatedScore > state.highScore ? updatedScore : state.highScore,
    });
  };

  const incrementEnemySpeed = () => {
    const { enemySpeed } = state;

    setState({
      ...state,
      enemySpeed: parseFloat((enemySpeed + 0.25).toFixed(2)),
    });
  };

  const updateGame = () => {
    updateTimeAndScore();
    if (timeElapsed > 0) {
      // increment enemy speed
      if (timeElapsed % 3 === 0) {
        incrementEnemySpeed();
      }

      // increment max active enemies every 10 seconds
      if (timeElapsed % 10 === 0) {
        incrementActiveEnemies();
      }
    }
  };

  const updateEnemiesInPlay = () => {
    const { activeEnemies } = state;
    if (enemies.length < activeEnemies) {
      placeEnemy();
    }
  };

  const updateEnemyPosRef = useRef();
  const updateGameRef = useRef();
  const updateEnemiesInPlayRef = useRef();

  useEffect(() => {
    updateEnemyPosRef.current = updateEnemyPositions;
    updateGameRef.current = updateGame;
    updateEnemiesInPlayRef.current = updateEnemiesInPlay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {};
  });

  const updateEnemyPosRefMethod = () => {
    updateEnemyPosRef.current();
  };

  const updateGameRefMethod = () => {
    updateGameRef.current();
  };

  const updateEnemiesInPlayRefMethod = () => {
    updateEnemiesInPlayRef.current();
  };

  const startGame = () => {
    let enemyInterval = setInterval(updateEnemyPosRefMethod, true * 50);
    setIntervalEnemy(enemyInterval);
    let timeInterval = setInterval(updateGameRefMethod, true * 1000);
    setIntervalTime(timeInterval);
    let gameInterval = setInterval(updateEnemiesInPlayRefMethod, true * 250);
    setIntervalGame(gameInterval);
  };

  useEffect(() => {
    startGame();
    // fetchGlobalHighScore();
    return () => {
      clearInterval(gameIntervalId);
      clearInterval(enemyIntervalId);
      clearInterval(timeIntervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incrementActiveEnemies = () => {
    setState({
      ...state,
      activeEnemies: state.activeEnemies + 1,
    });
  };

  const resetGame = (start = true) => {
    const { boardSize, playerSize } = props;
    const { playerScore, highScore, globalHighScore } = state;

    // clear intervals
    clearInterval(gameIntervalId);
    clearInterval(enemyIntervalId);
    clearInterval(timeIntervalId);

    setPlayerPos({
      top: half,
      left: half,
    });
    setEnemies([]);
    setEnemyIndex(0);
    setSize({
      board: boardSize,
      player: playerSize,
      maxDim: boardSize * playerSize,
    });
    setTimeElapsed(0);
    // reset state
    // Check for start of the game
    if (!start) {
      setState({
        ...getDefaultState({ boardSize, playerSize, highScore }),
        // persist debug state and high scores
        highScore: playerScore > highScore ? playerScore : highScore,
        globalHighScore,
      });
    } else {
      setState({
        ...getDefaultState({ boardSize, playerSize, highScore }),
        highScore: 0,
        globalHighScore,
      });
    }
    // restart game
    startGame();
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    resetGame();
  };
  const handleClose = () => {
    setOpen(false);
    resetGame(false);
  };

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        size="small"
        onClick={handleClickOpen}
      >
        Play
      </Button>
      <Dialog
        onClose={() => handleClose()}
        aria-labelledby="customized-dialog-title"
        open={open}
        //   classes={{ paperScrollPaper: classes.gameSection }}
      >
        <div className={classes.root}>
          <GameInfo
            playerScore={state.playerScore}
            timeElapsed={timeElapsed}
            highScore={state.highScore}
            globalHighScore={state.globalHighScore}
          />
          <Board dimension={size.board * size.player}>
            <Player
              size={size.player}
              position={playerPos}
              handlePlayerMovement={handlePlayerMovement}
            />
            {enemies.map((enemy) => (
              <Enemy
                key={enemy.key}
                size={size.player}
                info={enemy}
                playerPosition={playerPos}
                onCollide={handlePlayerCollision}
              />
            ))}
          </Board>
        </div>
      </Dialog>
    </>
  );
};

export default Dodge;
