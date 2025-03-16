const { defineConfig } = require("cypress");
require('dotenv').config({ path: '../backend/.env' })
const mockTraining = require('../backend/src/mock/responseMockApi.js')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        returnEnv() {
          const specificEnvVariables = {
            RATE_LIMIT_TIME_OF_TRAINING: process.env.RATE_LIMIT_TIME_OF_TRAINING,
            RATE_LIMIT_TIME_OF_REPORT: process.env.RATE_LIMIT_TIME_OF_REPORT,
            RATE_LIMIT_MAX_OF_TRAINING: process.env.RATE_LIMIT_MAX_OF_TRAINING,
            RATE_LIMIT_MAX_OF_REPORT: process.env.RATE_LIMIT_MAX_OF_REPORT,
            LIMIT_TO_LOCK: process.env.LIMIT_TO_LOCK,
            MINUTE_TO_BLOCK: process.env.MINUTE_TO_BLOCK
          }
          return specificEnvVariables
        },
        returnMockTraining() {
          return mockTraining()
        },
        readPdf(filename) {
          const readPdf = require('./cypress/fixtures/readPdf.js')
          return readPdf(filename)
        },
        deleteFile(filename) {
          const deleteFile = require('./cypress/fixtures/deleteFile.js')
          return deleteFile(filename)
        }
      })
      return config
    },
  },
});
