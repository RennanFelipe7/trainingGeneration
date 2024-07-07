import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrainingDisplayCard from '../components/trainingDisplayCard/TrainingDisplayCard.jsx';
import { Form } from '../components/form/Form.jsx';
import { InformativeParagraph } from '../components/informativeParagraph/InformativeParagraph.jsx';

export default function Training({ sharedTrainingData }) {


    const displaysLoading = () => {
        
    };
  
    const generatedTraining = () => {
       
    };

    const trainingJson = JSON.parse(sharedTrainingData)

    const token = trainingJson.token

    const [training, setTraining] = useState(
        Object.keys(trainingJson).reduce((accumulated, dia) => {
            if (dia !== 'token' && trainingJson[dia].exercicios.length > 0) {
                accumulated[dia] = trainingJson[dia];
            }
            return accumulated;
        }, {})
    );

        return (
            <div>
                <InformativeParagraph message='Treino gerado por inteligência artificial, caso necessite é possível editá-lo.'></InformativeParagraph>
                <Form
                    displaysLoading={displaysLoading}
                    generatedTraining={generatedTraining} 
                    action = "/reportGeneration"
                    value="Gerar Relatório"
                    payload={{
                        "Segunda": {
                            "exercicios": []
                        },
                        "Terca": {
                            "exercicios": []
                        },
                        "Quarta": {
                            "exercicios": []
                        },
                        "Quinta": {
                            "exercicios": []
                        },
                        "Sexta": {
                            "exercicios": []
                        },
                        "Sabado": {
                            "exercicios": []
                        },
                        "Domingo": {
                            "exercicios": []
                        },
                        "token": token
                    }}
                    inputs = {[
                        ...Object.keys(training).map((key) => (
                            <TrainingDisplayCard key={key} trainingOfDay={training[key]} day={key}>
                            
                            </TrainingDisplayCard>
                        )),
                    ]}
                ></Form>
            </div>
        );
}

Training.prototype = {
    sharedTrainingData: PropTypes.string.isRequired
}