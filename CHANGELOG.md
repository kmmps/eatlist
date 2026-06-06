# Eatlist — Changelog

Registro de todas as melhorias implementadas, organizadas por sessão de trabalho.

**Convenção de status no implementation plan:**
- `[ ]` — pendente
- `[~]` — em progresso
- `[x]` — concluído

**Regra para novos audits:** antes de rodar qualquer audit, leia este changelog e o implementation plan. Não re-audite nem re-sinalize issues já marcadas como `[x]`.

---

## Como registrar uma sessão

Copie o bloco abaixo e preencha ao final de cada batch de trabalho:

```
## [v0.X] — YYYY-MM-DD

**Tasks concluídas:** 1.1, 1.2, ...
**Resumo:** Uma frase descrevendo o foco do batch.

### Detalhes
- **1.X — Nome da task:** O que foi feito exatamente. Qualquer desvio do plano original.
- **1.X — Nome da task:** ...

### Decisões tomadas
- Qualquer decisão de produto ou implementação que divergiu do plano original.

### O que ficou de fora
- Tasks que eram parte do batch mas não foram implementadas, e por quê.
```

---

## Histórico

## [v0.1] — 2026-06-05

**Tasks concluídas:** 1.2, 1.1, 1.5, 1.4, 1.3  
**Resumo:** Fixes visuais na tela de login e títulos.

### Detalhes
- **1.2 — Raise login tagline opacity:** Opacidade do tagline "playlists de restaurantes" alterada de ~45% para 72% (rgba(255,255,255,0.72)). Commit: SCRUM-5.
- **1.1 — Bold display-sized titles:** fontWeight alterado de 400 para 600 nos títulos de fontSize 28/30 (RestaurantScreen e ListOpenScreen). Commit: SCRUM-6.
- **1.5 — Redirect after list creation:** Após criar lista, navegação redirecionada para a tela da nova lista em vez do Home. Commit: SCRUM-10.
- **1.4 — Fix map search bar:** Search bar do mapa substituída por input real com filtro de markers por nome em tempo real. Commit: SCRUM-9.
- **1.3 — Form validation on Register:** Validação adicionada ao formulário de cadastro — campos obrigatórios, regex de e-mail, mínimo 8 caracteres na senha. Commit: SCRUM-8.

---

---

## Sprint 1 — Core Save Flow (planejada)

**Goal:** Corrigir o fluxo de salvar restaurante e eliminar botões quebrados — app pronto para o primeiro teste com usuário real.  
**Issues Jira:** SCRUM-5, 6, 13, 15, 18, 7, 10, 8, 9, 11, 12  
**Status:** 🔲 Não iniciada

### Onda 1 — Mudanças de uma linha
- ✅ SCRUM-5 · [1.2] Raise login tagline opacity
- ✅ SCRUM-6 · [1.1] Bold display-sized titles
- 🔲 SCRUM-13 · [1.9] Rename "Explorar" section

### Onda 2 — Dead buttons
- 🔲 SCRUM-15 · [1.11] Wire "Ver no Maps"
- 🔲 SCRUM-18 · [1.14] Wire Share button

### Onda 3 — Fluxos quebrados
- ❌ SCRUM-7 · [1.7] Label the "+" save button — descartada
- ✅ SCRUM-10 · [1.5] Redirect after list creation
- ✅ SCRUM-8 · [1.3] Form validation on Register

### Onda 4 — Maior complexidade (stretch goal)
- ✅ SCRUM-9 · [1.4] Fix map search bar
- 🔲 SCRUM-11 · [1.6] Long-press → regular tap
- 🔲 SCRUM-12 · [1.8] Home "+" → action sheet

---

## Estado atual do backlog

**Última atualização:** 2026-06-05  
**Fase atual:** Sprint 1 em andamento  
**Próximo passo:** SCRUM-13 · [1.9] Rename "Explorar" section

| Fase | Total | Concluídas | Restantes |
| --- | --- | --- | --- |
| Phase 1 — UX & Content | 15 | 5 | 10 |
| Phase 2 — Visual Polish | 10 | 0 | 10 |
| Phase 3 — Product Flows | 6 | 0 | 6 |
| Phase 4 — Structural | 5 | 0 | 5 |
| **Total** | **36** | **5** | **31** |
