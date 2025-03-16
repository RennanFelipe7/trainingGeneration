module.exports = function isValidBrazilianJSON(baseJson, populatedJson) {
    const brazilianLettersRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s´~`,._!@#$%^&*()\-+=\[\]{};:¨'"\\|<>/?]*$/;

    function validateObject(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const result = validateObject(obj[key]);
                if (!result.isValid) {
                    return result;
                }
            } else if (typeof obj[key] === 'string' && !brazilianLettersRegex.test(obj[key])) {
                for (let char of obj[key]) {
                    if (!brazilianLettersRegex.test(char)) {
                        return { isValid: false, invalidChar: char };
                    }
                }
            }
        }
        return { isValid: true, invalidChar: null };
    }

    const baseValidation = validateObject(baseJson);
    if (!baseValidation.isValid) {
        return baseValidation;
    }

    return validateObject(populatedJson);
}
