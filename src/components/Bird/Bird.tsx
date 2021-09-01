import React from 'react'
import './Bird.scss';
import image from "../../constants/Images"
interface BirdLocation {
    bottom: number,
    left: number,
    isFlapping: boolean
}

const Bird = (birdLocation: BirdLocation) => {
    const birdWidth = 60
    const birdHeight = 60

    return (
        <div className="bird" style={{ width: `${birdWidth}px`, height: `${birdHeight}px`, bottom: `${birdLocation.bottom - birdHeight / 2}px`, left: `${birdLocation.left - birdWidth / 2}px` }}>
            <img className="bird_image" src={birdLocation.isFlapping ? image.birdFlappingSrc.default : image.birdNotFlappingSrc.default} alt="Bird" />
        </div>
    )
}

export default Bird