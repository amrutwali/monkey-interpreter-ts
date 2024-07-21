// jest.config.js

module.exports = {
	verbose: true,
	preset: 'ts-jest',
	testEnvironment: 'node',
	// testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
	testRegex: '.*\\.spec\\.(ts|tsx|js|jsx)$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
};
