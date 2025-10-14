# Whitepaper — MoonRise (PT-BR)

**Última atualização:** 2025-10-01

---

## 1. Visão Executiva  

A MoonRise é uma infraestrutura financeira criada para **execução real**, **transparência integral** e **controle estratégico**.  
Com token próprio (**MRS**), carteira dedicada, fundo de liquidez e módulos de governança técnica, a MoonRise opera como um **ecossistema fechado**, integrado e autossuficiente, projetado para escalar.  

Não é promessa futura; é execução presente. Do contrato ao produto final, tudo é **rastreável e público**.  

**Contratos oficiais (BSC):**  
- **Token MRS:** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  
- **Captação inicial (pré-venda):** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  
- **MasterVault:** `0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`  

---

## 2. Contexto de Mercado  

Grande parte do mercado cripto foi tomada por projetos de hype: lançamentos barulhentos, zero produto e comunidades abandonadas. O investidor sério busca o que é raro:  

- Transparência  
- Estrutura real  
- Execução comprovada  
- Liquidez verdadeira  

A MoonRise surge como resposta: engenharia desde o primeiro dia, entrega de produto e marca de precisão, constância e ambição global.  

---

## 3. Ecossistema MoonRise  

A MoonRise opera por um conjunto de componentes desenvolvidos **100% in-house**:  

- **Token MRS** — moeda do ecossistema, com **taxa dinâmica de venda (3,5%–7,0%)**, **taxa de compra de 0,5%**, **delays/cooldowns anti-dump** e **lock de founder (12 meses)**.  
- **Moon+ (RWA)** — **infraestrutura técnica** para operações com ativos do mundo real em parceria com **SPEs e empresas independentes**:  
  - padrões, contratos e regras públicas/auditáveis on-chain;  
  - **monitoramento on-chain** e relatórios técnicos;  
  - **não intermediamos valores mobiliários. Não somos corretora.** A execução é feita por SPEs e parceiros independentes, sob regras públicas.  
- **MoonWallet** — carteira própria multi-chain com dados em tempo real e integração com dApps do ecossistema.  

**Princípio:** investimento no mundo real, valor capturado no ecossistema.  

---

## 4. Tokenomics e Distribuição Estratégica  

**Token:** MoonRise (**MRS**) — padrão **BEP-20**  
**Supply total (emitido):** **9.700.000.000 MRS**  
**Queima inicial (no deploy):** **1.700.000.000 MRS**  
**Supply pós-queima (ativo on-chain):** **8.000.000.000 MRS**  
**Contrato oficial (MRS):** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  

**Distribuição (sobre o supply pós-queima: 8,0B):**  
- **Liquidez/DEX:** **6.000.000.000** (**75,00%**) — `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Marketing:** **750.000.000** (**9,375%**) — `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Desenvolvimento:** **630.000.000** (**7,875%**) — `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Ecossistema:** **350.000.000** (**4,375%**) — `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Reserva Estratégica:** **250.000.000** (**3,125%**) — `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  
- **Founder (travado 12 meses):** **20.000.000** (**0,25%**) — `0x2d0D394CdD4AD1D185C28064C809C14fBd82f27b`  

> **Origem dos tokens da captação:** saída on-chain da **carteira de Liquidez** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F` para o **contrato de captação** `0xdA89B77ef1770051685039911B64D2C6C2E85891`.  

> **Sem mint adicional.** Tokens **não vendidos** podem ser **queimados** para `0x000000000000000000000000000000000000dEaD`.  

**Taxas & Proteções (resumo técnico):**  

- **Compra:** **0,50%** (50 bps) → **Ecossistema**  
- **Venda (dinâmica):** **3,5% ou 7,0%** — recalculada a cada **15 min** (se **vendas > compras** na janela, aplica **7,0%**) → **Ecossistema**  
- **Delay pós-compra:** **5 min** para vender (aplica também a **P2P ancorado** quando habilitado)  
- **Admin/Segurança:** contrato pausável; renúncia do owner só após **congelar** AMM/isenções e **definir** router; pares AMM são apenas **marcáveis** (não podem ser desmarcados).  

---

## 5. Uso dos Fundos Captados  

**Split automático (on-chain) da captação em BNB/USDT:**  
- **62%** — **Ecossistema** (`0x7c6e0128b390cD108d0D3B1976830943Ab7CDD6E`)  
- **23%** — **Liquidez** (`0xf3843Ec0571192EB109D12aba50F54d59a961E30`)  
- **15%** — **Desenvolvimento/Operação inicial** (`0x9d492BfD7690402acE4707A07dFF1639D4cE4127`)  

Aplicação prática:  

- **Expansão de Desenvolvimento** — novos produtos, segurança e módulos estratégicos.  
- **Operações do Ecossistema** — infraestrutura, suporte e monitoramento on-chain.  
- **Liquidez** — injeções programadas para manter profundidade saudável de mercado.  
- **Marketing Institucional** — fortalecimento de marca global.  

Todas as movimentações são **rastreáveis** e executadas via **contratos inteligentes**.  

---

## 6. Supply Travado, Reservas e MasterVault  

Para disciplina e proteção, a MoonRise utiliza o contrato **MasterVault** (`0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`), que:  
- controla desbloqueios de tokens por **cronograma imutável**;  
- impede acesso manual a fundos;  
- permite auditoria pública de **parcelas** e saldos.  

**Carteiras sob MasterVault (oficiais):**  
- **Liquidez:** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Desenvolvimento:** `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Marketing:** `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Ecossistema:** `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Reserva Estratégica:** `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  

**Reservas Estratégicas do MasterVault:**  
A última parcela de **Liquidez** e de **Ecossistema** é mantida exclusivamente para **emergências e agilidade operacional**, como: listagem antecipada em caso de esgotamento da captação, suporte imediato a parcerias ou ajustes técnicos que não podem esperar o cronograma — sempre **público e auditável**.  

**Observação:** nenhum desbloqueio institucional em **2025**; liberações programadas a partir de **2026**.  

**Cláusula de contingência (on-chain):** se **`presaleSoldOut = true`** e **antes de 01/01/2027**, é possível **liberar antecipadamente** apenas a **última parcela** de **Liquidez (350M)** e de **Ecossistema (50M)** para um endereço indicado — uso **excepcional** e **auditável**.  


---

## 7. Pré-venda Inicial  

**Contrato:** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  

**Moedas aceitas:** **USDT** e **BNB** (conversão com **Chainlink BNB/USD** — `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`).  

**Entrega:** tokens **enviados no ato da compra** (sem vesting do comprador neste contrato).  

**Políticas operacionais:** limites mínimos/máximos por transação/carteira e eventuais listas de acesso podem ser **ajustados on-chain** e **divulgados** nos canais oficiais.  

**Finalização & transparência:** após o término, tokens **não vendidos** podem ser **queimados** para `DEAD`. Todas as alocações e splits são **verificáveis on-chain**.  

**Origem dos tokens (prova on-chain):**  
- **Fonte:** carteira de **Liquidez/DEX** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`.  
- **Destino:** contrato de **pré-venda** `0xdA89B77ef1770051685039911B64D2C6C2E85891`.  
- **Montante máximo alocado:** **2.500.000.000 MRS** (subconjunto dos **6,0B** reservados a Liquidez).  
- **Regra de fim:** tokens **não vendidos** podem ser **queimados** (reduzem o supply circulante).  

*(Sem divulgação de preços ou fases neste documento. Itens comerciais — quando existirem — ficam na interface da captação e canais oficiais.)*  

---

## 8. Governança e Transparência  

A governança é **temporária e rastreável**, operando 100% por contratos.  

Decisões estruturais são documentadas em tempo real.  
O fundador **não** possui acesso direto a fundos, liquidez ou contratos — **founder wallet** está travada por **12 meses**.  
A soberania está na **estrutura**, não na figura.  

---

## 9. Conclusão  

A MoonRise não nasceu para especular. Foi criada para **governar, executar e construir** um império financeiro — resistente a censura e manipulação.  

> “A execução precede a valorização. Aqueles que constroem, herdam.”  

**MoonRise Technologies LLC (WY, EUA)**  

---

## Aviso de Risco  

Criptoativos são voláteis e podem resultar em perda total do capital investido.  
Nada neste documento constitui recomendação de investimento, aconselhamento jurídico, contábil ou fiscal.  
Traduções são fornecidas por conveniência; em caso de divergência, prevalece a versão em inglês.  
