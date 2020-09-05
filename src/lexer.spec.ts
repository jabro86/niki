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
