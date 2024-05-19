import React from 'react'
import {Route, Routes} from 'react-router-dom'
import GenerateTraining from './templates/GenerateTraining.jsx'
import './App.css'

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/traininggeneration' element={<GenerateTraining/>}></Route>
      </Routes>
    </div>
  );
}
