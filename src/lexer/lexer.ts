// lexer/lexer.ts

import { Token, TokenType, lookupIdent } from "../token/token";
import { ILLEGAL, EOF, IDENT, INT, ASSIGN, PLUS, MINUS, BANG, ASTERISK, SLASH, LT, GT, EQ, NOT_EQ, COMMA, SEMICOLON, LPAREN, RPAREN, LBRACE, RBRACE, FUNCTION, LET, IF, ELSE, TRUE, FALSE, RETURN } from "../token/token";

export class Lexer {
	private input: string;
	private position: number = 0; // current position in input (points to the current character)
	private readPosition: number = 0; // current reading position in input (after current character)
	private ch: string = ''; // current char under examination

	constructor(input: string) {
		this.input = input;
		this.readChar();
	}

	private newToken(tokenType: TokenType, ch: string): Token {
		return { type: tokenType, literal: ch };
	}

	private readChar(): void {
		if (this.readPosition >= this.input.length) {
			this.ch = '\0';
		} else {
			this.ch = this.input[this.readPosition];
		}
		this.position = this.readPosition;
		this.readPosition += 1;
	}

	public nextToken(): Token {
		let tok: Token;

		this.skipWhitespace();

		switch (this.ch) {
			case '=':
				if (this.peekChar() === '=') {
					const ch = this.ch;
					this.readChar();
					tok = { type: EQ, literal: ch + this.ch };
				} else {
					tok = this.newToken(ASSIGN, this.ch);
				}
				break;
			case '+':
				tok = this.newToken(PLUS, this.ch);
				break;
			case '!':
				if (this.peekChar() === '=') {
					const ch = this.ch;
					this.readChar();
					tok = { type: NOT_EQ, literal: ch + this.ch };
				} else {
					tok = this.newToken(BANG, this.ch);
				}
				break;
			case '/':
				tok = this.newToken(SLASH, this.ch);
				break;
			case '*':
				tok = this.newToken(ASTERISK, this.ch);
				break;
			case '-':
				tok = this.newToken(MINUS, this.ch);
				break;
			case '<':
				tok = this.newToken(LT, this.ch);
				break;
			case '>':
				tok = this.newToken(GT, this.ch);
				break;
			case '(':
				tok = this.newToken(LPAREN, this.ch);
				break;
			case ')':
				tok = this.newToken(RPAREN, this.ch);
				break;
			case '{':
				tok = this.newToken(LBRACE, this.ch);
				break;
			case '}':
				tok = this.newToken(RBRACE, this.ch);
				break;
			case ',':
				tok = this.newToken(COMMA, this.ch);
				break;
			case ';':
				tok = this.newToken(SEMICOLON, this.ch);
				break;
			case '\0':
				tok = { literal: "", type: EOF };
				break;
			default:
				if (this.isLetter(this.ch)) {
					const literal = this.readIdentifier();
					return { type: lookupIdent(literal), literal };
				} else if (this.isDigit(this.ch)) {
					return { type: INT, literal: this.readNumber() };
				} else {
					tok = this.newToken(ILLEGAL, this.ch);
				}
		}
		this.readChar();
		return tok;
	}

	private readIdentifier(): string {
		const position = this.position;
		while (this.isLetter(this.ch)) {
			this.readChar();
		}
		return this.input.slice(position, this.position);
	}

	private isLetter(ch: string): boolean {
		return /[a-zA-Z_]/.test(ch);
	}

	private skipWhitespace(): void {
		while (/\s/.test(this.ch)) {
			this.readChar();
		}
	}

	private readNumber(): string {
		const position = this.position;
		while (this.isDigit(this.ch)) {
			this.readChar();
		}
		return this.input.slice(position, this.position);
	}

	private isDigit(ch: string): boolean {
		return /\d/.test(ch);
	}

	private peekChar(): string {
		if (this.readPosition >= this.input.length) {
			return '\0';
		} else {
			return this.input[this.readPosition];
		}
	}
}
