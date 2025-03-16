/// <reference types="Cypress" />
const faker = require('faker-br')

describe('Teste e2e do FrontEnd do TrainingGeneration', () => {

    beforeEach(() => {
        cy.RestoreSessionStorage()
    });

    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function randomFloat(min, max) {
        return (Math.random() * (max - min) + min).toFixed(1);
    }

    let userName = faker.name.firstName() + ' ' + faker.name.lastName()

    let nameNewTraining = faker.commerce.productName()

    const normalizeDayAccentuation = (dia) => {
        switch (dia) {
            case 'segunda':
                return 'Segunda';
            case 'terca':
                return 'Terça';
            case 'quarta':
                return 'Quarta';
            case 'quinta':
                return 'Quinta';
            case 'sexta':
                return 'Sexta';
            case 'sabado':
                return 'Sábado';
            case 'domingo':
                return 'Domingo';
            default:
                return dia;
        }
    };

    const removeAccentOfTheDay = (dia) => {
        switch (dia) {
            case 'terça':
                return 'terca';
            case 'sábado':
                return 'sabado';
            default:
                return dia;
        }
    }
    
    function testMultipleFixedInputWithOption(baseSelector, inputText, amount){
        cy.get(`[data-cy="button CreateNewOption ${baseSelector}:"]`).should('be.visible').click()
        cy.get(`[data-cy="input CreateNewOption ${baseSelector}:"]`).should('be.visible').type('Teste'.repeat(15) + 'G')
        cy.get(`[data-cy="input CreateNewOption ${baseSelector}:"]`).should('be.visible').invoke('attr', 'value').then((value) => {
            expect(value.length).to.eq(50)
            expect(value).not.include('G')
        })
        cy.get(`[data-cy="input CreateNewOption ${baseSelector}:"]`).should('be.visible').clear()
        for (let index = 1; index <= amount; index++) {
            if(index > 1){
                cy.get(`[data-cy="button CreateNewOption ${baseSelector}:"]`).should('be.visible').click()
            }
            cy.get(`[data-cy="input CreateNewOption ${baseSelector}:"]`).should('be.visible').type(`${inputText} ${index}`)
            cy.get(`[data-cy="confirm CreateNewOption ${baseSelector}:"]`).should('be.visible').click()
            cy.wait(200)
        }
        cy.get(`[data-cy="button CreateNewOption ${baseSelector}:"]`).should('be.visible').and('be.disabled')
    }

    function testNumberInput(baseSelector, max, min){
        cy.get(`[data-cy="numberInput ${baseSelector} decrement"]`).should('be.visible').click().click()
        cy.get(`[data-cy="alert numberInput ${baseSelector}"]`).should('be.visible').and('have.text', `Valor inválido! máximo: ${max} mínimo: ${min}`)
        cy.get(`[data-cy="numberInput ${baseSelector} input"]`).should('be.visible').clear()
        cy.get(`[data-cy="numberInput ${baseSelector} input"]`).should('be.visible').type(max)
        cy.get(`[data-cy="numberInput ${baseSelector} decrement"]`).should('be.visible').click()
        cy.get(`[data-cy="numberInput ${baseSelector} increase"]`).should('be.visible').click().click()
        cy.get(`[data-cy="alert numberInput ${baseSelector}"]`).should('be.visible').and('have.text', `Valor inválido! máximo: ${max} mínimo: ${min}`)
    }

    function testRadioInput(firstSelectedSelector, secondSelectedSelector){
        cy.wait(500)
        cy.get(`[data-cy="button ${firstSelectedSelector}"]`).should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get(`[data-cy="${secondSelectedSelector}"]`).should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get(`[data-cy="${firstSelectedSelector}"]`).next().should('not.be.checked')
    }

    function testMultipleFixedInpu(baseSelector){
        baseSelector.forEach(element => {
            cy.wait(500)
            cy.get(`[data-cy="${element}"]`).should('be.visible').click({ scrollBehavior: 'center' })
        }); 
        baseSelector.forEach(element => {
            cy.get(`[data-cy="${element}"]`).next().should('be.checked')
            cy.get(`[data-cy="button ${element}"]`).should('be.visible').find('img').should('have.attr', 'src').and('include', 'check');
        });
    }

    function testeFreeInput(baseSelector, max){
        cy.get(`[data-cy="input ${baseSelector}"]`).should('be.visible').type('T'.repeat(max) + 'G')
        cy.get(`[data-cy="input ${baseSelector}"]`).should('be.visible').invoke('attr', 'value').then((value) => {
            expect(value.length).to.eq(max)
            expect(value).not.include('G')
        })
    }

    let pdfToken = ''
    let connectSid = ''

    it('Deverá verificar se é possível gerar um treino', () => {

        cy.intercept({
            method: 'POST',
            url: '**/traininggeneration',
        }).as('getPdfToken')

        cy.visit('https://localhost:3000/traininggeneration');

        cy.get('[data-cy="numberInput Peso input"]').should('be.visible').type(randomFloat(0.1, 500))
        cy.wait(500)
        cy.get('[data-cy="button endomorfo"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="perdaDePeso"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="numberInput Altura input"]').should('be.visible').type(randomInteger(1, 250))
        cy.wait(500)
        cy.get('[data-cy="iniciante"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="peitoral"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="naopossui"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="segunda"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="terca"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="quarta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="quinta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="sexta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="numberInput idade input"]').should('be.visible').type(randomInteger(1, 250))
        cy.wait(500)
        cy.get('[data-cy="masculino"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="naoPossui"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="input username"]').type(userName)
        cy.wait(500)
        cy.get('[data-cy="submit Gerar Treino"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.get('[data-cy="loading Gerando treino"]').should('be.visible')
        cy.get('.logoImage').scrollIntoView().should('be.visible')

        cy.wait('@getPdfToken').then((response) => {
            pdfToken = response.response.headers.authorization.split(' ')[1]
            connectSid = response.response.headers['set-cookie'][1].split('=')[1].split(';')[0]
        })

        cy.get('[data-cy="Treino gerado com sucesso."]').should('be.visible').and('have.text', 'Treino gerado com sucesso.')
        cy.wait(1000)
    });

    it('Deverá verificar se as informações do treino estão corretas', () => {

        cy.visit('https://localhost:3000/training');

        cy.get(`[data-cy="informativeParagraph Olá ${userName}, treino gerado por inteligência artificial, caso necessite é possível editá-lo."]`).should('be.visible')

        cy.task('returnMockTraining').then((mockTraining) => {

            let formatedMock = mockTraining.candidates[0].content.parts[0].text.replace("```json", '').replace("```", '')
            formatedMock = JSON.parse(formatedMock)
            formatedMock = Object.entries(formatedMock).filter(([dia, valor]) => valor.exercicios.length > 0);
            formatedMock = Object.fromEntries(formatedMock);
            for (let day in formatedMock) {
                cy.get(`[data-cy="dayOfWeek ${normalizeDayAccentuation(day)}"]`).should('be.visible').and('have.text', normalizeDayAccentuation(day))
                formatedMock[day].exercicios.forEach((exercise, indexDay) => {
                    cy.get(`[data-cy="numberOfTraining ${indexDay + 1} ${day}"]`).scrollIntoView().should('be.visible').and('have.text', 'Treino ' + (indexDay + 1))
                    cy.get(`[data-cy="input name ${indexDay} ${day}"]`).should('be.visible').invoke('attr', 'value').then((value) => {
                        expect(value).to.eq((exercise.nome))
                    })
                    cy.get(`[data-cy="input repeticoes ${indexDay} ${day}"]`).should('be.visible').invoke('attr', 'value').then((value) => {
                        expect(parseInt(value)).to.eq((exercise.repeticoes))
                    })
                    cy.get(`[data-cy="input descanso ${indexDay} ${day}"]`).should('be.visible').invoke('attr', 'value').then((value) => {
                        expect(value).to.eq((exercise.descanso))
                    })
                    cy.get('[data-cy^="parentDivOfAllTraningDisplayCard"]').eq(0).should('be.visible').scrollTo(0, indexDay * 150, {ensureScrollable: false})
                });
            }

        })
        cy.wait(1000)
    });

    it('Deverá verificar se é possível editar um treino gerado por IA inserindo um novo valor e com sugestão', () => {
        cy.visit('https://localhost:3000/training')

        cy.get('[data-cy^="editAttribute nome"]').eq(0).should('be.visible').click()
        cy.wait(500)
        cy.get('[data-cy^="input name"]').eq(0).should('be.visible').clear().type("Supino reto")
        cy.wait(500)
        cy.get('[data-cy^="confirmAttribute nome"]').eq(0).should('be.visible').click()
        cy.wait(500)

        cy.get('[data-cy^="editAttribute repeticoes"]').eq(0).should('be.visible').click()
        cy.wait(500)
        cy.get('[data-cy^="input repeticoes"]').eq(0).should('be.visible').clear().type(21)
        cy.wait(500)
        cy.get('[data-cy^="confirmAttribute repeticoes"]').eq(0).should('be.visible').click()
        cy.wait(500)
        
        cy.get('[data-cy^="editAttribute descanso"]').eq(0).should('be.visible').click()
        cy.wait(500)
        cy.get('[data-cy^="input descanso"]').eq(0).should('be.visible').clear().type("3 minutos")
        cy.wait(500)
        cy.get('[data-cy^="confirmAttribute descanso"]').eq(0).should('be.visible').click()
        cy.wait(500)
        cy.reload()

        cy.get('[data-cy^="input name"]').eq(0).should('be.visible').invoke('attr', 'value').then((value) => {
            expect(value).to.eq("Supino reto")
        })
        cy.get('[data-cy^="input repeticoes"]').eq(0).should('be.visible').invoke('attr', 'value').then((value) => {
            expect(value).to.eq("21")
        })
        cy.get('[data-cy^="input descanso"]').eq(0).should('be.visible').should('be.visible').invoke('attr', 'value').then((value) => {
            expect(value).to.eq("3 minutos")
        })

        cy.wait(500)
        cy.get('[data-cy^="editAttribute nome"]').eq(0).should('be.visible').click()
        cy.wait(500)
        cy.get('[data-cy^="input name"]').eq(0).should('be.visible').clear().type("Remada")
        cy.wait(500)
        cy.get('[data-cy="suggestion remada baixa').eq(0).should('be.visible').click()
        cy.get('[data-cy^="confirmAttribute nome"]').eq(0).should('be.visible').click()
        cy.wait(500)

        cy.reload()

        cy.get('[data-cy^="input name"]').eq(0).should('be.visible').invoke('attr', 'value').then((value) => {
            expect(value).to.eq("remada baixa")
        })
        cy.wait(1000)
    });

    it('Deverá verificar se é possível adicionar um novo treino', () => {
        cy.visit('https://localhost:3000/training');
        cy.get('[data-cy^="parentDivOfAllTraningDisplayCard"]').eq(0).should('be.visible').scrollTo('bottom',{ensureScrollable: false})
        cy.get('[data-cy^="new training"]').eq(0).should('be.visible').click({ scrollBehavior: 'center' })
        cy.get('[data-cy^="nome input new training"]').eq(0).should('be.visible').type(nameNewTraining)
        cy.get('[data-cy^="repeticoes input new training"]').eq(0).should('be.visible').type(10)
        cy.get('[data-cy^="descanso input new training"]').eq(0).should('be.visible').type('40 segundos')
        cy.get('[data-cy^="create new training"]').eq(0).should('not.be.disabled').and('be.visible').click()
        cy.get('[data-cy="Treino criado com sucesso."]').should('be.visible').and('have.text', 'Treino criado com sucesso.')

        cy.reload()

        cy.get('[data-cy^="dayOfWeek"]').should('be.visible').first().invoke('text').then((firstDay) => {
            cy.get('[data-cy^="parentDivOfAllTraningDisplayCard"]').eq(0).should('be.visible').scrollTo('bottom',{ensureScrollable: false})
            let normalizeDay = removeAccentOfTheDay(firstDay.charAt(0).toLowerCase() + firstDay.slice(1))
            cy.get(`[data-cy^='input name '][data-cy$=' ${normalizeDay}']`).last().should('be.visible').invoke('attr', 'value').then((value) => {
               expect(value).to.eq(nameNewTraining)
            })
            cy.get(`[data-cy^='input repeticoes '][data-cy$=' ${normalizeDay}']`).last().should('be.visible').invoke('attr', 'value').then((value) => {
                expect(value).to.eq("10")
            })
            cy.get(`[data-cy^='input descanso '][data-cy$=' ${normalizeDay}']`).last().should('be.visible').invoke('attr', 'value').then((value) => {
                expect(value).to.eq("40 segundos")
            })
        });
        cy.wait(1000)
    });

    it('Deverá verificar se é possível excluir o treino adicionado', () => {
        cy.visit('https://localhost:3000/training');
        cy.get('[data-cy^="parentDivOfAllTraningDisplayCard"]').eq(0).should('be.visible').scrollTo('bottom',{ensureScrollable: false})
        cy.get(`input[value="${nameNewTraining}"]`).scrollIntoView().parent().parent().parent().prev().children().eq(1).should('be.visible').click()
        cy.get('.logoImage').scrollIntoView().should('be.visible')
        cy.get('[data-cy="Treino excluido com sucesso."]').should('be.visible').and('have.text', 'Treino excluido com sucesso.')
        cy.wait(1000)
    });

    it('Deverá verificar se é possível excluir um dia', () => {
        cy.visit('https://localhost:3000/training');
        cy.get('[data-cy^="excludeDay"]').eq(0).should('be.visible').click()
        cy.get('.logoImage').scrollIntoView().should('be.visible')
        cy.get('[data-cy="Dia excluido com sucesso."]').should('be.visible').and('have.text', 'Dia excluido com sucesso.')
        cy.wait(1000)
    });

    it('Deverá verificar se é possível adicionar um dia e um treino ao dia adicionado', () => {
        cy.visit('https://localhost:3000/training');
        cy.get('[data-cy="AddDay"]').should('be.visible').realHover()
        cy.wait(1000)
        cy.get('[data-cy^="AddDay "]').should('be.visible').eq(0).click({force: true})
        cy.get('.logoImage').scrollIntoView().should('be.visible')
        cy.get('[data-cy="Dia adicionado com sucesso."]').should('be.visible').and('have.text', 'Dia adicionado com sucesso.')
        cy.wait(1000)
        cy.get('[data-cy^="parentDivOfAllTraningDisplayCard"]').eq(0).should('be.visible').scrollTo('bottom',{ensureScrollable: false})
        cy.get('[data-cy^="new training"]').eq(0).should('be.visible').click({ scrollBehavior: 'center' })
        cy.get('[data-cy^="nome input new training"]').eq(0).should('be.visible').type(nameNewTraining)
        cy.get('[data-cy^="repeticoes input new training"]').eq(0).should('be.visible').type(10)
        cy.get('[data-cy^="descanso input new training"]').eq(0).should('be.visible').type('40 segundos')
        cy.get('[data-cy^="create new training"]').eq(0).should('not.be.disabled').and('be.visible').click()
        cy.get('[data-cy="Treino criado com sucesso."]').should('be.visible').and('have.text', 'Treino criado com sucesso.')

        cy.reload()
        cy.get('[data-cy^="dayOfWeek"]').should('be.visible').first().invoke('text').then((firstDay) => {
            cy.get('[data-cy^="parentDivOfAllTraningDisplayCard"]').eq(0).should('be.visible').scrollTo('bottom',{ensureScrollable: false})
            let normalizeDay = removeAccentOfTheDay(firstDay.charAt(0).toLowerCase() + firstDay.slice(1))
            cy.get(`[data-cy^='input name '][data-cy$=' ${normalizeDay}']`).last().should('be.visible').invoke('attr', 'value').then((value) => {
               expect(value).to.eq(nameNewTraining)
            })
            cy.get(`[data-cy^='input repeticoes '][data-cy$=' ${normalizeDay}']`).last().should('be.visible').invoke('attr', 'value').then((value) => {
                expect(value).to.eq("10")
            })
            cy.get(`[data-cy^='input descanso '][data-cy$=' ${normalizeDay}']`).last().should('be.visible').invoke('attr', 'value').then((value) => {
                expect(value).to.eq("40 segundos")
            })
        });
        cy.wait(1000)
    });
    
    it('Deverá verificar se é possível retrair e expandir um treino', () => {
        cy.visit('https://localhost:3000/training');
        cy.get('[data-cy^="expandAndRetract"]').eq(0).should('be.visible').click()
        cy.get('[data-cy^="parentDivOfAllTraningDisplayCard"]').eq(0).should('be.visible').and('have.css', 'height', '50px')
        cy.get('[data-cy^="expandAndRetract"]').eq(0).should('be.visible').click()
        cy.get('[data-cy^="parentDivOfAllTraningDisplayCard"]').eq(0).should('be.visible').and('have.css', 'height', '300px')
    });

    it('Deverá solicitar um relatório com o treino e verificar se as informações estão corretas', () => {
        cy.visit('https://localhost:3000/training');
        let contentOfPage = []
        cy.get('[data-cy^="dayOfWeek"]').each((element) => {
            cy.wrap(element).invoke('text').then((text) => {
                contentOfPage.push(text)
            })
        })
        cy.get('[data-cy^="numberOfTraining"]').each((element) => {
            cy.wrap(element).invoke('text').then((text) => {
                contentOfPage.push(text + ':')
            })
        })
        cy.get('[data-cy^="input name"]').each((element) => {
            cy.wrap(element).invoke('attr', 'value').then((value) => {
                contentOfPage.push('Nome: ' + value)
            })
        })
        cy.get('[data-cy^="input repeticoes"]').each((element) => {
            cy.wrap(element).invoke('attr', 'value').then((value) => {
                contentOfPage.push('Repetições: ' + value)
            })
        })
        cy.get('[data-cy^="input descanso"]').each((element) => {
            cy.wrap(element).invoke('attr', 'value').then((value) => {
                contentOfPage.push('Descanso: ' + value)
            })
        }).then(() =>{
            cy.setCookie('token', pdfToken)
            cy.setCookie('connect.sid', String(connectSid))
            cy.get('[data-cy="submit Gerar Relatório"]').should('be.visible').click()
            cy.get('[data-cy="Relatório gerado com sucesso, verifiquei sua pasta de download."]').should('be.visible').and('have.text', 'Relatório gerado com sucesso, verifiquei sua pasta de download.')
            cy.wait(5000)

            cy.task('readPdf', `${userName} treino.pdf`).then((text) => {
                expect(text).contain('Atividades do(a):')
                expect(text).contain(userName)
                let pdfTextArray = text.split('\n').filter(item => item !== '');
                contentOfPage.forEach(element => {
                    expect(pdfTextArray).include(element)
                    const index = pdfTextArray.indexOf(element);
                    pdfTextArray.splice(index, 1);
                });
            })
            cy.task('deleteFile', `${userName} treino.pdf`).then((deletedTheFile) => {expect(deletedTheFile).to.equal(true)})
        })
    });


    it('Deverá verificar se não é possível gerar um treino com as informações do usuário vazias', () => {

        cy.visit('https://localhost:3000/traininggeneration');
        cy.get('[data-cy="submit Gerar Treino"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.get('[data-cy="As seguintes informações do usuário são nessesárias: Peso, Biotipo corporal, Objetivos do treino, Altura, Nível de condicionamento físico, Preferências de exercício, Restrições de saúde, Disponibilidade, Idade, Sexo, Histórico de lesões, Nome."]').should('be.visible').and('have.text', 'As seguintes informações do usuário são nessesárias: Peso, Biotipo corporal, Objetivos do treino, Altura, Nível de condicionamento físico, Preferências de exercício, Restrições de saúde, Disponibilidade, Idade, Sexo, Histórico de lesões, Nome.')
        cy.wait(500)
    });

    it('Deverá verificar se os inputs de informações do usuário não aceitam valores inválidos', () => {

        cy.visit('https://localhost:3000/traininggeneration');

        testNumberInput('Peso', 500, 0.1)
        testNumberInput('Altura', 250, 1)
        testNumberInput('idade', 120, 1)

        testRadioInput('endomorfo', 'ectomorfo')        
        testRadioInput('avançado', 'iniciante')        
        testRadioInput('feminino', 'masculino')        

        testMultipleFixedInputWithOption('Objetivos do treino', 'Objetivo', 6)
        testMultipleFixedInputWithOption('Preferências de exercício', 'Preferência', 6)
        testMultipleFixedInputWithOption('Restrições de saúde', 'Restrição', 6)
        testMultipleFixedInputWithOption('Histórico de lesões', 'Histórico', 6)

        testMultipleFixedInpu(['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'])
        
        testeFreeInput('username', 70)
    });

    it('Deverá verificar se os inputs de texto não aceitam caracteres inválidos', () => {

        cy.visit('https://localhost:3000/traininggeneration');

        cy.get('[data-cy="numberInput Peso input"]').should('be.visible').type(randomFloat(0.1, 500))
        cy.wait(500)
        cy.get('[data-cy="button endomorfo"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        
        cy.get(`[data-cy="button CreateNewOption Objetivos do treino:"]`).should('be.visible').click()
        cy.get(`[data-cy="input CreateNewOption Objetivos do treino:"]`).should('be.visible').type('你')
        cy.get(`[data-cy="confirm CreateNewOption Objetivos do treino:"]`).should('be.visible').click()

        cy.get('[data-cy="numberInput Altura input"]').should('be.visible').type(randomInteger(1, 250))
        cy.wait(500)
        cy.get('[data-cy="iniciante"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="peitoral"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="naopossui"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="segunda"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="terca"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="quarta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="quinta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="sexta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="numberInput idade input"]').should('be.visible').type(randomInteger(1, 250))
        cy.wait(500)
        cy.get('[data-cy="masculino"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="naoPossui"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="input username"]').type(userName)
        cy.wait(500)
        cy.get('[data-cy="submit Gerar Treino"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.get('[data-cy="loading Gerando treino"]').should('be.visible')

        cy.get('[data-cy="O caractere é inválido 你"]').should('be.visible').and('have.text', 'O caractere é inválido 你')
        cy.get('[data-cy="O caractere é inválido 你"]', {timeout: 10000}).should('not.exist')

        cy.get('[data-cy="numberInput Peso input"]').should('be.visible').type(randomFloat(0.1, 500))
        cy.wait(500)
        cy.get('[data-cy="button endomorfo"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="perdaDePeso"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="numberInput Altura input"]').should('be.visible').type(randomInteger(1, 250))
        cy.wait(500)
        cy.get('[data-cy="iniciante"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="peitoral"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="naopossui"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="segunda"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="terca"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="quarta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="quinta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="sexta"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="numberInput idade input"]').should('be.visible').type(randomInteger(1, 250))
        cy.wait(500)
        cy.get('[data-cy="masculino"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="naoPossui"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.wait(500)
        cy.get('[data-cy="input username"]').type('好')
        cy.wait(500)
        cy.get('[data-cy="submit Gerar Treino"]').should('be.visible').click({ scrollBehavior: 'center' })
        cy.get('[data-cy="loading Gerando treino"]').should('be.visible')
        cy.get('[data-cy="O caractere é inválido 好"]').should('be.visible').and('have.text', 'O caractere é inválido 好')
        cy.get('[data-cy="O caractere é inválido 好"]', {timeout: 10000}).should('not.exist')
    });

    

    afterEach(() => {
        cy.SaveSessionStorage()
    })
});