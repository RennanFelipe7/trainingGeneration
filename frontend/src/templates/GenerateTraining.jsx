import React from "react";
import {useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { InformativeParagraph } from '../components/informativeParagraph/InformativeParagraph.jsx'
import { Form } from '../components/form/Form.jsx'
import { FreeInput} from '../components/freeInput/FreeInput.jsx'
import { FixedInput } from '../components/fixedInput/FixedInput.jsx'
import { NumberInput } from '../components/numberInput/NumberInput.jsx'
import { MultipleFixedInput } from '../components/multipleFixedInput/MultipleFixedInput.jsx'
import { MultipleFixedInputWithOption } from '../components/multipleFixedInputWithOption/MultipleFixedInputWithOption.jsx'
import { Loading } from "../components/loading/Loading.jsx";

export default function GenerateTraining({setSharedTrainingData}) {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const displaysLoading = () => {
      setIsLoading(true); 
    };

    const generatedTraining = (training) => {
      setSharedTrainingData((training.data));
      setIsLoading(false);
      navigate('/training');
    };

    return (
        <div className="generateTraining">
        {isLoading && <Loading message='Gerando treino' />}
        {!isLoading && <InformativeParagraph 
          message = "Insira abaixo as informações do usuário:"
        ></InformativeParagraph>}
        {!isLoading && <Form
          displaysLoading={displaysLoading}
          generatedTraining={generatedTraining} 
          action = "/traininggeneration"
          value="Gerar Treino"
          responseType='application/json'
          payload = {{
            "peso": 0,
            "biotipo_corporal": '',
            "objetivos_do_treino": [],
            "altura": 0,
            "nivel_de_condicionamento_fisico": '',
            "preferencias_de_exercicio": [],
            "restricoes_de_saude": [],
            "disponibilidade": [],
            "idade": 0,
            "sexo": '',
            "historico_de_lesoes": [],
            "nome": ''
          }}
          inputs = {[
  
            <NumberInput 
              id="Peso"
              description="Peso:"
              step={0.1}
              placeholder="Insira aqui o peso"
              max={500}
              min={0}
              name="peso"
              key='peso'
            ></NumberInput>,
  
             <FixedInput
              description = "Biotipo corporal:"
              options = {[
                {value: 'Ectomorfo', id:'ectomorfo', name: 'biotipo_corporal'},
                {value: 'Endomorfo', id:'endomorfo', name: 'biotipo_corporal'},
                {value: 'Mesomorfo', id:'mesomorfo', name: 'biotipo_corporal'}
              ]}
              name='biotipo_corporal'
              key='biotipo_corporal'
            ></FixedInput>,
  
            <MultipleFixedInputWithOption
              description = "Objetivos do treino:"
              options = {[
                {value: 'Perda de peso', id:'perdaDePeso', name: 'objetivos_do_treino'},
                {value: 'Ganho de massa muscular', id:'ganhoDeMassaMuscular', name: 'objetivos_do_treino'},
                {value: 'Aumento da resistência', id:'aumentoDaResistência', name: 'objetivos_do_treino'},
                {value: 'Melhoria da saúde geral', id:'MelhoriaDaSaudeGeral', name: 'objetivos_do_treino'},
              ]}
              name='objetivos_do_treino'
              key='objetivos_do_treino'
            ></MultipleFixedInputWithOption>,
  
            <NumberInput 
              id="Altura"
              description="Altura:"
              step={0.01}
              placeholder="Insira aqui a altura"
              max={250}
              min={0}
              name="altura"
              key='altura'
            ></NumberInput>,
  
            <FixedInput
              description = "Nível de condicionamento físico:"
              options = {[
                {value: 'Iniciante', id:'iniciante', name: 'nivel_de_condicionamento_fisico'},
                {value: 'Intermediário ', id:'intermediário ', name: 'nivel_de_condicionamento_fisico'},
                {value: 'Avançado', id:'avançado', name: 'nivel_de_condicionamento_fisico'}
              ]}
              name='nivel_de_condicionamento_fisico'
              key='nivel_de_condicionamento_fisico'
            ></FixedInput>,
  
            <MultipleFixedInputWithOption
              description = "Preferências de exercício:"
              options = {[
                {value: 'Peitoral', id:'peitoral', name: 'preferencias_de_exercicio'},
                {value: 'Pernas', id:'pernas', name: 'preferencias_de_exercicio'},
                {value: 'Costas', id:'costas', name: 'preferencias_de_exercicio'},
              ]}
              name='preferencias_de_exercicio'
              key='preferencias_de_exercicio'
            ></MultipleFixedInputWithOption>,
  
            <MultipleFixedInputWithOption
              description = "Restrições de saúde:"
              options = {[
                {value: 'Não possui', id:'naopossui', name: 'restricoes_de_saude'},
                {value: 'Doenças cardíacas', id:'doencasCardiacas', name: 'restricoes_de_saude'},
                {value: 'Asma', id:'asma', name: 'restricoes_de_saude'},
                {value: 'Hipertensão arterial', id:'hipertensaoArterial', name: 'restricoes_de_saude'},
              ]}
              name='restricoes_de_saude'
              key='restricoes_de_saude'
            ></MultipleFixedInputWithOption>,
  
            <MultipleFixedInput
              description = "Disponibilidade:"
              options = {[
                {value: 'Segunda', id:'segunda', name: 'disponibilidade'},
                {value: 'Terça', id:'terça', name: 'disponibilidade'},
                {value: 'Quarta', id:'quarta', name: 'disponibilidade'},
                {value: 'Quinta', id:'quinta', name: 'disponibilidade'},
                {value: 'Sexta', id:'sexta', name: 'disponibilidade'},
                {value: 'Sábado', id:'sabado', name: 'disponibilidade'},
                {value: 'Domingo', id:'somingo', name: 'disponibilidade'},
              ]}
              name='disponibilidade'
              key='disponibilidade'
            ></MultipleFixedInput>,
  
            <NumberInput 
              id="idade"
              description="Idade:"
              step={1}
              placeholder="Insira aqui a idade"
              max={120}
              min={0}
              name="idade"
              key='idade'
            ></NumberInput>,
  
            <FixedInput
              description = "Sexo:"
              options = {[
                {value: 'Masculino', id:'masculino', name: 'sexo'},
                {value: 'Feminino', id:'feminino', name: 'sexo'}
              ]}
              name='sexo'
              key='sexo'
            ></FixedInput>,
  
            <MultipleFixedInputWithOption
              description = "Histórico de lesões:"
              options = {[
                {value: 'Lesões Musculares', id:'lesoesMusculares', name: 'historico_de_lesoes'},
                {value: 'Torção do Joelho', id:'torcaoDoJoelho', name: 'historico_de_lesoes'},
                {value: 'Entorses de Tornozelo', id:'entorsesDeTornozelo', name: 'historico_de_lesoes'},
                {value: 'Problemas nos Meniscos', id:'problemasNosMeniscos', name: 'historico_de_lesoes'}
              ]}
              name = 'historico_de_lesoes'
              key = 'historico_de_lesoes'
            ></MultipleFixedInputWithOption>,
  
            <FreeInput
              description='Nome:'
              type = 'text'
              placeholder = 'Insira aqui o nome'
              key = 'nome'
              id='username'
              name='nome'
            ></FreeInput>,
  
          ]}
        ></Form>}
      </div>
    );
}

GenerateTraining.propTypes = {
  setSharedTrainingData: PropTypes.func.isRequired
}