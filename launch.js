/* eslint-disable @typescript-eslint/no-require-imports */
const { app } = require("electron")

app.whenReady().then(() => {
    require('./dist/main')
})