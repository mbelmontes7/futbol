import React from 'react'
import Typewriter from 'typewriter-effect'


type Props = {}

const TypewriterTitle = (props: Props) => {
    return (
        <Typewriter
            options={{
                loop: true,

            }}
            onInit={(typewriter) => {
                typewriter
                    .typeString("An app for futbol lovers")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Futbolnet")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("The Beautiful Game  ")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Love for the game  ")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("Futbolnet")
                    .start();
            }}


        />

    );
};

export default TypewriterTitle