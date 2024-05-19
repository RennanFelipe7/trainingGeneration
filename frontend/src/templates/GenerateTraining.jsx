import React from "react";

import { Head } from '../components/head/Head.jsx'
import { InformativeParagraph } from '../components/informativeParagraph/InformativeParagraph.jsx'
import { Form } from '../components/form/Form.jsx'
import { FreeInput} from '../components/freeInput/FreeInput.jsx'
import { FixedInput } from '../components/fixedInput/FixedInput.jsx'
import { NumberInput } from '../components/numberInput/NumberInput.jsx'
import { MultipleFixedInput } from '../components/multipleFixedInput/MultipleFixedInput.jsx'
import { MultipleFixedInputWithOption } from '../components/multipleFixedInputWithOption/MultipleFixedInputWithOption.jsx'

export default function GenerateTraining() {
    return (
        <div className="App">
        <Head></Head>
        <InformativeParagraph 
          message = "Insira abaixo as informações do usuário:"
          styleDiv = {{height: '10%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        ></InformativeParagraph>
        <Form 
          action = "/traininggeneration"
          value="Gerar Treino"
          inputs = {[
  
            <NumberInput 
              id="Peso"
              description="Peso:"
              step={0.1}
              placeholder="Insira aqui o peso"
              max={500}
              min={0}
              name="peso"
              key='weight'
            ></NumberInput>,
  
             <FixedInput
              description = "Biotipo corporal:"
              options = {[
                {value: 'Ectomorfo', id:'ectomorfo', name: 'bodyBiotype'},
                {value: 'Endomorfo', id:'endomorfo', name: 'bodyBiotype'},
                {value: 'Mesomorfo', id:'mesomorfo', name: 'bodyBiotype'}
              ]}
              key='bodyBiotype'
            ></FixedInput>,
  
            <MultipleFixedInputWithOption
              description = "Objetivos do treino:"
              options = {[
                {value: 'Perda de peso', id:'perdaDePeso', name: 'trainingObjective'},
                {value: 'Ganho de massa muscular', id:'ganhoDeMassaMuscular', name: 'trainingObjective'},
                {value: 'Aumento da resistência', id:'aumentoDaResistência', name: 'trainingObjective'},
                {value: 'Melhoria da saúde geral', id:'MelhoriaDaSaudeGeral', name: 'trainingObjective'},
              ]}
              key='trainingObjective'
            ></MultipleFixedInputWithOption>,
  
            <NumberInput 
              id="Altura"
              description="Altura:"
              step={0.01}
              placeholder="Insira aqui a altura"
              max={250}
              min={0}
              name="altura"
              key='height'
            ></NumberInput>,
  
            <FixedInput
              description = "Nível de condicionamento físico:"
              options = {[
                {value: 'Iniciante', id:'iniciante', name: 'fitnessLevel'},
                {value: 'Intermediário ', id:'intermediário ', name: 'fitnessLevel'},
                {value: 'Avançado', id:'avançado', name: 'fitnessLevel'}
              ]}
              key='fitnessLevel'
            ></FixedInput>,
  
            <MultipleFixedInputWithOption
              description = "Preferências de exercício:"
              options = {[
                {value: 'Peitoral', id:'peitoral', name: 'exercisePreferences'},
                {value: 'Pernas', id:'pernas', name: 'exercisePreferences'},
                {value: 'Costas', id:'costas', name: 'exercisePreferences'},
              ]}
              key='exercisePreferences'
            ></MultipleFixedInputWithOption>,
  
            <MultipleFixedInputWithOption
              description = "Restrições de saúde:"
              options = {[
                {value: 'Não possui', id:'naopossui', name: 'healthRestrictions'},
                {value: 'Doenças cardíacas', id:'doencasCardiacas', name: 'healthRestrictions'},
                {value: 'Asma', id:'asma', name: 'healthRestrictions'},
                {value: 'Hipertensão arterial', id:'hipertensaoArterial', name: 'healthRestrictions'},
              ]}
              key='healthRestrictions'
            ></MultipleFixedInputWithOption>,
  
            <MultipleFixedInput
              description = "Disponibilidade:"
              options = {[
                {value: 'Segunda', id:'segunda', name: 'Availability'},
                {value: 'Terça', id:'terça', name: 'Availability'},
                {value: 'Quarta', id:'quarta', name: 'Availability'},
                {value: 'Quinta', id:'quinta', name: 'Availability'},
                {value: 'Sexta', id:'sexta', name: 'Availability'},
                {value: 'Sábado', id:'sabado', name: 'Availability'},
                {value: 'Domingo', id:'somingo', name: 'Availability'},
              ]}
              key='availability'
            ></MultipleFixedInput>,
  
            <NumberInput 
              id="idade"
              description="Idade:"
              step={1}
              placeholder="Insira aqui a idade"
              max={120}
              min={0}
              name="idade"
              key='age'
            ></NumberInput>,
  
            <FixedInput
              description = "Sexo:"
              options = {[
                {value: 'Masculino', id:'masculino', name: 'gender'},
                {value: 'Feminino', id:'feminino', name: 'gender'}
              ]}
              key='gender'
            ></FixedInput>,
  
            <MultipleFixedInputWithOption
              description = "Histórico de lesões:"
              options = {[
                {value: 'Lesões Musculares', id:'lesoesMusculares', name: 'injuryHistory'},
                {value: 'Torção do Joelho', id:'torcaoDoJoelho', name: 'injuryHistory'},
                {value: 'Entorses de Tornozelo', id:'entorsesDeTornozelo', name: 'injuryHistory'},
                {value: 'Problemas nos Meniscos', id:'problemasNosMeniscos', name: 'injuryHistory'}
              ]}
              key='injuryHistory'
            ></MultipleFixedInputWithOption>,
  
            <FreeInput
              description='Nome:'
              type = 'text'
              placeholder = 'Insira aqui o nome'
              key = 'name'
              id='username'
            ></FreeInput>,
  
          ]}
        ></Form>
      </div>
    );
}
