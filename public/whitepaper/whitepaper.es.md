# Whitepaper — MoonRise (ES)

**Última actualización:** 2025-10-01  

---

## 1. Resumen Ejecutivo  

MoonRise es una infraestructura financiera creada para **ejecución real**, **transparencia total** y **control estratégico**.  
Con su propio token (**MRS**), billetera dedicada, fondo de liquidez y módulos de gobernanza técnica, MoonRise opera como un **ecosistema cerrado**, integrado y autosuficiente, diseñado para escalar.  

No es una promesa futura; es ejecución presente. Del contrato al producto final, todo es **rastreable y público**.  

**Contratos oficiales (BSC):**  
- **Token MRS:** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  
- **Pre-venta inicial:** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  
- **MasterVault:** `0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`  

---

## 2. Contexto de Mercado  

Gran parte del mercado cripto ha sido tomado por proyectos de hype: lanzamientos ruidosos, sin producto y comunidades abandonadas. El inversor serio busca lo que es raro:  

- Transparencia  
- Estructura real  
- Ejecución comprobada  
- Liquidez verdadera  

MoonRise surge como respuesta: ingeniería desde el primer día, entrega de producto y marca de precisión, constancia y ambición global.  

---

## 3. Ecosistema MoonRise  

MoonRise opera mediante un conjunto de componentes desarrollados **100% in-house**:  

- **Token MRS** — moneda del ecosistema, con **tasa dinámica de venta (3,5%–7,0%)**, **tasa de compra del 0,5%**, **delays/cooldowns anti-dump** y **bloqueo del fundador (12 meses)**.  
- **Moon+ (RWA)** — **infraestructura técnica** para operaciones con activos del mundo real en colaboración con **SPEs y empresas independientes**:  
  - estándares, contratos y reglas públicas/auditables on-chain;  
  - **monitoreo on-chain** e informes técnicos;  
  - **no intermediamos valores mobiliarios. No somos bróker.** La ejecución la realizan SPEs y socios independientes, bajo reglas públicas.  
- **MoonWallet** — billetera propia multi-chain con datos en tiempo real e integración con dApps del ecosistema.  

**Principio:** inversión en el mundo real, valor capturado en el ecosistema.  

---

## 4. Tokenomics y Distribución Estratégica  

**Token:** MoonRise (**MRS**) — estándar **BEP-20**  
**Supply total (emitido):** **9.700.000.000 MRS**  
**Quema inicial (en el deploy):** **1.700.000.000 MRS**  
**Supply post-quema (activo on-chain):** **8.000.000.000 MRS**  
**Contrato oficial (MRS):** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  

**Distribución (sobre el supply post-quema: 8,0B):**  
- **Liquidez/DEX:** **6.000.000.000** (**75,00%**) — `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Marketing:** **750.000.000** (**9,375%**) — `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Desarrollo:** **630.000.000** (**7,875%**) — `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Ecosistema:** **350.000.000** (**4,375%**) — `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Reserva Estratégica:** **250.000.000** (**3,125%**) — `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  
- **Fundador (bloqueado 12 meses):** **20.000.000** (**0,25%**) — `0x2d0D394CdD4AD1D185C28064C809C14fBd82f27b`  

> **Origen de los tokens de la pre-venta:** salida on-chain de la **cartera de Liquidez** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F` hacia el **contrato de pre-venta** `0xdA89B77ef1770051685039911B64D2C6C2E85891`.  

> **Sin mint adicional.** Los tokens **no vendidos** pueden ser **quemados** en `0x000000000000000000000000000000000000dEaD`.  

**Comisiones & Protecciones (resumen técnico):**  

- **Compra:** **0,50%** (50 bps) → **Ecosistema**  
- **Venta (dinámica):** **3,5% o 7,0%** — recalculada cada **15 min** (si **ventas > compras** en la ventana, aplica **7,0%**) → **Ecosistema**  
- **Delay post-compra:** **5 min** para vender (también aplica a **P2P anclado** cuando esté habilitado)  
- **Admin/Seguridad:** contrato pausable; renuncia del owner solo tras **congelar** AMM/exenciones y definir router; los pares AMM solo pueden ser **marcados** (no desmarcados).  

---

## 5. Uso de los Fondos Recaudados  

**Split automático (on-chain) de la pre-venta en BNB/USDT:**  
- **62%** — **Ecosistema** (`0x7c6e0128b390cD108d0D3B1976830943Ab7CDD6E`)  
- **23%** — **Liquidez** (`0xf3843Ec0571192EB109D12aba50F54d59a961E30`)  
- **15%** — **Desarrollo/Operación inicial** (`0x9d492BfD7690402acE4707A07dFF1639D4cE4127`)  

Aplicación práctica:  

- **Expansión de Desarrollo** — nuevos productos, seguridad y módulos estratégicos.  
- **Operaciones del Ecosistema** — infraestructura, soporte y monitoreo on-chain.  
- **Liquidez** — inyecciones programadas para mantener una profundidad de mercado saludable.  
- **Marketing Institucional** — fortalecimiento de la marca global.  

Todas las transacciones son **rastreables** y ejecutadas vía **contratos inteligentes**.  

---

## 6. Supply Bloqueado, Reservas y MasterVault  

Para disciplina y protección, MoonRise utiliza el contrato **MasterVault** (`0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`), que:  
- controla desbloqueos de tokens mediante un **cronograma inmutable**;  
- impide el acceso manual a fondos;  
- permite auditoría pública de **tramos** y saldos.  

**Carteras bajo MasterVault (oficiales):**  
- **Liquidez:** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Desarrollo:** `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Marketing:** `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Ecosistema:** `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Reserva Estratégica:** `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  

**Reservas Estratégicas del MasterVault:**  
El último tramo de **Liquidez** y **Ecosistema** se mantiene exclusivamente para **emergencias y agilidad operativa**, como: listado anticipado en caso de agotamiento de la pre-venta, soporte inmediato a socios o ajustes técnicos que no pueden esperar el cronograma — siempre **público y auditable**.  

**Nota:** ningún desbloqueo institucional en **2025**; liberaciones programadas a partir de **2026**.  

**Cláusula de contingencia (on-chain):** si **`presaleSoldOut = true`** y **antes de 01/01/2027**, es posible **liberar anticipadamente** solo el **último tramo** de **Liquidez (350M)** y **Ecosistema (50M)** a una dirección designada — uso **excepcional** y **auditable**.  

---

## 7. Pre-venta Inicial  

**Contrato:** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  

**Monedas aceptadas:** **USDT** y **BNB** (conversión con **Chainlink BNB/USD** — `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`).  

**Entrega:** tokens **enviados al momento de la compra** (sin vesting del comprador en este contrato).  

**Políticas operativas:** límites mínimos/máximos por transacción/cartera y posibles listas de acceso pueden ser **ajustados on-chain** y divulgados en los canales oficiales.  

**Finalización & transparencia:** al finalizar, los tokens **no vendidos** pueden ser **quemados** en `DEAD`. Todas las asignaciones y splits son **verificables on-chain**.  

**Origen de los tokens (prueba on-chain):**  
- **Fuente:** cartera de **Liquidez/DEX** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`.  
- **Destino:** contrato de **pre-venta** `0xdA89B77ef1770051685039911B64D2C6C2E85891`.  
- **Monto máximo asignado:** **2.500.000.000 MRS** (subconjunto de los **6,0B** reservados a Liquidez).  
- **Regla final:** los tokens **no vendidos** pueden ser **quemados** (reduciendo el supply circulante).  

*(Sin divulgación de precios o fases en este documento. Los ítems comerciales — cuando existan — estarán en la interfaz de la pre-venta y canales oficiales.)*  

---

## 8. Gobernanza y Transparencia  

La gobernanza es **temporal y rastreable**, operando 100% vía contratos.  

Las decisiones estructurales son documentadas en tiempo real.  
El fundador **no** posee acceso directo a fondos, liquidez o contratos — la **wallet del fundador** está bloqueada por **12 meses**.  
La soberanía está en la **estructura**, no en la persona.  

---

## 9. Conclusión  

MoonRise no nació para especular. Fue creada para **gobernar, ejecutar y construir** un imperio financiero — resistente a la censura y manipulación.  

> “La ejecución precede a la valorización. Aquellos que construyen, heredan.”  

**MoonRise Technologies LLC (WY, EE.UU.)**  

---

## Aviso de Riesgo  

Los criptoactivos son volátiles y pueden resultar en pérdida total del capital invertido.  
Nada en este documento constituye recomendación de inversión, asesoramiento jurídico, contable o fiscal.  
Las traducciones se proporcionan por conveniencia; en caso de divergencia, prevalece la versión en inglés.  
