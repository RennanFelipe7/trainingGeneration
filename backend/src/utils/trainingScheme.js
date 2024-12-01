const { SchemaType } = require("@google/generative-ai");

const schema = {
    description: "Plano de exercícios semanal",
    type: SchemaType.OBJECT,
    properties: {
        segunda: {
            type: SchemaType.OBJECT,
            properties: {
                exercicios: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nome: {
                                type: SchemaType.STRING,
                                description: "Nome do exercício",
                                nullable: false,
                            },
                            repeticoes: {
                                type: SchemaType.INTEGER,
                                description: "Número de repetições",
                                nullable: false,
                            },
                            descanso: {
                                type: SchemaType.STRING,
                                description: "Tempo de descanso",
                                nullable: false,
                            },
                        },
                        required: ["nome", "repeticoes", "descanso"],
                    },
                },
            },
            required: ["exercicios"],
        },
        terca: {
            type: SchemaType.OBJECT,
            properties: {
                exercicios: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nome: {
                                type: SchemaType.STRING,
                                description: "Nome do exercício",
                                nullable: false,
                            },
                            repeticoes: {
                                type: SchemaType.INTEGER,
                                description: "Número de repetições",
                                nullable: false,
                            },
                            descanso: {
                                type: SchemaType.STRING,
                                description: "Tempo de descanso",
                                nullable: false,
                            },
                        },
                        required: ["nome", "repeticoes", "descanso"],
                    },
                },
            },
            required: ["exercicios"],
        },
        quarta: {
            type: SchemaType.OBJECT,
            properties: {
                exercicios: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nome: {
                                type: SchemaType.STRING,
                                description: "Nome do exercício",
                                nullable: false,
                            },
                            repeticoes: {
                                type: SchemaType.INTEGER,
                                description: "Número de repetições",
                                nullable: false,
                            },
                            descanso: {
                                type: SchemaType.STRING,
                                description: "Tempo de descanso",
                                nullable: false,
                            },
                        },
                        required: ["nome", "repeticoes", "descanso"],
                    },
                },
            },
            required: ["exercicios"],
        },
        quinta: {
            type: SchemaType.OBJECT,
            properties: {
                exercicios: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nome: {
                                type: SchemaType.STRING,
                                description: "Nome do exercício",
                                nullable: false,
                            },
                            repeticoes: {
                                type: SchemaType.INTEGER,
                                description: "Número de repetições",
                                nullable: false,
                            },
                            descanso: {
                                type: SchemaType.STRING,
                                description: "Tempo de descanso",
                                nullable: false,
                            },
                        },
                        required: ["nome", "repeticoes", "descanso"],
                    },
                },
            },
            required: ["exercicios"],
        },
        sexta: {
            type: SchemaType.OBJECT,
            properties: {
                exercicios: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nome: {
                                type: SchemaType.STRING,
                                description: "Nome do exercício",
                                nullable: false,
                            },
                            repeticoes: {
                                type: SchemaType.INTEGER,
                                description: "Número de repetições",
                                nullable: false,
                            },
                            descanso: {
                                type: SchemaType.STRING,
                                description: "Tempo de descanso",
                                nullable: false,
                            },
                        },
                        required: ["nome", "repeticoes", "descanso"],
                    },
                },
            },
            required: ["exercicios"],
        },
        sabado: {
            type: SchemaType.OBJECT,
            properties: {
                exercicios: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nome: {
                                type: SchemaType.STRING,
                                description: "Nome do exercício",
                                nullable: false,
                            },
                            repeticoes: {
                                type: SchemaType.INTEGER,
                                description: "Número de repetições",
                                nullable: false,
                            },
                            descanso: {
                                type: SchemaType.STRING,
                                description: "Tempo de descanso",
                                nullable: false,
                            },
                        },
                        required: ["nome", "repeticoes", "descanso"],
                    },
                },
            },
            required: ["exercicios"],
        },
        domingo: {
            type: SchemaType.OBJECT,
            properties: {
                exercicios: {
                    type: SchemaType.ARRAY,
                    items: {
                        type: SchemaType.OBJECT,
                        properties: {
                            nome: {
                                type: SchemaType.STRING,
                                description: "Nome do exercício",
                                nullable: false,
                            },
                            repeticoes: {
                                type: SchemaType.INTEGER,
                                description: "Número de repetições",
                                nullable: false,
                            },
                            descanso: {
                                type: SchemaType.STRING,
                                description: "Tempo de descanso",
                                nullable: false,
                            },
                        },
                        required: ["nome", "repeticoes", "descanso"],
                    },
                },
            },
            required: ["exercicios"],
        },
    },
    required: ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"],
};

module.exports = schema;
