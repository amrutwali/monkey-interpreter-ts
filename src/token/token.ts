// token/token.ts

export type TokenType = string

export type Token = {
	type: TokenType
	literal: string
}

export const ILLEGAL: TokenType = "ILLEGAL"
export const EOF: TokenType = "EOF"

// Identifiers + Literals
export const IDENT: TokenType = "IDENT" // add, foo, x, y ...
export const INT: TokenType = "INT"   // 1234

// Operators
export const ASSIGN: TokenType = "="
export const PLUS: TokenType = "+"
export const MINUS: TokenType = "-"
export const BANG: TokenType = "!"
export const ASTERISK: TokenType = "*"
export const SLASH: TokenType = "/"

export const LT: TokenType = "<"
export const GT: TokenType = ">"

export const EQ: TokenType = "=="
export const NOT_EQ: TokenType = "!="

// Delimiters
export const COMMA: TokenType = ","
export const SEMICOLON: TokenType = ";"

export const LPAREN: TokenType = "("
export const RPAREN: TokenType = ")"
export const LBRACE: TokenType = "{"
export const RBRACE: TokenType = "}"

// Keywords
export const FUNCTION: TokenType = "FUNCTION"
export const LET: TokenType = "LET"
export const IF: TokenType = "IF"
export const ELSE: TokenType = "ELSE"
export const TRUE: TokenType = "TRUE"
export const FALSE: TokenType = "FALSE"
export const RETURN: TokenType = "RETURN"

const keywords: Record<string, TokenType> = {
	"fn": FUNCTION,
	"let": LET,
	"if": IF,
	"else": ELSE,
	"true": TRUE,
	"false": FALSE,
	"return": RETURN,
}

export function lookupIdent(ident: string): TokenType {
	if (keywords.hasOwnProperty(ident)) {
		return keywords[ident]
	}
	return IDENT
}
