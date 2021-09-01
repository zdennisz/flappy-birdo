import React from 'react'
import './GameOver.scss'
interface GameOverSettings {
    score: number,
    retry: () => void
}


const GameOver = (props: GameOverSettings) => {

    const retryHandler = () => {

        props.retry()
    }

    return (
        <>
            <div className="game_over_container">
                <div className="score">Score : {props.score}</div>
                <div className="game_over_buttons"> <button className="game_over_btn" onClick={retryHandler}>Retry</button><button className="game_over_btn">Save Score</button> </div>

            </div>
        </>)
}


export default GameOver