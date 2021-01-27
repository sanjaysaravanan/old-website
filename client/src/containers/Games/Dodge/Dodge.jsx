import React, { useEffect, useState } from "react";
import GameInfo from "./Components/GameInfo";
import Board from "./Components/Board";
import Player from "./Components/Player";
import Enemy from "./Components/Enemy";
import DebugState from "./Components/DebugState";
import { UP, DOWN, LEFT, RIGHT } from "../../../helpers/constants";
import { pluck } from "../../../helpers/utils";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "600px"
  }
}));

const getDefaultState = ({ boardSize, playerSize, highScore = 0 }) => {
  const half = Math.floor(boardSize / 2) * playerSize;
  return {
    size: {
      board: boardSize,
      player: playerSize,
      maxDim: boardSize * playerSize
    },
    positions: {
      player: {
        top: half,
        left: half
      },
      enemies: []
    },
    playerScore: 0,
    highScore,
    timeElapsed: 0,
    enemySpeed: 5,
    enemyIndex: 0,
    activeEnemies: 1,
    baseScore: 10
  };
};

const Dodge = props => {
  const classes = useStyles();
  const { boardSize, playerSize } = props;
  const half = Math.floor(props.boardSize / 2) * props.playerSize;
  const [playerPos, setPlayerPos] = useState({
    top: half,
    left: half
  });
  //   const [enemies, set] useState([]);
  const [state, setState] = useState(
    getDefaultState({ boardSize, playerSize })
  );
  const [enemyIntervalId, setIntervalEnemy] = useState();
  const [timeIntervalId, setIntervalTime] = useState();
  const [gameIntervalId, setIntervalGame] = useState();

  const placeEnemy = () => {
    // enemies always launch at player
    const { player, maxDim } = state.size;

    // assign to a random side
    const side = pluck([UP, DOWN, LEFT, RIGHT]);

    // generate enemy object
    const newEnemy = generateNewEnemy(playerPos, side);

    console.log(newEnemy);

    // add new enemy to state
    setState({
      ...state,
      positions: {
        ...state.positions,
        enemies: [...state.positions.enemies].concat(newEnemy)
      }
    });
  };

  const generateNewEnemy = (position, side) => {
    setState({
      ...state,
      enemyIndex: state.enemyIndex + 1
    });

    const newEnemy = { key: state.enemyIndex, dir: side };
    const { maxDim, player } = state.size;

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

  const handlePlayerMovement = dirObj => {
    const { top, left } = playerPos;
    const { player, maxDim } = state.size;

    // check walls
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
      left: left + player * dirObj.left
    });
  };

  const handlePlayerCollision = () => {
    resetGame();
  };

  const updateEnemyPositions = () => {
    const {
      enemySpeed,
      positions: { enemies },
      size: { player, maxDim }
    } = state;
    setState({
      ...state,
      positions: {
        player: { ...state.positions.player },
        enemies: enemies
          .filter(enemy => !enemy.remove)
          .map(enemy => {
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
      }
    });
  };

  const updateTimeAndScore = () => {
    const { timeElapsed, playerScore, baseScore } = state;

    setState({
      ...state,
      timeElapsed: timeElapsed + 1,
      playerScore: playerScore + baseScore
    });
  };

  const incrementEnemySpeed = () => {
    const { enemySpeed } = state;

    setState({
      ...state,
      enemySpeed: parseFloat((enemySpeed + 0.25).toFixed(2))
    });
  };

  const updateGame = () => {
    updateTimeAndScore();
    console.log("#################");
    console.log(state.timeElapsed);
    if (state.timeElapsed > 0) {
      // increment enemy speed
      if (state.timeElapsed % 3 === 0) {
        incrementEnemySpeed();
      }

      // increment max active enemies every 10 seconds
      if (state.timeElapsed % 10 === 0) {
        incrementActiveEnemies();
      }
    }
  };

  const updateEnemiesInPlay = () => {
    const { activeEnemies } = state;
    const { enemies } = state.positions;
    console.log("Placing Enemy");
    if (enemies.length < activeEnemies) {
      placeEnemy();
    }
  };

  const startGame = () => {
    // let enemyInterval = setInterval(updateEnemyPositions, true * 50);
    // setIntervalEnemy(enemyInterval);
    let timeInterval = setInterval(updateGame, true * 1000);
    setIntervalTime(timeInterval);
    // let gameInterval = setInterval(updateEnemiesInPlay, true * 250);
    // setIntervalGame(gameInterval);
  };

  useEffect(() => {
    startGame();
    // fetchGlobalHighScore();
    return () => {
      clearInterval(gameIntervalId);
      clearInterval(enemyIntervalId);
      clearInterval(timeIntervalId);
    };
  }, []);

  const incrementActiveEnemies = () => {
    setState({
      ...state,
      activeEnemies: state.activeEnemies + 1
    });
  };

  const resetGame = () => {
    const { boardSize, playerSize } = props;
    const { playerScore, highScore, globalHighScore } = state;

    // clear intervals
    clearInterval(gameIntervalId);
    clearInterval(enemyIntervalId);
    clearInterval(timeIntervalId);

    // reset state
    setState({
      ...getDefaultState({ boardSize, playerSize, highScore }),
      // persist debug state and high scores
      highScore: playerScore > highScore ? playerScore : highScore,
      globalHighScore
    });
    // restart game
    startGame();
  };

  return (
    <div className={classes.root}>
      <GameInfo
        playerScore={state.playerScore}
        timeElapsed={state.timeElapsed}
        highScore={state.highScore}
        globalHighScore={state.globalHighScore}
      />
      <Board dimension={state.size.board * state.size.player}>
        <Player
          size={state.size.player}
          position={playerPos}
          handlePlayerMovement={handlePlayerMovement}
        />

        {state.positions.enemies.map(enemy => (
          <Enemy
            key={enemy.key}
            size={state.size.player}
            info={enemy}
            playerPosition={playerPos}
            onCollide={handlePlayerCollision}
          />
        ))}
      </Board>
    </div>
  );
};

export default Dodge;
