import {
  Token,
  ASSIGN,
  newToken,
  SEMICOLON,
  LPAREN,
  RPAREN,
  PLUS,
  COMMA,
  LBRACE,
  RBRACE,
  EOF,
} from "./token";
class Lexer {
  input: string;
  position: number; // current position in input (points to current char)
  readPosition: number; // current reading position in input (after current char)
  char: string | null; // current char under examintation

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.readPosition = 1;
    this.char = input[0];
  }

  readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.char = null;
    } else {
      this.char = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  nextToken(): Token {
    let tok: Token;

    switch (this.char) {
      case "=":
        tok = newToken(ASSIGN, this.char);
        break;
      case ";":
        tok = newToken(SEMICOLON, this.char);
        break;
      case "(":
        tok = newToken(LPAREN, this.char);
        break;
      case ")":
        tok = newToken(RPAREN, this.char);
        break;
      case ",":
        tok = newToken(COMMA, this.char);
        break;
      case "+":
        tok = newToken(PLUS, this.char);
        break;
      case "{":
        tok = newToken(LBRACE, this.char);
        break;
      case "}":
        tok = newToken(RBRACE, this.char);
        break;
      case null:
      default:
        tok = { Literal: "", Type: EOF };
    }
    this.readChar();
    return tok;
  }
}

export function createLexer(input: string): Lexer {
  const l = new Lexer(input);
  return l;
}
