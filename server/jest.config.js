const path = require('path');

module.exports = {
    verbose: true,
    //TODO: collectCoverage: true,
    preset: 'ts-jest',
    testEnvironment: 'node',
    //testMatch: [path.join(__dirname, 'src/**/*')],
    moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
    //testRegex: ['**/*'],
};
