export type TokenType = string;

export interface Token {
  Type: TokenType;
  Literal: string;
}

export const ILLEGAL = "ILLEGAL";
export const EOF = "EOF";

// Identifiers + literals
export const IDENT = "IDENT"; // add, foobar, x, y, ...
export const INT = "INT"; // 1343456

// Operators
export const ASSIGN = "=";
export const PLUS = "+";

// Delimiters
export const COMMA = ",";
export const SEMICOLON = ";";

export const LPAREN = "(";
export const RPAREN = ")";
export const LBRACE = "{";
export const RBRACE = "}";

// Keywords
export const FUNCTION = "FUNCTION";
export const LET = "LET";

export function newToken(tokenType: TokenType, char: string): Token {
  return { Type: tokenType, Literal: char };
}

export function isLetter(char: string): boolean {
  return (
    ("a" <= char && char <= "z") || ("A" <= char && char <= "Z") || char == "_"
  );
}

export function isDigit(char: string): boolean {
  return "0" <= char && char <= "9";
}

const keywords: { [key: string]: TokenType | undefined } = {
  fn: FUNCTION,
  let: LET,
};

export function LookupIdent(ident: string): TokenType {
  const tok = keywords[ident];
  if (tok !== undefined) {
    return tok;
  }
  return IDENT;
}
