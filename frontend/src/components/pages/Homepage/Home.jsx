import React from 'react'
import { HomeOjeFour, HomeOjeOne, HomeOjeThree, HomeOjeTwo } from './Data'
import  InfoSection  from '../../infoSection/InfoSection';

const Home = () => {
    return (
        <>
            <InfoSection {...HomeOjeOne} />
            <InfoSection {...HomeOjeTwo} />
            <InfoSection {...HomeOjeThree} />
            <InfoSection {...HomeOjeFour} />
        </>
    )
}

export default Home