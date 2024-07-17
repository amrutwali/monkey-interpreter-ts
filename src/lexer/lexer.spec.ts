// lexer/lexer.spec.ts

import { Lexer } from "./lexer";
import { Token, TokenType } from "../token/token";
import { ILLEGAL, EOF, IDENT, INT, ASSIGN, PLUS, MINUS, BANG, ASTERISK, SLASH, LT, GT, EQ, NOT_EQ, COMMA, SEMICOLON, LPAREN, RPAREN, LBRACE, RBRACE, FUNCTION, LET, IF, ELSE, TRUE, FALSE, RETURN } from "../token/token";

interface TestToken {
	expectedType: TokenType;
	expectedLiteral: string;
}

describe("Lexer", () => {
	it("Test let, ident, assign, lparen, comma, rparen, semicolon", () => {
		const input = `let five = 5;
let ten = 10;
let add = fn(x, y) {
	x + y;
};
let result = add(five, ten);`;
		const tests: TestToken[] = [
			{ expectedType: LET, expectedLiteral: "let" },
			{ expectedType: IDENT, expectedLiteral: "five" },
			{ expectedType: ASSIGN, expectedLiteral: "=" },
			{ expectedType: INT, expectedLiteral: "5" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: LET, expectedLiteral: "let" },
			{ expectedType: IDENT, expectedLiteral: "ten" },
			{ expectedType: ASSIGN, expectedLiteral: "=" },
			{ expectedType: INT, expectedLiteral: "10" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: LET, expectedLiteral: "let" },
			{ expectedType: IDENT, expectedLiteral: "add" },
			{ expectedType: ASSIGN, expectedLiteral: "=" },
			{ expectedType: FUNCTION, expectedLiteral: "fn" },
			{ expectedType: LPAREN, expectedLiteral: "(" },
			{ expectedType: IDENT, expectedLiteral: "x" },
			{ expectedType: COMMA, expectedLiteral: "," },
			{ expectedType: IDENT, expectedLiteral: "y" },
			{ expectedType: RPAREN, expectedLiteral: ")" },
			{ expectedType: LBRACE, expectedLiteral: "{" },
			{ expectedType: IDENT, expectedLiteral: "x" },
			{ expectedType: PLUS, expectedLiteral: "+" },
			{ expectedType: IDENT, expectedLiteral: "y" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: RBRACE, expectedLiteral: "}" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: LET, expectedLiteral: "let" },
			{ expectedType: IDENT, expectedLiteral: "result" },
			{ expectedType: ASSIGN, expectedLiteral: "=" },
			{ expectedType: IDENT, expectedLiteral: "add" },
			{ expectedType: LPAREN, expectedLiteral: "(" },
			{ expectedType: IDENT, expectedLiteral: "five" },
			{ expectedType: COMMA, expectedLiteral: "," },
			{ expectedType: IDENT, expectedLiteral: "ten" },
			{ expectedType: RPAREN, expectedLiteral: ")" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: EOF, expectedLiteral: "" },
		];
		const lexer = new Lexer(input);
		testTokens(lexer, tests);
	});
	it("Test bang, minus, slash, asterisk, lt, gt", () => {
		const input = `!-/*5;
5 < 10 > 5;`;
		const tests: TestToken[] = [
			{ expectedType: BANG, expectedLiteral: "!" },
			{ expectedType: MINUS, expectedLiteral: "-" },
			{ expectedType: SLASH, expectedLiteral: "/" },
			{ expectedType: ASTERISK, expectedLiteral: "*" },
			{ expectedType: INT, expectedLiteral: "5" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: INT, expectedLiteral: "5" },
			{ expectedType: LT, expectedLiteral: "<" },
			{ expectedType: INT, expectedLiteral: "10" },
			{ expectedType: GT, expectedLiteral: ">" },
			{ expectedType: INT, expectedLiteral: "5" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
		];
		const lexer = new Lexer(input);
		testTokens(lexer, tests);
	});
	it("Test if, return, true, else, false", () => {
		const input = `if (5 < 10) {
	return true;
} else {
	return false;
}`;
		const tests: TestToken[] = [
			{ expectedType: IF, expectedLiteral: "if" },
			{ expectedType: LPAREN, expectedLiteral: "(" },
			{ expectedType: INT, expectedLiteral: "5" },
			{ expectedType: LT, expectedLiteral: "<" },
			{ expectedType: INT, expectedLiteral: "10" },
			{ expectedType: RPAREN, expectedLiteral: ")" },
			{ expectedType: LBRACE, expectedLiteral: "{" },
			{ expectedType: RETURN, expectedLiteral: "return" },
			{ expectedType: TRUE, expectedLiteral: "true" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: RBRACE, expectedLiteral: "}" },
			{ expectedType: ELSE, expectedLiteral: "else" },
			{ expectedType: LBRACE, expectedLiteral: "{" },
			{ expectedType: RETURN, expectedLiteral: "return" },
			{ expectedType: FALSE, expectedLiteral: "false" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: RBRACE, expectedLiteral: "}" },
		];
		const lexer = new Lexer(input);
		testTokens(lexer, tests);
	});
	it("Test eq, not_eq", () => {
		const input = `10 == 10;
10 != 9;`;
		const tests: TestToken[] = [
			{ expectedType: INT, expectedLiteral: "10" },
			{ expectedType: EQ, expectedLiteral: "==" },
			{ expectedType: INT, expectedLiteral: "10" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
			{ expectedType: INT, expectedLiteral: "10" },
			{ expectedType: NOT_EQ, expectedLiteral: "!=" },
			{ expectedType: INT, expectedLiteral: "9" },
			{ expectedType: SEMICOLON, expectedLiteral: ";" },
		];
		const lexer = new Lexer(input);
		testTokens(lexer, tests);
	});
});
function testTokens(lexer: Lexer, tests: TestToken[]) {
	tests.forEach((tt, i) => {
		const tok = lexer.nextToken();
		expect(tok.type).toBe(tt.expectedType);
		expect(tok.literal).toBe(tt.expectedLiteral);
	});
}
