# Eatlist — Como usar este sistema
### Leia isso antes de qualquer sessão de implementação

---

## O que está nessa pasta

| Arquivo | O que é |
|---|---|
| `01-product-foundations.md` | Princípios, cores, tipografia, tom de voz, vocabulário. A fonte da verdade sobre o que o Eatlist é. |
| `01-product-foundations.html` | Versão visual das fundações. Abre no browser. |
| `02-design-tokens.md` | Todos os CSS custom properties. O `tokens.css` completo pronto pra usar. |
| `03-ui-components.md` | Specs de cada componente: HTML, CSS, estados, critérios de aceite. |

---

## Para implementar UI — prompt de kickoff

Cole isso no início de um chat novo:

---

> Tenho um app em `eatlist/project/eatlist.html` com componentes React em `eatlist/project/js/`. Antes de qualquer coisa, leia os arquivos em `eatlist/design/` nesta ordem:
> 1. `01-product-foundations.md`
> 2. `02-design-tokens.md`
> 3. `03-ui-components.md`
>
> Depois leia o app atual em `eatlist/project/js/` para entender o que existe.
>
> Quero que você aplique o design system no app. Regras:
> - Não invente features novas
> - Não mude a estrutura de navegação ou o fluxo do app
> - Só traduza o visual: cores, tipografia, espaçamento, radius, cards, tags, botões, inputs, navegação
> - Todos os valores devem usar os tokens de `02-design-tokens.md` — nunca valores hard-coded
> - Siga os critérios de aceite de `03-ui-components.md` para cada componente
>
> Antes de editar qualquer arquivo, me apresente um plano do que vai mudar. Aguarde minha confirmação.

---

## Para mudar algo no design system

Se quiser alterar uma decisão fundacional (cor, fonte, radius, tom de voz):

1. Abra esse chat ou um novo
2. Traga os arquivos da pasta `eatlist/design/`
3. Diga o que quer mudar e por quê
4. Peça para atualizar o documento afetado junto com qualquer mudança no código

**Importante:** nunca mude o código sem atualizar o doc correspondente. O documento é a fonte da verdade — se o código divergir, o sistema perde valor.

---

## Regra geral

> Se está nos docs, é decisão. Se não está nos docs, é dívida.
