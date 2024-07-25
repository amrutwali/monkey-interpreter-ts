import * as os from 'os'
import * as readline from 'readline'
import start from './repl/repl'

function main() {
	const user = os.userInfo()

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})


	console.log(`Hello ${user.username}! This is the Monkey programming language\n`)
	console.log(`Feel free to type any commands\n`)

	start(rl)
}

main()
