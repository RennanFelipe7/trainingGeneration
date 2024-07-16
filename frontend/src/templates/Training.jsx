import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrainingDisplayCard from '../components/trainingDisplayCard/TrainingDisplayCard.jsx';
import { Form } from '../components/form/Form.jsx';
import { InformativeParagraph } from '../components/informativeParagraph/InformativeParagraph.jsx';
import { Loading } from "../components/loading/Loading.jsx";

export default function Training({ sharedTrainingData }) {


    const [isLoading, setIsLoading] = useState(false);

    const displaysLoading = () => {
        setIsLoading(true); 
    };
  
    const generatedTraining = (response) => {
        setIsLoading(false);
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = nome + " treino.pdf";
        document.body.appendChild(a); 
        a.click();
        URL.revokeObjectURL(url);
    };
      

    const trainingJson = JSON.parse(sharedTrainingData)

    const token = trainingJson.token
    const nome = trainingJson.nome

    const [training, setTraining] = useState(
        Object.keys(trainingJson).reduce((accumulated, dia) => {
            if (dia !== 'token' && dia !== 'nome' && trainingJson[dia].exercicios.length > 0) {
                accumulated[dia] = trainingJson[dia];
            }
            return accumulated;
        }, {})
    );

        return (
            <div>
                {isLoading && <Loading message='Gerando relatório'/>}
                {!isLoading && (
                    <>
                    <InformativeParagraph message={`Olá ${nome}, treino gerado por inteligência artificial, caso necessite é possível editá-lo.`} />
                        <Form
                        displaysLoading={displaysLoading}
                        generatedTraining={generatedTraining} 
                        action = "/reportGeneration"
                        value="Gerar Relatório"
                        responseType='blob'
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
                            "token": token,

                            "nome": nome
                        }}
                        inputs = {[
                            ...Object.keys(training).map((key) => (
                                <TrainingDisplayCard key={key} trainingOfDay={training[key]} day={key}>
                                
                                </TrainingDisplayCard>
                            )),
                        ]}
                    ></Form>
                </>)}
            </div>
        );
}

Training.prototype = {
    sharedTrainingData: PropTypes.string.isRequired
}