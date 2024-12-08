import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './form.css'
import axios from 'axios';
import {useSelector} from 'react-redux'
import ReCAPTCHA from "react-google-recaptcha";

export const Form = ({displaysLoading, action, inputs, value, generatedTraining, payload, responseType, setServerResponse, setAlertType, token  }) => {

    const [recaptchaValue, setRecaptchaValue] = useState(null)

    const formRef = useRef();
    useEffect(() => {
        if(token){
            sessionStorage.setItem('token', token)
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formValues = new FormData(formRef.current);

        const firstEntry = formValues.entries().next().value;
        if(firstEntry && firstEntry[0] !== 'g-recaptcha-response'){

            let [key] = firstEntry;

            let requiredInputs = []
            let normalize = []
            if(key !== 'segunda' && key !== 'terca' && key !== 'quarta' && key !== 'quinta' && key !== 'sexta' && key !== 'sabado' && key !== 'domingo'){
                requiredInputs = ['peso', 'biotipo_corporal', 'objetivos_do_treino', 'altura', 'nivel_de_condicionamento_fisico', 'preferencias_de_exercicio', 'restricoes_de_saude', 'disponibilidade', 'idade', 'sexo', 'historico_de_lesoes', 'nome'] 
                normalize = ['Peso', 'Biotipo corporal', 'Objetivos do treino', 'Altura', 'Nível de condicionamento físico', 'Preferências de exercício', 'Restrições de saúde', 'Disponibilidade', 'Idade', 'Sexo', 'Histórico de lesões', 'Nome']
            }else{
                requiredInputs = [] 
                normalize = []
            }

            let insertedInputs = []
            let error = []
            for (const [key, value] of formValues.entries()) {
                if(requiredInputs.includes(key)){
                    if(value){
                        insertedInputs.push(key)
                    }
                }
            }

            let difference = requiredInputs.filter(input => !insertedInputs.includes(input));
            
            if(difference.length > 0){
                difference.forEach((element, index) => {
                    error.push(normalize[requiredInputs.indexOf(element)])
                });
        
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
        
                let formaText = error.toString()
        
                setServerResponse('As seguintes informações do usuário são nessesárias: ' + formaText.replace(/,/g, ', ') + '.');
                setAlertType('error');
                setTimeout(() => {
                    setServerResponse(false)
                }, 5000);
            }else{

                displaysLoading(true)

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
                            if(payload[key]?.hasOwnProperty("exercicios")) {
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
                                        repeticoes: parseInt(training.repeticoes),
                                        descanso: training.descanso
                                    });
                                    cont = 0
                                }
                            }else{
                                if(key === "peso" || key === "altura" || key === "idade"){
                                    value = parseFloat(value)
                                }
                                payload[key] = value;
                            }
                        }
                    }
                });
                if(!recaptchaValue){
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    setServerResponse('Por favor, confirme que você não é um robô.');
                    setAlertType('error');
                    setTimeout(() => {
                        setServerResponse(false)
                    }, 5000);
                    displaysLoading(false)
                    return
                }
                payload['g-recaptcha-response'] = recaptchaValue
                try {
                    await axios.post(
                        process.env.REACT_APP_TRAININGGENERATION_BACKEND_URL + action, 
                        payload,
                        {
                            headers: {
                                'Authorization': `Bearer ${token || sessionStorage.getItem('token')}`
                            },
                            withCredentials: true,
                            responseType: responseType,
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
                    displaysLoading(false)
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    if(typeof(error.response.data) === 'string') {
                        setServerResponse(JSON.parse(error.response.data).error);
                    }else if(typeof(error.response.data) === 'object'){
                        error.response.data.text().then(jsonString => {
                            const jsonObject = JSON.parse(jsonString);
                            setServerResponse(jsonObject.error);
                        })
                    }
                    setAlertType('error');
                    setTimeout(() => {
                        setServerResponse(false)
                    }, 5000);
                }
            }
        }else{
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setServerResponse('Adicione ao menos um treino para continuar.');
            setAlertType('error');
            setTimeout(() => {
                setServerResponse(false)
            }, 5000);
        }
    }

    const { anyInputIsEmpty } = useSelector((state) => state.trainingDisplayCard);

    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value)
    }

    return(
        <div className='parentDivOfAllForm'>
            <form ref={formRef} onSubmit={handleSubmit} className='styleForm' method='POST'>
                <div className='styleContainerInputs'>
                    {inputs.map((inputElement, index) => inputElement)}
                </div>
                <div className='submitContainer'>
                    <input type="submit" value={value} disabled={anyInputIsEmpty} data-cy={`submit ${value}`}/>
                </div>
                <div className='recaptcha'>
                    <ReCAPTCHA
                        sitekey="6LeQAZUqAAAAABQIiiH-RP6lUFJmIRu4Kd0aLXEj"
                        onChange={handleRecaptchaChange}
                    />
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
