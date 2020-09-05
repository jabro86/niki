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
  ILLEGAL,
  isLetter,
  LookupIdent,
  isDigit,
  INT,
} from "./token";
class Lexer {
  input: string;
  position: number; // current position in input (points to current char)
  readPosition: number; // current reading position in input (after current char)
  char: string; // current char under examintation

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.readPosition = 1;
    this.char = input[0];
  }

  readChar(): void {
    if (this.readPosition >= this.input.length) {
      this.char = "";
    } else {
      this.char = this.input[this.readPosition];
    }
    this.position = this.readPosition;
    this.readPosition += 1;
  }

  readIdentifier(): string {
    const start = this.position;
    while (isLetter(this.char)) {
      this.readChar();
    }
    return this.input.slice(start, this.position);
  }

  readNumber(): string {
    const start = this.position;
    while (isDigit(this.char)) {
      this.readChar();
    }
    return this.input.slice(start, this.position);
  }

  skipWhitespace(): void {
    while (
      this.char === " " ||
      this.char === "\t" ||
      this.char === "\n" ||
      this.char === "\r"
    ) {
      this.readChar();
    }
  }

  nextToken(): Token {
    let tok: Token;

    this.skipWhitespace();

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
      case "":
        tok = { Literal: "", Type: EOF };
        break;
      default:
        if (isLetter(this.char)) {
          const Literal = this.readIdentifier();
          return {
            Literal,
            Type: LookupIdent(Literal),
          };
        } else if (isDigit(this.char)) {
          const Literal = this.readNumber();
          return {
            Literal,
            Type: INT,
          };
        } else {
          tok = newToken(ILLEGAL, this.char);
        }
    }
    this.readChar();
    return tok;
  }
}

export function createLexer(input: string): Lexer {
  const l = new Lexer(input);
  return l;
}
