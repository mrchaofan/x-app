/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path')

const baseDir = path.join(__dirname, '..')
exports.baseDir = baseDir

function getExternals() {
    const modules = ['electron']
    return modules.reduce((externals, module) => {
        externals[module] = `commonjs2 ${module}`
        return externals
    }, {})
}

exports.getExternals = getExternals