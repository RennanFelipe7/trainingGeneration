import { useState, useEffect} from 'react'
import './trainingDisplayCard.css'
import bin from '../../images/bin.png'
import edit from '../../images/edit.png'
import confirm from '../../images/confirm.png'

export default function TrainingDisplayCard({ trainingOfDay, day, setAlert, setAlertType }) {

    const addIdInTraining = (exercicios) => {
        return exercicios.map((element, index) => {
            return { ...element, id: index };
        });
    };

    const [trainingDataOfTheDay, setTrainingDataOfTheDay] = useState(addIdInTraining(trainingOfDay.exercicios))

    const [deleteTraining, setDeleteTraining] = useState([]); 
    const [styleEditInput, setStyleEditInput] = useState({}); 
    const [styleEditButton, setStyleEditButton] = useState({}); 
    const [styleConfirmInput, setStyleConfirmInput] = useState({}); 
    const [editingIndex, setEditingIndex] = useState(null);
    const [readOnly, setReadOnly] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [stylenewTraining, setStylenewTraining] = useState({}); 
    const [styleAddNewTraining, setStyleAddNewTraining] = useState({}); 
    const [name, setName] = useState('');
    const [repetition, setRepetition] = useState();
    const [rest, setRest] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [title, setTitle] = useState('');
    const [styleAddTraining, setStyleAddTraining] = useState({}); 

    const excludeTraining = (index) => {
        setTrainingDataOfTheDay(trainingDataOfTheDay.filter(a => a.id !== index));

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setAlert('Treino excluido com sucesso.');
        setAlertType('success');
        setTimeout(() => {
            setAlert(false)
        }, 5000);
    };

    useEffect(() => {
        if(trainingDataOfTheDay.length >= 10){
            setIsDisabled(true)
            setStylenewTraining({ backgroundColor: 'grey', cursor: 'no-drop' });
            setTitle('Quantidade máxima diária de treino excedido.')
        }else{
            setIsDisabled(false)
            setStylenewTraining({ backgroundColor: '#33C758', cursor: 'pointer' });
            setTitle('')
        }    
    }, [trainingDataOfTheDay]);

    useEffect(() => {
        checkIsEmpty();
    }, [name, repetition, rest]);

    const calculateExerciseNumbers = () => {
        return trainingDataOfTheDay.map((_, index) => 
            trainingDataOfTheDay.slice(0, index).filter((_, i) => !deleteTraining[i]).length
        );
    };
    
    const exerciseNumbers = calculateExerciseNumbers();

    const displayInput = (index) => {
        setStyleEditInput({border: 'solid clamp(0.08rem, 0.2vw, 0.15rem) black', cursor: 'text', backgroundColor: 'white', color: '#003F63'});
        setStyleEditButton({display: 'none'})
        setStyleConfirmInput({display: 'inline-flex'})
        setReadOnly(false);
        setEditingIndex(index);
    }
    
    const hideInput = () => {
        setStyleEditInput({border: 'none', cursor: 'default', backgroundColor: 'transparent', color: '#F2F2F2'});
        setReadOnly(true);
        setEditingIndex(null);
    }

    const changeValue = event => {
        const newValue = event.target.value;
        if (newValue === '') {
          setInputValue('');
        } else {
          setInputValue(newValue);
        }
    };

    
    const displaysCreateNewTraining = () => {
        setStylenewTraining({display: 'none'})
        setStyleAddNewTraining({display: 'flex'})
        setIsEmpty(true)
        setStyleAddTraining({ backgroundColor: 'grey', cursor: 'no-drop' });
    };
    
    const validId = () => {
        if(trainingDataOfTheDay.length === 0){
            return 0
        }else{
            return trainingDataOfTheDay[trainingDataOfTheDay.length - 1].id + 1
        }
    }

    const createNewTraining = (nome, repeticoes, descanso) => {

        if(trainingDataOfTheDay.length < 10){
            setTrainingDataOfTheDay([...trainingDataOfTheDay, {nome: nome.charAt(0).toUpperCase() + nome.slice(1), repeticoes: repeticoes, descanso: descanso, id: validId()}]);
            setStylenewTraining({display: 'block'})
            setStyleAddNewTraining({display: 'none'})
            setName('')
            setRepetition('')
            setRest('')

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setAlert('Treino criado com sucesso.');
            setAlertType('success');
            setTimeout(() => {
                setAlert(false)
            }, 5000);
        }else{
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            setAlert('Quantidade máxima diária de treino excedido.');
            setAlertType('error');
            setTimeout(() => {
                setAlert(false)
            }, 5000);
        }

    };

    const checkIsEmpty = () => {
        if(name && repetition && rest){
            setIsEmpty(false)
            setStyleAddTraining({ backgroundColor: '#33C758', cursor: 'pointer' });
        }else{
            setIsEmpty(true)
            setStyleAddTraining({ backgroundColor: 'grey', cursor: 'no-drop' });
        }
    }

    const handleChangeName = (e) => {
       setName(e.target.value) 
    }

    const handleChangeRepetition = (e) => {
        setRepetition(e.target.value) 
    }

     const handleChangeRest = (e) => {
        setRest(e.target.value) 
    }

    return(
        <div className="parentDivOfAllTraningDisplayCard">
            <div className='dayOfWeek'>
                <p>{day}</p>
            </div>
            <div className='parentDivOfAllCards'>
                {trainingDataOfTheDay.map((exercicio, index) => (
                    <div key={exercicio.id} className='parentDivOfAllCard'>
                        <div className='namberAndDeleteTraining'>
                            <div className='numberOfExercise'>
                                Treino {exerciseNumbers[index] + 1}
                            </div>
                            <div className='deleteTraining'>
                                <button type='button' onClick={() => excludeTraining(exercicio.id)}>
                                    <img src={bin} alt="Excluir Treino"/>
                                </button>
                            </div>

                        </div>
                        <div className='card'>
                            <div className='trainingAttribute'>
                                Nome: <input name={day} type="text" defaultValue={inputValue || exercicio.nome} className='displaysInformation' readOnly={readOnly} style={editingIndex === (index + 'nome') ? styleEditInput : null} onChange={changeValue} />
                            </div>
                            <div className='editAttribute' style={editingIndex === (index + 'nome') ? styleEditButton: null}>
                                <button type='button' onClick={() => displayInput(index + 'nome')}>
                                    <img src={edit} alt="Editar nome"/>
                                </button>
                            </div>
                            <div className='confirmAttribute' style={editingIndex === (index + 'nome') ? styleConfirmInput: null}>
                                <button type='button' onClick={() => hideInput()}>
                                    <img src={confirm} alt="Salvar nome"/>
                                </button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='trainingAttribute'>
                                Repetições: <input name={day} type="number" defaultValue={inputValue || parseInt(exercicio.repeticoes)} className='displaysInformation' readOnly={readOnly} style={editingIndex === (index + 'repeticao') ? styleEditInput : null} onChange={changeValue}/>
                            </div>
                            <div className='editAttribute' style={editingIndex === (index + 'repeticao') ? styleEditButton: null}>
                                <button type='button' onClick={() => displayInput(index + 'repeticao')}>
                                    <img src={edit} alt="Editar repetição"/>
                                </button>
                            </div> 
                            <div className='confirmAttribute' style={editingIndex === (index + 'repeticao') ? styleConfirmInput: null}>
                                <button type='button' onClick={() => hideInput()}>
                                    <img src={confirm} alt="Salvar repetição"/>
                                </button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='trainingAttribute'>
                                Descanso: <input name={day} type="text" defaultValue={inputValue || exercicio.descanso} className='displaysInformation' readOnly={readOnly} style={editingIndex === (index + 'descanso') ? styleEditInput : null} onChange={changeValue}/>
                            </div>
                            <div className='editAttribute' style={editingIndex === (index + 'descanso') ? styleEditButton: null}>
                                <button type='button' onClick={() => displayInput(index + 'descanso')}>
                                    <img src={edit} alt="Editar descanso"/>
                                </button>
                            </div> 
                            <div className='confirmAttribute' style={editingIndex === (index + 'descanso') ? styleConfirmInput: null}>
                                <button type='button' onClick={() => hideInput()}>
                                    <img src={confirm} alt="Salvar descanso"/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}  
            </div>

            <div className='parentNewTraining'>
                <button type='button' onClick={displaysCreateNewTraining} style={stylenewTraining} disabled={isDisabled} title={title}>Novo Treino</button>
                <div className='createNewTraining' style={styleAddNewTraining}>
                    <div className='cardNewTraining'>
                        <div className='trainingAttribute'>
                            Nome: <input type="text" className='displaysInformationNewTraining' value={name} onChange={handleChangeName} />
                        </div>
                    </div>
                    <div className='cardNewTraining'>
                        <div className='trainingAttribute'>
                            Repetições: <input type="number" className='displaysInformationNewTraining' value={repetition} onChange={handleChangeRepetition} />
                        </div>
                    </div>
                    <div className='cardNewTraining'>
                        <div className='trainingAttribute'>
                            Descanso: <input type="text" className='displaysInformationNewTraining' value={rest} onChange={handleChangeRest} />
                        </div>
                    </div>
                    <div className='addNewTraining'>
                        <button type='button' onClick={() => createNewTraining(name, repetition, rest)} disabled={isEmpty} style={styleAddTraining}>Adicionar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}