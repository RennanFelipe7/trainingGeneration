import React from 'react';
import robot from '../../images/robot.png'
import './notFoundPage.css'

export default function NotFoundPage (){

    return (
        <div className='parentDivOfAllPageNotFound'>
            <div className='parentDivOfAllMessage'>
                <p className='messagePageNotFound'>Esta página não existe, clique <button className='returnTraining'><a href="/traininggeneration">aqui</a></button> para gerar um treino</p>
            </div>
            <div className='parentDivOfAllImg'>
                <img src={robot} alt="" className="robot" />
            </div>
        </div>
    );
};
