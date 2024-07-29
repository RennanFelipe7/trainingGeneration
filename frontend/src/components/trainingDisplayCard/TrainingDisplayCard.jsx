import { useState, useEffect} from 'react'
import './trainingDisplayCard.css'
import bin from '../../images/bin.png'
import edit from '../../images/edit.png'
import confirm from '../../images/confirm.png'
import PropTypes from 'prop-types';
import expandAndRetract from '../../images/expandAndRetract.png';

export default function TrainingDisplayCard({ trainingOfDay, day, setAlert, setAlertType }) {

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
    const [inputValue, setInputValue] = useState('');
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
        setEditingIndex(index);
        setEditingIndexReadOnly(index)
    }
    
    const hideInput = () => {
        setStyleEditInput({border: 'none', cursor: 'default', backgroundColor: 'transparent', color: '#F2F2F2'});
        setEditingIndex(null);
        setEditingIndexReadOnly(null)
    }

    const changeValue = (event, type, min, max) => {
        const newValue = event.target.value;

        if(type === 'nome' || type === 'descanso'){
            if (newValue === '') {
                setInputValue('');
            } else if (newValue.length <= max) {
                setInputValue(newValue);
            } else {
                setStyleAlert({display: 'block'})
                setTimeout(() => {
                    setStyleAlert({display: 'none'})
                }, 3000);
                setInputValue(newValue.substring(0, max));
                event.target.value = newValue.substring(0, max)
            }
        }

        if(type === 'repeticao'){
            if (newValue === '') {
                setInputValue('');
            } else if (newValue <= max && newValue >= min) {
                setInputValue(newValue);
            } else if (newValue > max){
                setStyleAlert({display: 'block'})
                setTimeout(() => {
                    setStyleAlert({display: 'none'})
                }, 3000);
                setInputValue(max);
                event.target.value = max
            }else if(newValue < min){
                setStyleAlert({display: 'block'})
                setTimeout(() => {
                    setStyleAlert({display: 'none'})
                }, 3000);
                setInputValue(min);
                event.target.value = min
            }
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
                                Nome: <input name={day} type="text" defaultValue={inputValue || exercicio.nome} className='displaysInformation' readOnly={editingIndexReadOnly === (index + 'nome') ? null : true} style={editingIndex === (index + 'nome') ? styleEditInput : null} onChange={(event) => changeValue(event, 'nome', 1, 45)} maxLength={45}/>
                                <p className='alertInputError' style={editingIndex === (index + 'nome') ? styleAlert : null}>O nome deve conter no máximo 45 caracteres.</p>
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
                                Repetições: <input name={day} type="number" defaultValue={inputValue || parseInt(exercicio.repeticoes)} className='displaysInformation' readOnly={editingIndexReadOnly === (index + 'repeticao') ? null : true} style={editingIndex === (index + 'repeticao') ? styleEditInput : null} onChange={(event) => changeValue(event, 'repeticao', 1, 100)} max={100} min={1}/>
                                <p className='alertInputError' style={editingIndex === (index + 'repeticao') ? styleAlert : null}>A repetição deve estar entre 1 e 100</p>
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
                                Descanso: <input name={day} type="text" defaultValue={inputValue || exercicio.descanso} className='displaysInformation' readOnly={editingIndexReadOnly === (index + 'descanso') ? null : true} style={editingIndex === (index + 'descanso') ? styleEditInput : null} onChange={(event) => changeValue(event, 'descanso', 1, 40)} maxLength={40}/>
                                <p className='alertInputError' style={editingIndex === (index + 'descanso') ? styleAlert : null}>O descanso deve conter no máximo 40 caracteres.</p>
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