# Whitepaper — MoonRise (PT-BR)

**Última atualização:** 2025-10-27  

---

## 1. Visão Executiva  

A MoonRise é uma **infraestrutura financeira descentralizada**, criada para **execução real**, **transparência integral** e **controle estratégico**.  
Com token próprio (**MRS**), carteira dedicada, fundo de liquidez e módulos de governança técnica, a MoonRise opera como um **ecossistema fechado**, integrado e autossuficiente, projetado para escalar.  

Não é promessa futura; é execução presente.  
Do contrato ao produto final, tudo é **rastreável e público**.  

**Contratos oficiais (BSC):**  
- **Token MRS:** `0x8169A998A15142C94d3F03E5C51c216870FBE157`  
- **Captação inicial (pré-venda):** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`  
- **MasterVault:** `0x732Dde35D139F764FCd642Ad7CDc633C2ED60DE6`  

---

## 2. Contexto de Mercado  

Grande parte do mercado cripto foi tomada por projetos de hype: lançamentos barulhentos, zero produto e comunidades abandonadas.  
O investidor sério busca o que é raro:  

- Transparência  
- Estrutura real  
- Execução comprovada  
- Liquidez verdadeira  

A MoonRise surge como resposta: engenharia desde o primeiro dia, entrega de produto e marca de precisão, constância e ambição global.  

---

## 3. Ecossistema MoonRise  

A MoonRise opera por um conjunto de componentes desenvolvidos **100% in-house**:  

- **Token MRS** — moeda do ecossistema, com **taxa dinâmica de venda (3,5%–7,0%)**, **taxa de compra de 0,5%**, **delays/cooldowns anti-dump** e **lock de founder (12 meses)**.  
- **Moon+ (RWA)** — **infraestrutura técnica** para operações com ativos do mundo real em parceria com **SPEs e entidades independentes**:  
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
**Contrato oficial (MRS):** `0x8169A998A15142C94d3F03E5C51c216870FBE157`  

**Distribuição (sobre o supply pós-queima: 8,0B):**  
- **Liquidez/DEX:** **6.000.000.000** (**75,00%**) — `0xB25E9FD517b662CD5740dBB34F569f596E5f9992`  
- **Marketing:** **700.000.000** (**7,21%**) — `0x0286f6AdE4635a736fe62F1355768122f4B282Ed`  
- **Desenvolvimento:** **600.000.000** (**6,18%**) — `0xD9Acf6D88586f363b7732cC3D566121A6c6ff1CF`  
- **Ecossistema:** **350.000.000** (**3,60%**) — `0x2C521F6BC51B31EA4a1D366bc2d692Caf8423149`  
- **Reserva Estratégica:** **250.000.000** (**2,57%**) — `0xA91592ffD959110AE5aB1c6826725Cd939E783f8`  
- **Founder (travado 12 meses):** **100.000.000** (**1,03%**) — `0x00Ac5b001854Dd5F6c10124E5c1EB2ddF9a0931A`  

> **Origem dos tokens da captação:** saída on-chain da **carteira de Liquidez** `0xB25E9FD517b662CD5740dBB34F569f596E5f9992` para o **contrato de captação** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`.  

> **Sem mint adicional.** Tokens **não vendidos** podem ser **queimados** para `0x000000000000000000000000000000000000dEaD`.  

**Taxas & Proteções (resumo técnico):**  

- **Compra:** **0,50%** → **Ecossistema**  
- **Venda (dinâmica):** **3,5% ou 7,0%** — recalculada a cada **15 min** (se **vendas > compras** na janela, aplica **7,0%**) → **Ecossistema**  
- **Delay pós-compra:** **5 min** para vender (aplica também a **P2P ancorado**)  
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

A MoonRise utiliza o contrato **MasterVault** (`0x732Dde35D139F764FCd642Ad7CDc633C2ED60DE6`) para controle, segurança e disciplina:  
- desbloqueios por **cronograma imutável**;  
- acesso manual impossibilitado;  
- auditoria pública de **parcelas e saldos**.  

**Carteiras sob MasterVault (oficiais):**  
- **Liquidez:** `0xB25E9FD517b662CD5740dBB34F569f596E5f9992`  
- **Desenvolvimento:** `0xD9Acf6D88586f363b7732cC3D566121A6c6ff1CF`  
- **Marketing:** `0x0286f6AdE4635a736fe62F1355768122f4B282Ed`  
- **Ecossistema:** `0x2C521F6BC51B31EA4a1D366bc2d692Caf8423149`  
- **Reserva Estratégica:** `0xA91592ffD959110AE5aB1c6826725Cd939E783f8`  

**Cláusula de contingência (on-chain):**  
Se **`presaleSoldOut = true`** e **antes de 05/04/2026**, é possível **liberar antecipadamente** apenas as **2 últimas parcelas** de **Liquidez (800M)** e de **Ecossistema (50M)** — uso **excepcional** e **auditável**.  

---

## 7. Pré-venda Inicial  

**Contrato:** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`  

**Moedas aceitas:** **USDT** e **BNB** (conversão com **Chainlink BNB/USD** — `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`).  

**Entrega:** tokens **enviados no ato da compra** (sem vesting do comprador neste contrato).  

**Políticas operacionais:** limites mínimos/máximos por transação/carteira e listas de acesso podem ser **ajustadas on-chain** e **divulgadas** nos canais oficiais.  

**Finalização & transparência:** após o término, tokens **não vendidos** podem ser **queimados**.  

---

## 8. Governança e Transparência  

A governança é **temporária e rastreável**, operando 100% por contratos.  
Decisões estruturais são documentadas em tempo real.  
O fundador **não possui** acesso direto a fundos, liquidez ou contratos — **founder wallet** está travada por **12 meses**.  
A soberania está na **estrutura**, não na figura.  

---

## 9. Conclusão  

A MoonRise não nasceu para especular.  
Foi criada para **governar, executar e construir** algo resistente à censura e à manipulação.  

> “A execução precede a valorização. Aqueles que constroem, herdam.”  

---

## Aviso de Risco  

Criptoativos são voláteis e podem resultar em perda total do capital investido.  
Nada neste documento constitui recomendação de investimento, aconselhamento jurídico, contábil ou fiscal.  
Traduções são fornecidas por conveniência; em caso de divergência, prevalece a versão em inglês.  
