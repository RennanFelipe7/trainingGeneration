import { useState, useEffect} from 'react'
import './trainingDisplayCard.css'
import bin from '../../images/bin.png'
import edit from '../../images/edit.png'
import confirm from '../../images/confirm.png'
import PropTypes from 'prop-types';
import expandAndRetract from '../../images/expandAndRetract.png';
import suggestedExercisesUtil from '../../utils/suggestedExercises.json'
import { useDispatch } from 'react-redux';
import { setAnyInputIsEmpty } from '../../slices/trainingDisplayCard';

export default function TrainingDisplayCard({ trainingOfDay, day, setAlert, setAlertType, changeTraining, editTraining}) {

    const addIdInTraining = (exercicios) => {
        return exercicios.map((element, index) => {
            return { ...element, id: index };
        });
    };

    const [formattedDay, setFormattedDay] = useState(day);

    useEffect(() => {
        const formatarDia = (dia) => {
            switch (dia) {
                case 'terca':
                return 'Terça';
                case 'sabado':
                return 'Sábado';
                default:
                return dia;
            }
        };
        setFormattedDay(formatarDia(day));
    }, [day]);

    const [trainingDataOfTheDay, setTrainingDataOfTheDay] = useState(addIdInTraining(trainingOfDay.exercicios))

    const [deleteTraining, setDeleteTraining] = useState([]); 
    const [styleEditInput, setStyleEditInput] = useState({}); 
    const [styleAlert, setStyleAlert] = useState({});
    const [styleEditButton, setStyleEditButton] = useState({}); 
    const [styleConfirmInput, setStyleConfirmInput] = useState({}); 
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingIndexReadOnly, setEditingIndexReadOnly] = useState(null);
    //const [inputValue, setInputValue] = useState({});
    const [stylenewTraining, setStylenewTraining] = useState({}); 
    const [styleAddNewTraining, setStyleAddNewTraining] = useState({}); 
    const [name, setName] = useState('');
    const [repetition, setRepetition] = useState();
    const [rest, setRest] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [title, setTitle] = useState('');
    const [titleIsEmpty, setTitleIsEmpty] = useState('');
    const [styleAddTraining, setStyleAddTraining] = useState({}); 
    const [rotate, setRotate] = useState(false);
    const [isrotate, setIsRotate] = useState(false);
    const [overflowY, setOverflowY] = useState('auto');
    const [pointerEvents, setPointerEvents] = useState('auto')
    const [execiseSuggestion, setExerciseSuggestion] = useState(suggestedExercisesUtil)
    const [searchTerm, setSearchTerm] = useState('');
    const [inputValue, setInputValue] = useState(trainingDataOfTheDay.map(exercicio => ({
        nome: exercicio.nome,
        repeticoes: parseInt(exercicio.repeticoes),
        descanso: exercicio.descanso
    })));
    const [suggestionIndex, setSuggestionIndex] = useState(null);
    const [styleSuggestionDiv, setStyleSuggestionDiv] = useState({})
    const [isMatch, setIsMatch] = useState(false)
    const [indexSuggestion, setIndexSuggestion] = useState(null);
    const [inputEditingIsEmpty, setInputEditingIsEmpty] = useState(false);
    const [inputEditingIsEmptyIndex, setInputEditingIsEmptyIndex] = useState(null);
    const [anyInputIsEmpty, setAnyInputIsEmptyState] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAnyInputIsEmpty(anyInputIsEmpty));
    }, [anyInputIsEmpty]);

    const excludeTraining = (index) => {
        let updatedTraining = trainingDataOfTheDay.filter(a => a.id !== index)
        setTrainingDataOfTheDay(updatedTraining);
        changeTraining(day, updatedTraining);

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
        setEditingIndex(index);
        setEditingIndexReadOnly(index)
    }
    
    const hideInput = () => {
        setStyleEditInput({border: 'none', cursor: 'default', backgroundColor: 'transparent', color: '#F2F2F2'});
        setEditingIndex(null);
        setEditingIndexReadOnly(null)
    }

    const displaySuggestion = (index) => {
        setSuggestionIndex(index)
        setStyleSuggestionDiv({display: 'block'});
    }

    const setIfIsEmpty = (index) => {
        setInputEditingIsEmptyIndex(index)
        setInputEditingIsEmpty(true)
    }

    const changeValue = (event, type, min, max, index) => {
        const newValue = event.target.value;

        setInputValue(prevValues => ({
            ...prevValues,
            [index]: {
                ...prevValues[index],
                [type]: newValue
            }
        }));

        if(type === 'nome' || type === 'descanso'){
            if (newValue.replace(/\s+/g, '') === '') {
                setInputValue(prevValues => ({
                    ...prevValues,
                    [index]: {
                        ...prevValues[index],
                        [type]: ''
                    }
                }));
                setAnyInputIsEmptyState(true)
                if(type === 'nome'){
                    setIfIsEmpty(index + 'nome')
                }else{
                    setIfIsEmpty(index + 'descanso')
                }
            } else if (newValue.length <= max) {
                setInputValue(prevValues => ({
                    ...prevValues,
                    [index]: {
                        ...prevValues[index],
                        [type]: newValue
                    }
                }));
                setAnyInputIsEmptyState(false)
                setInputEditingIsEmptyIndex(null)
                setInputEditingIsEmpty(false)
            } else {
                setStyleAlert({display: 'block'})
                setTimeout(() => {
                    setStyleAlert({display: 'none'})
                }, 3000);
                setInputValue(prevValues => ({
                    ...prevValues,
                    [index]: {
                        ...prevValues[index],
                        [type]: newValue.substring(0, max)
                    }
                }));
                event.target.value = newValue.substring(0, max)
                setAnyInputIsEmptyState(false)
                setInputEditingIsEmptyIndex(null)
                setInputEditingIsEmpty(false)
            }
        }

        if(type === 'repeticoes'){
            if (newValue === '') {
                setInputValue(prevValues => ({
                    ...prevValues,
                    [index]: {
                        ...prevValues[index],
                        [type]: ''
                    }
                }));
                setAnyInputIsEmptyState(true)
                setIfIsEmpty(index +'repeticoes')
            } else if (newValue <= max && newValue >= min) {
                setInputValue(prevValues => ({
                    ...prevValues,
                    [index]: {
                        ...prevValues[index],
                        [type]: newValue
                    }
                }));
                setAnyInputIsEmptyState(false)
                setInputEditingIsEmptyIndex(null)
                setInputEditingIsEmpty(false)
            } else if (newValue > max){
                setStyleAlert({display: 'block'})
                setTimeout(() => {
                    setStyleAlert({display: 'none'})
                }, 3000);
                setInputValue(prevValues => ({
                    ...prevValues,
                    [index]: {
                        ...prevValues[index],
                        [type]: max
                    }
                }));
                event.target.value = max
                setAnyInputIsEmptyState(false)
                setInputEditingIsEmptyIndex(null)
                setInputEditingIsEmpty(false)
            }else if(newValue < min){
                setStyleAlert({display: 'block'})
                setTimeout(() => {
                    setStyleAlert({display: 'none'})
                }, 3000);
                setInputValue(prevValues => ({
                    ...prevValues,
                    [index]: {
                        ...prevValues[index],
                        [type]: min
                    }
                }));
                event.target.value = min
                setAnyInputIsEmptyState(false)
                setInputEditingIsEmptyIndex(null)
                setInputEditingIsEmpty(false)
            }
        }

        editTraining(day, index, type, newValue)
        const trainingInSessionStorage = sessionStorage.getItem('training');
        if(trainingInSessionStorage){
            const parsedTraining = JSON.parse(trainingInSessionStorage);
            parsedTraining[day].exercicios[index][type] = newValue
            sessionStorage.setItem('training', JSON.stringify(parsedTraining));
        }

        if(type === 'nome'){
            setSearchTerm(newValue);
            setIndexSuggestion(index);
        }
    };

    useEffect(() => {
        const match = execiseSuggestion.some(exercise =>
            exercise.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setIsMatch(match);
    }, [searchTerm]);

    useEffect(() => {
        if (searchTerm.length >= 3 && isMatch) {
            displaySuggestion(indexSuggestion + 'nome');
        } else {
            setSuggestionIndex(null);
            setStyleSuggestionDiv({ display: 'none' });
        }
    }, [isMatch, searchTerm, indexSuggestion]);

    useEffect(() => {

    }, [execiseSuggestion]);
    
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
            let updatedTraining = [...trainingDataOfTheDay, {nome: nome.charAt(0).toUpperCase() + nome.slice(1), repeticoes: repeticoes, descanso: descanso, id: validId()}]
            setTrainingDataOfTheDay(updatedTraining);
            changeTraining(day, updatedTraining)
            setStylenewTraining({display: 'block'})
            setStyleAddNewTraining({display: 'none'})
            setName('')
            setRepetition('')
            setRest('')
            
            setTimeout(() => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }, 1);
            
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
            setTitleIsEmpty('')
        }else{
            setIsEmpty(true)
            setStyleAddTraining({ backgroundColor: 'grey', cursor: 'no-drop' });
            setTitleIsEmpty('Informe os valores para Nome, Repetições e Descanso.')
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

    const rotateOnClick = () => {
        setPointerEvents('none')
        setRotate(!rotate);
        setIsRotate(true)
        if (rotate) {
            setTimeout(() => {
                setOverflowY('auto');
            }, 2000); 
        } else {
            setTimeout(() => {
                setOverflowY('hidden');
            }, 2000); 
        }
        setTimeout(() => {
            setIsRotate(false);
        }, 2000);
        setTimeout(() => {
            setPointerEvents('auto')
        }, 2000);
    };

    function choiseExercise(exercise, index, day) {
        setInputValue(prevValues => ({
            ...prevValues,
            [index]: {
                ...prevValues[index],
                nome: exercise
            }
        }));
        editTraining(day, index, 'nome', exercise)
        const trainingInSessionStorage = sessionStorage.getItem('training');
        if(trainingInSessionStorage){
            const parsedTraining = JSON.parse(trainingInSessionStorage);
            parsedTraining[day].exercicios[index]['nome'] = exercise
            sessionStorage.setItem('training', JSON.stringify(parsedTraining));
        }
        setSuggestionIndex(null)
        setStyleSuggestionDiv({display: 'none'});
    }
    
    useEffect(() => {
        
    }, [inputValue]);

    const highlightText = (text, term) => {
        if (!term) return text;
        const parts = text.split(new RegExp(`(${term})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === term.toLowerCase() ? <span key={index} style={{ fontWeight: 'bold' }}>{part}</span> : part
        );
    };
    
    return(
        <div className="parentDivOfAllTraningDisplayCard"
            style={{
                height: rotate ? '5vmax' : '30vmax',
                transition: 'height 2s linear',
                overflowY: overflowY,
                pointerEvents: pointerEvents
            }}
        >
            <div className='dayOfWeek'>
                <p>{formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1)}</p>
            </div>
            <div className='expandAndRetract'>
                <button type='button' 
                disabled={isrotate}
                    style={{
                        transform: rotate ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 2s linear',
                    }}
                    onClick={rotateOnClick}>
                    <img src={expandAndRetract} alt="" />
                </button>
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
                                <p className='atribute'>Nome: </p><input name={day} type="text" value={inputValue[index]?.nome || ''}  className='displaysInformation' readOnly={editingIndexReadOnly === (index + 'nome') ? null : true} style={editingIndex === (index + 'nome') ? styleEditInput : null} onChange={(event) => changeValue(event, 'nome', 1, 45, index)} maxLength={45}/>
                                <p className='alertInputError' style={editingIndex === (index + 'nome') ? styleAlert : null}>O nome deve conter no máximo 45 caracteres.</p>
                                <div className='suggestedExercises' style={suggestionIndex === (index + 'nome') ? styleSuggestionDiv : null}>
                                    <div className="dropdown-content">
                                    {execiseSuggestion.map((exercise, idx) => (
                                        exercise.toLowerCase().includes(searchTerm.toLowerCase()) && (
                                            <div key={idx} className="dropdown-item">
                                                <p onClick={() => choiseExercise(exercise, index, day)}>
                                                    {highlightText(exercise, searchTerm)}
                                                </p>
                                            </div>
                                        )
                                    ))}
                                    </div>
                                </div>
                            </div>
                            <div className='editAttribute' style={editingIndex === (index + 'nome') ? styleEditButton: null}>
                                <button type='button' onClick={() => displayInput(index + 'nome')}>
                                    <img src={edit} alt="Editar nome"/>
                                </button>
                            </div>
                            <div className='confirmAttribute' style={editingIndex === (index + 'nome') ? styleConfirmInput: null}>
                                <button type='button' onClick={() => hideInput()} disabled={inputEditingIsEmptyIndex === (index + 'nome') ? inputEditingIsEmpty: null}>
                                    <img src={confirm} alt="Salvar nome"/>
                                </button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='trainingAttribute'>
                                <p className='atribute'>Repetições: </p> <input name={day} type="number" value={inputValue[index]?.repeticoes} className='displaysInformation' readOnly={editingIndexReadOnly === (index + 'repeticoes') ? null : true} style={editingIndex === (index + 'repeticoes') ? styleEditInput : null} onChange={(event) => changeValue(event, 'repeticoes', 1, 100, index)} max={100} min={1}/>
                                <p className='alertInputError' style={editingIndex === (index + 'repeticoes') ? styleAlert : null}>A repetição deve estar entre 1 e 100</p>
                            </div>
                            <div className='editAttribute' style={editingIndex === (index + 'repeticoes') ? styleEditButton: null}>
                                <button type='button' onClick={() => displayInput(index + 'repeticoes')}>
                                    <img src={edit} alt="Editar repetição"/>
                                </button>
                            </div> 
                            <div className='confirmAttribute' style={editingIndex === (index + 'repeticoes') ? styleConfirmInput: null}>
                                <button type='button' onClick={() => hideInput()} disabled={inputEditingIsEmptyIndex === (index + 'repeticoes') ? inputEditingIsEmpty: null}>
                                    <img src={confirm} alt="Salvar repetição"/>
                                </button>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='trainingAttribute'>
                                <p className='atribute'>Descanso: </p> <input name={day} type="text" value={inputValue[index]?.descanso || ''} className='displaysInformation' readOnly={editingIndexReadOnly === (index + 'descanso') ? null : true} style={editingIndex === (index + 'descanso') ? styleEditInput : null} onChange={(event) => changeValue(event, 'descanso', 1, 40, index)} maxLength={40}/>
                                <p className='alertInputError' style={editingIndex === (index + 'descanso') ? styleAlert : null}>O descanso deve conter no máximo 40 caracteres.</p>
                            </div>
                            <div className='editAttribute' style={editingIndex === (index + 'descanso') ? styleEditButton: null}>
                                <button type='button' onClick={() => displayInput(index + 'descanso')}>
                                    <img src={edit} alt="Editar descanso"/>
                                </button>
                            </div> 
                            <div className='confirmAttribute' style={editingIndex === (index + 'descanso') ? styleConfirmInput: null}>
                                <button type='button' onClick={() => hideInput()} disabled={inputEditingIsEmptyIndex === (index + 'descanso') ? inputEditingIsEmpty: null}>
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
                        <button type='button' onClick={() => createNewTraining(name, repetition, rest)} disabled={isEmpty} style={styleAddTraining} title={titleIsEmpty}>Adicionar</button>
                    </div>
                </div>
            </div> 
        </div>
    )
}

TrainingDisplayCard.prototype = {
    trainingOfDay: PropTypes.object.isRequired,
    day: PropTypes.string.isRequired,
    setAlert: PropTypes.func.isRequired,
    alertType: PropTypes.string.isRequired
}