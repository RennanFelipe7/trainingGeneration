const PDFDocument = require('pdfkit');
const fs = require('fs');

module.exports = function createPDF(pdfContent, nome) {

    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
            size: 'A4',
            layout: 'portrait',
            margins: { top: 0, bottom: 0, left: 0, right: 0 },
        });
    
        const MemStream = new require('stream').PassThrough();
        doc.pipe(MemStream);
    
        let lastAvailableSpace = 0;
        let lastAvailableSpaceDay = 0
    
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#003F63');
    
        lastAvailableSpace += 90;
        lastAvailableSpaceDay += 90;
    
        doc.rect(0, 0, doc.page.width, lastAvailableSpace).fill('white');
    
        doc.image('../backend/src/utils/images/TrainingGenerationLogo.png', 150, 5, { width: 300, height: 80 });
        
        lastAvailableSpace += 30;
        lastAvailableSpaceDay += 30;
        doc.fontSize(20);
        doc.text('Atividades do: ' + nome, 50, lastAvailableSpace);
        
        for (let day in pdfContent) {
            if (pdfContent[day].exercicios.length > 0 && lastAvailableSpace + 120 <= 842 && (lastAvailableSpaceDay + 200) <= 799) { 
                lastAvailableSpace += 50;
                lastAvailableSpaceDay += 50;
                doc.fontSize(17);
                if (day === 'terca') {
                    doc.font('Helvetica-Bold').text('Terça', 255, lastAvailableSpace);
                }else if (day === 'sabado') {
                    doc.font('Helvetica-Bold').text('Sábado', 255, lastAvailableSpace);
                }else{
                    doc.font('Helvetica-Bold').text(day.charAt(0).toUpperCase() + day.slice(1), 255, lastAvailableSpace);
                }
            }else if(lastAvailableSpace + 120 > 842 && lastAvailableSpaceDay + 170 <= 842){
                doc.addPage();
                lastAvailableSpaceDay = 0
                doc.rect(0, 0, doc.page.width, doc.page.height).fill('#003F63');
                doc.rect(0, 0, doc.page.width, 90).fill('white');
                doc.image('../backend/src/utils/images/TrainingGenerationLogo.png', 150, 5, { width: 300, height: 80 });
                lastAvailableSpace = 90
                lastAvailableSpace += 50;
                lastAvailableSpaceDay += 50;
                doc.fontSize(17);
                if (day === 'terca') {
                    doc.font('Helvetica-Bold').text('Terça', 255, lastAvailableSpace);
                }else if (day === 'sabado') {
                    doc.font('Helvetica-Bold').text('Sábado', 255, lastAvailableSpace);
                }else{
                    doc.font('Helvetica-Bold').text(day.charAt(0).toUpperCase() + day.slice(1), 255, lastAvailableSpace);
                }
            }else if((lastAvailableSpaceDay + 200) > 799 && pdfContent[day].exercicios.length > 0){
                doc.addPage();
                lastAvailableSpaceDay = 0
                doc.rect(0, 0, doc.page.width, doc.page.height).fill('#003F63');
                lastAvailableSpace = 90
                doc.rect(0, 0, doc.page.width, 90).fill('white');
                doc.image('../backend/src/utils/images/TrainingGenerationLogo.png', 150, 5, { width: 300, height: 80 });
                lastAvailableSpaceDay = 90
                lastAvailableSpace += 50;
                lastAvailableSpaceDay += 50;
                doc.fontSize(17);
                if (day === 'terca') {
                    doc.font('Helvetica-Bold').text('Terça', 255, lastAvailableSpace);
                }else if (day === 'sabado') {
                    doc.font('Helvetica-Bold').text('Sábado', 255, lastAvailableSpace);
                }else{
                    doc.font('Helvetica-Bold').text(day.charAt(0).toUpperCase() + day.slice(1), 255, lastAvailableSpace);
                }
            }
    
            pdfContent[day].exercicios.forEach((element, index) => {
    
                if(lastAvailableSpace + 170 <= 842){
                    lastAvailableSpace += 50;
                    lastAvailableSpaceDay += 50
                    doc.font('Helvetica-Bold').text('Treino ' + (index + 1) + ':', 50, lastAvailableSpace);
                    doc.font('Helvetica')
                    lastAvailableSpace += 30
                    lastAvailableSpaceDay += 30
    
                    doc.text('Nome: ' + element.nome, 70, lastAvailableSpace);
                    lastAvailableSpace += 20
                    lastAvailableSpaceDay += 20
                    doc.text('Repetições: ' + element.repeticoes, 70, lastAvailableSpace);
                    lastAvailableSpace += 20
                    lastAvailableSpaceDay += 20
                    doc.text('Descanso: ' + element.descanso, 70, lastAvailableSpace);
                }else{
                    doc.addPage();
                    lastAvailableSpaceDay = 0
                    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#003F63');
                    doc.rect(0, 0, doc.page.width, 90).fill('white');
                    doc.image('../backend/src/utils/images/TrainingGenerationLogo.png', 150, 5, { width: 300, height: 80 });
                    lastAvailableSpace = 90
                    lastAvailableSpace += 50;
                    lastAvailableSpaceDay += 50
                    doc.font('Helvetica-Bold').text('Treino ' + (index + 1) + ':', 50, lastAvailableSpace);
                    doc.font('Helvetica')
                    lastAvailableSpace += 30
                    lastAvailableSpaceDay += 30
    
                    doc.text('Nome: ' + element.nome, 70, lastAvailableSpace);
                    lastAvailableSpace += 20
                    lastAvailableSpaceDay += 20
                    doc.text('Repetições: ' + element.repeticoes, 70, lastAvailableSpace);
                    lastAvailableSpace += 20
                    lastAvailableSpaceDay += 20
                    doc.text('Descanso: ' + element.descanso, 70, lastAvailableSpace);
                }
    
            });
        }
        
        doc.end();
    
        const pdfChunks = [];
        MemStream.on('data', (chunk) => pdfChunks.push(chunk));
        MemStream.on('end', () => {
            const pdfBuffer = Buffer.concat(pdfChunks);
            if(pdfBuffer){
                resolve(pdfBuffer)
            }else{
                reject('Não foi possível gerar o PDF, tente novamente em 1 minuto.')
            }
        })
        
    })
};
