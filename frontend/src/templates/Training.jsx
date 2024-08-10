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
    const [sharedTrainingDataState, setSharedTrainingDataState] = useState(sharedTrainingData)
    const [training, setTraining] = useState({});
    const [name, setName] = useState('')

    const displaysLoading = (isOK) => {
        setIsLoading(isOK); 
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

    useEffect(() => {
        const saveValue = sessionStorage.getItem('training');
        const saveName = sessionStorage.getItem('name');
        if (saveValue) {
            setTraining(saveValue);
            setTraining(Object.keys(JSON.parse(saveValue)).reduce((accumulated, dia) => {
                if (dia !== 'nome' && JSON.parse(saveValue)[dia].exercicios.length > 0) {
                    accumulated[dia] = JSON.parse(saveValue)[dia];
                }
                return accumulated;
            }, {}))
        }else{
            setTraining(Object.keys(JSON.parse(sharedTrainingDataState)).reduce((accumulated, dia) => {
                if (dia !== 'nome' && JSON.parse(sharedTrainingDataState)[dia].exercicios.length > 0) {
                    accumulated[dia] = JSON.parse(sharedTrainingDataState)[dia];
                }
                return accumulated;
            }, {}))
        }
        setName(saveName)
    }, []);
      
    useEffect(() => {
        if(sharedTrainingDataState){
            sessionStorage.setItem('training', sharedTrainingDataState);
            sessionStorage.setItem('name', JSON.parse(sharedTrainingDataState).nome);
        }
    }, [sharedTrainingDataState]);

    const generatedTraining = (response) => {
        setIsLoading(false);
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = name + " treino.pdf";
        document.body.appendChild(a); 
        a.click();
        URL.revokeObjectURL(url);
        
        setServerResponse('Relatório gerado com sucesso, verifiquei sua pasta de download.');
        setAlertType('success');
        setTimeout(() => {
            setServerResponse(false)
        }, 5000);
    };

    const authorization = setAuthorization.slice(6, setAuthorization.length);

    const handleTrainingChange = (day, updatedTraining) => {
        setTraining((prevTraining) => ({
          ...prevTraining,
          [day]: {
            exercicios: updatedTraining,
          },
        }));
        const trainingInSessionStorage = sessionStorage.getItem('training');
        if(trainingInSessionStorage){
            const parsedTraining = JSON.parse(trainingInSessionStorage);
            parsedTraining[day].exercicios = updatedTraining
            sessionStorage.setItem('training', JSON.stringify(parsedTraining));
        }
    };      
      

    const handleTrainingEdit = (day, index, key, newValue) => {
        setTraining((prevTraining) => {
          const updatedExercises = prevTraining[day].exercicios.map((exercise, i) => 
            i === index ? { ...exercise, [key]: newValue } : exercise
          );
      
          return {
            ...prevTraining,
            [day]: {
              ...prevTraining[day],
              exercicios: updatedExercises,
            },
          };
        });
    };
      
      
        return (
            <div>
                {serverResponse && <Alert message={serverResponse} type={alertType} />}
                {isLoading && <Loading message='Gerando relatório'/>}
                {!isLoading && (
                    <>
                    <InformativeParagraph message={`Olá ${name}, treino gerado por inteligência artificial, caso necessite é possível editá-lo.`} />
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

                            "nome": name
                        }}
                        inputs = {[
                            ...Object.keys(training).map((key) => (
                                <TrainingDisplayCard key={key} trainingOfDay={training[key]} day={key.charAt(0).toLowerCase() + key.slice(1)} setAlert={setServerResponse} setAlertType={setAlertType} changeTraining={handleTrainingChange} editTraining={handleTrainingEdit}>
                                
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