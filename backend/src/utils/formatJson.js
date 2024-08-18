module.exports = function formatJson(json){
    let TrainingPreFormat = json.candidates[0].content.parts[0].text
    TrainingPreFormat = TrainingPreFormat.replace("```json", '')
    TrainingPreFormat = TrainingPreFormat.replace("```", '')
    return JSON.parse(TrainingPreFormat)
}