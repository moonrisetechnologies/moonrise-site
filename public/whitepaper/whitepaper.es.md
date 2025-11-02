# Whitepaper — MoonRise (ES)

**Última actualización:** 2025-10-27  

---

## 1. Visión Ejecutiva  

MoonRise es una **infraestructura financiera descentralizada**, creada para la **ejecución real**, la **transparencia total** y el **control estratégico**.  
Con su propio token (**MRS**), billetera dedicada, fondo de liquidez y módulos de gobernanza técnica, MoonRise opera como un **ecosistema cerrado**, integrado y autosuficiente, diseñado para escalar.  

No es una promesa futura; es ejecución presente.  
Desde el contrato hasta el producto final, todo es **rastreable y público**.  

**Contratos oficiales (BSC):**  
- **Token MRS:** `0x8169A998A15142C94d3F03E5C51c216870FBE157`  
- **Captación inicial (preventa):** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`  
- **MasterVault:** `0x732Dde35D139F764FCd642Ad7CDc633C2ED60DE6`  

---

## 2. Contexto de Mercado  

Gran parte del mercado cripto ha sido tomado por proyectos de hype: lanzamientos ruidosos, sin producto y comunidades abandonadas.  
El inversor serio busca lo que es raro:  

- Transparencia  
- Estructura real  
- Ejecución comprobada  
- Liquidez verdadera  

MoonRise surge como respuesta: ingeniería desde el primer día, entrega de producto y una marca basada en la precisión, constancia y ambición global.  

---

## 3. Ecosistema MoonRise  

MoonRise opera mediante un conjunto de componentes desarrollados **100% internamente**:  

- **Token MRS** — moneda del ecosistema, con **tasa dinámica de venta (3,5%–7,0%)**, **tasa de compra del 0,5%**, **delays/cooldowns anti-dump** y **bloqueo del fundador (12 meses)**.  
- **Moon+ (RWA)** — **infraestructura técnica** para operaciones con activos del mundo real en colaboración con **SPEs y entidades independientes**:  
  - estándares, contratos y reglas públicas/auditables on-chain;  
  - **monitoreo on-chain** y reportes técnicos;  
  - **no intermediamos valores mobiliarios. No somos una corredora.** La ejecución es realizada por SPEs y socios independientes bajo reglas públicas.  
- **MoonWallet** — billetera propia multi-chain con datos en tiempo real e integración con dApps del ecosistema.  

**Principio:** inversión en el mundo real, valor capturado en el ecosistema.  

---

## 4. Tokenomics y Distribución Estratégica  

**Token:** MoonRise (**MRS**) — estándar **BEP-20**  
**Suministro total (emitido):** **9.700.000.000 MRS**  
**Quema inicial (en el deploy):** **1.700.000.000 MRS**  
**Suministro post-quema (activo on-chain):** **8.000.000.000 MRS**  
**Contrato oficial (MRS):** `0x8169A998A15142C94d3F03E5C51c216870FBE157`  

**Distribución (sobre el suministro post-quema: 8,0B):**  
- **Liquidez/DEX:** **6.000.000.000** (**75,00%**) — `0xB25E9FD517b662CD5740dBB34F569f596E5f9992`  
- **Marketing:** **700.000.000** (**7,21%**) — `0x0286f6AdE4635a736fe62F1355768122f4B282Ed`  
- **Desarrollo:** **600.000.000** (**6,18%**) — `0xD9Acf6D88586f363b7732cC3D566121A6c6ff1CF`  
- **Ecosistema:** **350.000.000** (**3,60%**) — `0x2C521F6BC51B31EA4a1D366bc2d692Caf8423149`  
- **Reserva Estratégica:** **250.000.000** (**2,57%**) — `0xA91592ffD959110AE5aB1c6826725Cd939E783f8`  
- **Fundador (bloqueado 12 meses):** **100.000.000** (**1,03%**) — `0x00Ac5b001854Dd5F6c10124E5c1EB2ddF9a0931A`  

> **Origen de los tokens de la preventa:** salida on-chain de la **cartera de Liquidez** `0xB25E9FD517b662CD5740dBB34F569f596E5f9992` hacia el **contrato de captación** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`.  

> **Sin mint adicional.** Los tokens **no vendidos** pueden ser **quemados** en `0x000000000000000000000000000000000000dEaD`.  

**Tasas y Protecciones (resumen técnico):**  

- **Compra:** **0,50%** → **Ecosistema**  
- **Venta (dinámica):** **3,5% o 7,0%** — recalculada cada **15 min** (si **ventas > compras**, se aplica **7,0%**) → **Ecosistema**  
- **Delay post-compra:** **5 min** antes de vender (también aplica a **P2P anclado**)  
- **Admin/Seguridad:** contrato pausable; renuncia del owner solo tras **congelar** AMM/exenciones y **definir** router; los pares AMM solo pueden **marcarse** (no desmarcarse).  

---

## 5. Uso de los Fondos Captados  

**División automática (on-chain) de la captación en BNB/USDT:**  
- **62%** — **Ecosistema** (`0x7c6e0128b390cD108d0D3B1976830943Ab7CDD6E`)  
- **23%** — **Liquidez** (`0xf3843Ec0571192EB109D12aba50F54d59a961E30`)  
- **15%** — **Desarrollo/Operación inicial** (`0x9d492BfD7690402acE4707A07dFF1639D4cE4127`)  

Aplicación práctica:  

- **Expansión de Desarrollo** — nuevos productos, seguridad y módulos estratégicos.  
- **Operaciones del Ecosistema** — infraestructura, soporte y monitoreo on-chain.  
- **Liquidez** — inyecciones programadas para mantener una profundidad de mercado saludable.  
- **Marketing Institucional** — fortalecimiento de marca global.  

Todas las transacciones son **rastreables** y ejecutadas mediante **contratos inteligentes**.  

---

## 6. Suministro Bloqueado, Reservas y MasterVault  

MoonRise utiliza el contrato **MasterVault** (`0x732Dde35D139F764FCd642Ad7CDc633C2ED60DE6`) para control, seguridad y disciplina:  
- desbloqueos por **cronograma inmutable**;  
- acceso manual deshabilitado;  
- auditoría pública de **porciones y saldos**.  

**Carteras bajo MasterVault (oficiales):**  
- **Liquidez:** `0xB25E9FD517b662CD5740dBB34F569f596E5f9992`  
- **Desarrollo:** `0xD9Acf6D88586f363b7732cC3D566121A6c6ff1CF`  
- **Marketing:** `0x0286f6AdE4635a736fe62F1355768122f4B282Ed`  
- **Ecosistema:** `0x2C521F6BC51B31EA4a1D366bc2d692Caf8423149`  
- **Reserva Estratégica:** `0xA91592ffD959110AE5aB1c6826725Cd939E783f8`  

**Cláusula de contingencia (on-chain):**  
Si **`presaleSoldOut = true`** y **antes del 05/04/2026**, es posible **liberar anticipadamente** solo las **2 últimas porciones** de **Liquidez (800M)** y **Ecosistema (50M)** — uso **excepcional** y **auditado**.  

---

## 7. Preventa Inicial  

**Contrato:** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`  

**Monedas aceptadas:** **USDT** y **BNB** (conversión con **Chainlink BNB/USD** — `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`).  

**Entrega:** tokens **enviados en el momento de la compra** (sin vesting para el comprador en este contrato).  

**Políticas operativas:** límites mínimos/máximos por transacción/billetera y listas de acceso pueden **ajustarse on-chain** y **publicarse** en los canales oficiales.  

**Finalización y transparencia:** al concluir, los tokens **no vendidos** pueden ser **quemados**.  

---

## 8. Gobernanza y Transparencia  

La gobernanza es **temporal y rastreable**, operando 100% mediante contratos.  
Las decisiones estructurales se documentan en tiempo real.  
El fundador **no tiene acceso directo** a fondos, liquidez o contratos — la **billetera del fundador** está bloqueada por **12 meses**.  
La soberanía está en la **estructura**, no en la figura.  

---

## 9. Conclusión  

MoonRise no nació para especular.  
Fue creada para **gobernar, ejecutar y construir** algo resistente a la censura y la manipulación.  

> “La ejecución precede a la valorización. Aquellos que construyen, heredan.”  

---

## Aviso de Riesgo  

Los criptoactivos son volátiles y pueden resultar en la pérdida total del capital invertido.  
Nada en este documento constituye una recomendación de inversión, asesoramiento legal, contable o fiscal.  
Las traducciones se proporcionan por conveniencia; en caso de discrepancia, prevalece la versión en inglés.  
