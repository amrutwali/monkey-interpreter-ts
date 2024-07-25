// repl/repl.ts

import * as readline from 'readline'
import { Lexer } from '../lexer/lexer'
import { EOF, Token, } from '../token/token'

const prompt = "?] "

export default function start(rl: readline.Interface) {

	rl.setPrompt(prompt)
	rl.prompt()

	rl.on('line', (line: string) => {
		const lexer = new Lexer(line);

		console.log();

		let token: Token;

		while ((token = lexer.nextToken()).type !== EOF) {
			console.log(token);
		}

		console.log();
		rl.prompt();
	})

	rl.on('close', () => {
		console.log('Goodbye!');
		process.exit(0);
	})
}
