import {React, useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import GenerateTraining from './templates/GenerateTraining.jsx'
import Training from './templates/Training.jsx'
import './App.css'
import { Head } from './components/head/Head.jsx'

export default function App() {

  const [sharedTrainingData, setSharedTrainingData] = useState(null);
  
  return (
    <div className="App">
      <Head></Head>
      <Routes>
        <Route path='/traininggeneration' element={<GenerateTraining setSharedTrainingData={setSharedTrainingData}/>}></Route>
        <Route path='/training' element={<Training sharedTrainingData={sharedTrainingData} />}></Route>
      </Routes>
    </div>
  );
}
