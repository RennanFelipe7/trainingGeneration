module.exports = function formatJson(json){
    let jsonResponse = JSON.stringify(json)
    jsonResponse = jsonResponse.trim()
    jsonResponse = jsonResponse.replace(/`/g, '');
    jsonResponse = jsonResponse.replace('json', '');
    return JSON.parse(jsonResponse)
}