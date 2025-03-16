import React from 'react';
import robot from '../../images/robot.png'
import './notFoundPage.css'

export default function NotFoundPage (){

    return (
        <div className='parentDivOfAllPageNotFound'>
            <div className='parentDivOfAllMessage'>
                <p className='messagePageNotFound' data-cy={`messagePageNotFound`}>Esta página não existe, clique <button className='returnTraining' data-cy={`button PageNotFound`}><a href="/traininggeneration" data-cy={`anchor PageNotFound`}>aqui</a></button> para gerar um treino</p>
            </div>
            <div className='parentDivOfAllImg'>
                <img src={robot} alt="" className="robot" />
            </div>
        </div>
    );
};
