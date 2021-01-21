import React, { useEffect, useState } from 'react';
import GameInfo from './Components/GameInfo';
import Board from "./Components/Board";
import Player from "./Components/Player";
import Enemy from "./Components/Enemy";
import DebugState from "./Components/DebugState";
import { UP, DOWN, LEFT, RIGHT } from '../../../helpers/constants';
import { pluck } from '../../../helpers/utils';


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
    }
};

const Game = (props) => {
    // const half = Math.floor(props.boardSize / 2) * props.playerSize;
    const { boardSize, playerSize } = props;
    const [state, setState] = useState(getDefaultState({ boardSize, playerSize }))
    const [enemyIntervalId, setIntervalEnemy] = useState();
    const [timeIntervalId, setIntervalTime] = useState();
    const [gameIntervalId, setIntervalGame] = useState();

    const placeEnemy = () => {
        // enemies always launch at player
        const { player, maxDim } = state.size;
        const { player: playerPos } = state.positions;

        // assign to a random side
        const side = pluck([UP, DOWN, LEFT, RIGHT]);

        // generate enemy object
        const newEnemy = generateNewEnemy(playerPos, side);

        // add new enemy to state
        setState({
            ...state,
            positions: {
                ...state.positions,
                enemies: [...state.positions.enemies].concat(newEnemy)
            }
        });
    }

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
    }

    const handlePlayerMovement = (dirObj) => {
        const { top, left } = state.positions.player;
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

        setState({
            ...state,
            positions: {
                ...state.positions,
                player: {
                    top: top + (player * dirObj.top),
                    left: left + (player * dirObj.left)
                }
            }
        });
    }

    const handlePlayerCollision = () => {
        resetGame();
    }

    const startGame = () => {
        const enemyInterval = setInterval(updateEnemyPositions, 50);
        setIntervalEnemy(enemyInterval);
        const timeInterval = setInterval(updateGame, 1000);
        setIntervalTime(timeInterval)
        const gameInterval = setInterval(updateEnemiesInPlay, 250);
        setIntervalGame(gameInterval);
    }

    useEffect(() => {
        startGame();
        // fetchGlobalHighScore();
        return () => {
            clearInterval(gameIntervalId);
            clearInterval(enemyIntervalId);
            clearInterval(timeIntervalId);
        }
    }, []);

    const updateGame = () => {
        const { timeElapsed } = state;

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
    }

    const updateEnemyPositions = () => {
        const { enemySpeed, positions: { enemies }, size: { player, maxDim } } = state;

        setState({
            ...state,
            positions: {
                ...state.positions,
                enemies: enemies.filter(enemy => !enemy.remove).map(enemy => {
                    if (enemy.top < (0 - player) ||
                        enemy.top > maxDim + player ||
                        enemy.left < (0 - player) ||
                        enemy.left > maxDim + player) {
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
    }

    const updateEnemiesInPlay = () => {
        const { activeEnemies } = state;
        const { enemies } = state.positions;

        if (enemies.length < activeEnemies) {
            placeEnemy();
        }
    }

    const updateTimeAndScore = () => {
        const { timeElapsed, playerScore, baseScore } = state;

        setState({
            ...state,
            timeElapsed: timeElapsed + 1,
            playerScore: playerScore + baseScore,
        });
    }

    const incrementEnemySpeed = () => {
        const { enemySpeed } = state;

        setState({
            ...state,
            enemySpeed: parseFloat((enemySpeed + 0.25).toFixed(2))
        });
    }

    const incrementActiveEnemies = () => {
        setState({
            ...state,
            activeEnemies: state.activeEnemies + 1
        });
    }

    const resetGame = () => {
        const { boardSize, playerSize } = props;
        const { playerScore, highScore, globalHighScore } = state;

        // clear intervals
        clearInterval(gameIntervalId);
        clearInterval(enemyIntervalId);
        clearInterval(timeIntervalId);

        // if high score is higher than global high score, update it
        if (playerScore > globalHighScore) {
            updateGlobalHighScore(playerScore);
        }

        // reset state
        setState({
            ...getDefaultState({ boardSize, playerSize, highScore }),
            // persist debug state and high scores
            highScore: playerScore > highScore ? playerScore : highScore,
            globalHighScore
        });
        // restart game
        startGame();
    }

    // const handleDebugToggle = () => {
    //     setState({
    //         debug: debug.checked
    //     });

    const fetchGlobalHighScore = () => {
        // axios.get(url)
        //     .then(data => {
        //         this.setState({
        //             globalHighScore: data.data.fields.global_high_score
        //         })
        //     })
        //     .catch(err => console.warn(err))
    }

    const updateGlobalHighScore = (highScore) => {
        // axios.patch(url, {
        //     "fields": {
        //         "global_high_score": highScore
        //     }
        // })  
        // .then(data => {
        //     this.setState({
        //         globalHighScore: data.data.fields.global_high_score
        //     });
        // })
        // .catch(err => console.warn(err))
    }

    const style = () => {
        return {
            width: '85%',
            maxWidth: '600px',
            margin: '0 auto'
        };
    }

    const {
        size: { board, player },
        positions: { player: playerPos },
        playerScore,
        timeElapsed,
        highScore,
        globalHighScore
    } = state;

    return (
        <div style={style()}>
            <GameInfo
                playerScore={playerScore}
                timeElapsed={timeElapsed}
                highScore={highScore}
                globalHighScore={globalHighScore}
            />
            <Board dimension={board * player}>
                <Player
                    size={player}
                    position={playerPos}
                    handlePlayerMovement={handlePlayerMovement} />

                {
                    state.positions.enemies.map(enemy =>
                        <Enemy key={enemy.key}
                            size={player}
                            info={enemy}
                            playerPosition={playerPos}
                            onCollide={handlePlayerCollision}
                        />
                    )
                }
            </Board>
            {/* {false && <p style={{ position: 'fixed', bottom: 0, left: 16 }}>Debug: <input type="checkbox" onChange={handleDebugToggle} ref={n => debug = n} /></p>} */}
            {/* {state.debug && <DebugState data={state} />} */}
        </div>
    )
}

export default Game;