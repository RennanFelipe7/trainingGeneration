import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './form.css'
import axios from 'axios';

export const Form = ({displaysLoading, action, inputs, value, generatedTraining, payload, responseType}) => {

    const formRef = useRef();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        displaysLoading()
        const formValues = new FormData(formRef.current);
        
        let cont = 0
        let training = {
            nome: null,
            repeticoes: null,
            descanso: null
        }
        
        formValues.forEach((value, key) => {
            if (Array.isArray(payload[key])) {
                if (!payload[key].includes(value)) {
                    payload[key].push(value);
                }
            }else{
                if(payload[key] !== null) {
                    if(payload[key].hasOwnProperty("exercicios")) {
                        if(cont === 0){
                            training.nome = value
                            cont++
                        }else if(cont === 1){
                            training.repeticoes = value
                            cont++
                        }else if(cont === 2){
                            training.descanso = value
                            payload[key].exercicios.push({
                                nome: training.nome,
                                repeticoes: training.repeticoes,
                                descanso: training.descanso
                            });
                            cont = 0
                        }
                    }else{
                        payload[key] = value;
                    }
                }
            }
        });
        
        try {
            await axios.post(
                process.env.REACT_APP_TRAININGGENERATION_BACKEND_URL + action, 
                payload,
                {
                    withCredentials: true,
                    responseType: responseType
                },
            ).then((response) => {
                formValues.forEach((value, key) => {
                    if (Array.isArray(payload[key])) {
                        if (!payload[key].includes(value)) {
                            payload[key] = []
                        }
                    }else{
                        if(payload[key] !== null) {
                            if(payload[key].hasOwnProperty("exercicios")) {
                                payload[key].exercicios = []
                            }else{
                                payload[key] = '';
                            }
                        }
                    }
                });
                generatedTraining(response)
            })
        } catch (error) {
            console.error('Não foi possível gerar o treino devido ao erro: ' + error);
        }
    }

    return(
        <div className='parentDivOfAllForm'>
            <form ref={formRef} onSubmit={handleSubmit} className='styleForm' method='POST'>
                <div className='styleContainerInputs'>
                    {inputs.map((inputElement, index) => inputElement)}
                </div>
                <div className='submitContainer'>
                    <input type="submit" value={value}/>
                </div>
            </form>
        </div>
    )
}

Form.propTypes = {
    displaysLoading: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    inputs: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    generatedTraining: PropTypes.func.isRequired
};
