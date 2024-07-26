import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TrainingDisplayCard from '../components/trainingDisplayCard/TrainingDisplayCard.jsx';
import { Form } from '../components/form/Form.jsx';
import { InformativeParagraph } from '../components/informativeParagraph/InformativeParagraph.jsx';
import { Loading } from "../components/loading/Loading.jsx";
import { Alert } from '../components/alert/Alert.jsx';
import { useLocation } from 'react-router-dom';

export default function Training({ sharedTrainingData, setAuthorization }) {


    const [isLoading, setIsLoading] = useState(false);
    const [serverResponse, setServerResponse] = useState(null);
    const [alertType, setAlertType] = useState(null);
    const location = useLocation();

    const displaysLoading = () => {
        setIsLoading(true); 
    };
  
    useEffect(() => {
        if (location) {
            setServerResponse('Treino gerado com sucesso.');
            setAlertType('success');
            setTimeout(() => {
                setServerResponse(false)
            }, 5000);
        }
    }, [location]);

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
        
        setServerResponse('Relatório gerado com sucesso, verifiquei sua pasta de download.');
        setAlertType('success');
        setTimeout(() => {
            setServerResponse(false)
        }, 5000);
    };
      

    const trainingJson = JSON.parse(sharedTrainingData)

    const nome = trainingJson.nome

    const authorization = setAuthorization.slice(6, setAuthorization.length);

    const [training, setTraining] = useState(
        Object.keys(trainingJson).reduce((accumulated, dia) => {
            if (dia !== 'nome' && trainingJson[dia].exercicios.length > 0) {
                accumulated[dia] = trainingJson[dia];
            }
            return accumulated;
        }, {})
    );

        return (
            <div>
                {serverResponse && <Alert message={serverResponse} type={alertType} />}
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
                        token={authorization}
                        payload={{
                            "segunda": {
                                "exercicios": []
                            },
                            "terca": {
                                "exercicios": []
                            },
                            "quarta": {
                                "exercicios": []
                            },
                            "quinta": {
                                "exercicios": []
                            },
                            "sexta": {
                                "exercicios": []
                            },
                            "sabado": {
                                "exercicios": []
                            },
                            "domingo": {
                                "exercicios": []
                            },

                            "nome": nome
                        }}
                        inputs = {[
                            ...Object.keys(training).map((key) => (
                                <TrainingDisplayCard key={key} trainingOfDay={training[key]} day={key.charAt(0).toLowerCase() + key.slice(1)} setAlert={setServerResponse} setAlertType={setAlertType}>
                                
                                </TrainingDisplayCard>
                            )),
                        ]}
                        setServerResponse={setServerResponse}
                        setAlertType={setAlertType}
                    ></Form>
                </>)}
            </div>
        );
}

Training.prototype = {
    sharedTrainingData: PropTypes.string.isRequired
}