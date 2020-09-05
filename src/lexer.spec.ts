import {
  ASSIGN,
  PLUS,
  LPAREN,
  RPAREN,
  COMMA,
  LBRACE,
  RBRACE,
  SEMICOLON,
  EOF,
  LET,
  IDENT,
  INT,
  FUNCTION,
} from "./token";
import { createLexer } from "./lexer";

describe("lexer", () => {
  const input = "=+(){},;";
  const lexer = createLexer(input);

  it.each`
    type         | literal
    ${ASSIGN}    | ${"="}
    ${PLUS}      | ${"+"}
    ${LPAREN}    | ${"("}
    ${RPAREN}    | ${")"}
    ${LBRACE}    | ${"{"}
    ${RBRACE}    | ${"}"}
    ${COMMA}     | ${","}
    ${SEMICOLON} | ${";"}
    ${EOF}       | ${""}
  `("returns $literal for nextToken", ({ type, literal }) => {
    const tok = lexer.nextToken();
    expect(tok.Type).toBe(type);
    expect(tok.Literal).toBe(literal);
  });
});

describe("some source code", () => {
  const input = `let five = 5;
  let ten = 10;
  
  let add = fn(x, y) {
    x + y;
  };
  
  let result = add(five, ten);
  `;
  const lexer = createLexer(input);

  it.each`
    type         | literal
    ${LET}       | ${"let"}
    ${IDENT}     | ${"five"}
    ${ASSIGN}    | ${"="}
    ${INT}       | ${"5"}
    ${SEMICOLON} | ${";"}
    ${LET}       | ${"let"}
    ${IDENT}     | ${"ten"}
    ${ASSIGN}    | ${"="}
    ${INT}       | ${"10"}
    ${SEMICOLON} | ${";"}
    ${LET}       | ${"let"}
    ${IDENT}     | ${"add"}
    ${ASSIGN}    | ${"="}
    ${FUNCTION}  | ${"fn"}
    ${LPAREN}    | ${"("}
    ${IDENT}     | ${"x"}
    ${COMMA}     | ${","}
    ${IDENT}     | ${"y"}
    ${RPAREN}    | ${")"}
    ${LBRACE}    | ${"{"}
    ${IDENT}     | ${"x"}
    ${PLUS}      | ${"+"}
    ${IDENT}     | ${"y"}
    ${SEMICOLON} | ${";"}
    ${RBRACE}    | ${"}"}
    ${SEMICOLON} | ${";"}
    ${LET}       | ${"let"}
    ${IDENT}     | ${"result"}
    ${ASSIGN}    | ${"="}
    ${IDENT}     | ${"add"}
    ${LPAREN}    | ${"("}
    ${IDENT}     | ${"five"}
    ${COMMA}     | ${","}
    ${IDENT}     | ${"ten"}
    ${RPAREN}    | ${")"}
    ${SEMICOLON} | ${";"}
    ${EOF}       | ${""}
  `("returns $literal for nextToken", ({ type, literal }) => {
    const tok = lexer.nextToken();
    expect(tok.Type).toBe(type);
    expect(tok.Literal).toBe(literal);
  });
});
