let SESSION_STORAGE_MEMORY = {};

Cypress.Commands.add("SaveSessionStorage", () => {
    Object.keys(sessionStorage).forEach((key) => {
        SESSION_STORAGE_MEMORY[key] = sessionStorage[key];
    });
});

Cypress.Commands.add("RestoreSessionStorage", () => {
    Object.keys(SESSION_STORAGE_MEMORY).forEach((key) => {
        sessionStorage.setItem(key, SESSION_STORAGE_MEMORY[key]);
    });
});
