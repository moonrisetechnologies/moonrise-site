# Whitepaper — MoonRise (ES)

**Última actualización:** 2025-10-01  

---

## 1. Visión Ejecutiva  

MoonRise es una **infraestructura financiera descentralizada**, creada para la **ejecución real**, la **transparencia total** y el **control estratégico**.  
Con su propio token (**MRS**), billetera dedicada, fondo de liquidez y módulos de gobernanza técnica, MoonRise opera como un **ecosistema cerrado**, integrado, autosuficiente y diseñado para escalar.  

No es una promesa futura; es ejecución presente.  
Desde el contrato hasta el producto final, todo es **rastreable y público**.  

**Contratos oficiales (BSC):**  
- **Token MRS:** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  
- **Venta inicial (preventa):** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  
- **MasterVault:** `0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`  

---

## 2. Contexto del Mercado  

Gran parte del mercado cripto ha sido dominado por proyectos de hype: lanzamientos ruidosos, cero producto y comunidades abandonadas.  
El inversor serio busca lo que es raro:  

- Transparencia  
- Estructura real  
- Ejecución comprobada  
- Liquidez verdadera  

MoonRise surge como respuesta: ingeniería desde el primer día, entrega de producto y una marca basada en la precisión, la constancia y la ambición global.  

---

## 3. Ecosistema MoonRise  

MoonRise opera a través de un conjunto de componentes desarrollados **100% internamente**:  

- **Token MRS** — moneda central del ecosistema, con **tasa dinámica de venta (3,5%–7,0%)**, **tasa de compra de 0,5%**, **retrasos/cooldowns anti-dump** y **bloqueo del fundador por 12 meses**.  
- **Moon+ (RWA)** — **infraestructura técnica** para operaciones con activos del mundo real en colaboración con **entidades y sociedades independientes (SPEs)**:  
  - contratos y normas públicas y auditables en cadena;  
  - **monitoreo on-chain** y reportes técnicos;  
  - **no intermediamos valores mobiliarios ni actuamos como correduría.** La ejecución la realizan entidades independientes bajo reglas públicas.  
- **MoonWallet** — billetera multi-chain propia, con datos en tiempo real e integración con los dApps del ecosistema.  

**Principio:** inversión en el mundo real, valor capturado dentro del ecosistema.  

---

## 4. Tokenomics y Distribución Estratégica  

**Token:** MoonRise (**MRS**) — estándar **BEP-20**  
**Suministro total (emitido):** **9.700.000.000 MRS**  
**Quema inicial (en el despliegue):** **1.700.000.000 MRS**  
**Suministro post-quema (activo on-chain):** **8.000.000.000 MRS**  
**Contrato oficial (MRS):** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  

**Distribución (sobre el suministro post-quema):**  
- **Liquidez/DEX:** **6.000.000.000** (**75,00%**) — `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Marketing:** **750.000.000** (**9,375%**) — `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Desarrollo:** **630.000.000** (**7,875%**) — `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Ecosistema:** **350.000.000** (**4,375%**) — `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Reserva Estratégica:** **250.000.000** (**3,125%**) — `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  
- **Fundador (bloqueado por 12 meses):** **20.000.000** (**0,25%**) — `0x2d0D394CdD4AD1D185C28064C809C14fBd82f27b`  

> **Origen de los tokens para la preventa:** transferencia on-chain desde la **cartera de Liquidez** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F` al **contrato de preventa** `0xdA89B77ef1770051685039911B64D2C6C2E85891`.  

> **Sin acuñaciones adicionales.** Los tokens **no vendidos** pueden ser **quemados** en `0x000000000000000000000000000000000000dEaD`.  

**Tasas y Protecciones (resumen técnico):**  

- **Compra:** **0,50%** → **Ecosistema**  
- **Venta (dinámica):** **3,5% o 7,0%** — recalculada cada **15 min** (si **ventas > compras**, se aplica **7,0%**) → **Ecosistema**  
- **Retraso post-compra:** **5 min** antes de poder vender (también aplica al **P2P anclado**)  
- **Administración/Seguridad:** contrato pausible; renuncia del propietario solo tras **bloquear** AMM/exenciones y **definir** router; los pares AMM solo pueden ser **marcados**, no **desmarcados**.  

---

## 5. Uso de los Fondos  

**División automática on-chain (BNB/USDT):**  
- **62%** — **Ecosistema** (`0x7c6e0128b390cD108d0D3B1976830943Ab7CDD6E`)  
- **23%** — **Liquidez** (`0xf3843Ec0571192EB109D12aba50F54d59a961E30`)  
- **15%** — **Desarrollo/Operación inicial** (`0x9d492BfD7690402acE4707A07dFF1639D4cE4127`)  

Aplicación práctica:  

- **Expansión de Desarrollo** — nuevos productos, seguridad y módulos estratégicos.  
- **Operaciones del Ecosistema** — infraestructura, soporte y monitoreo on-chain.  
- **Liquidez** — inyecciones programadas para mantener una profundidad saludable de mercado.  
- **Marketing Institucional** — fortalecimiento de la marca global.  

Todas las operaciones son **rastreables** y ejecutadas mediante **contratos inteligentes**.  

---

## 6. Suministro Bloqueado, Reservas y MasterVault  

MoonRise utiliza el contrato **MasterVault** (`0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`) para control, disciplina y seguridad:  
- desbloqueos según **cronograma inmutable**;  
- sin acceso manual a fondos;  
- auditoría pública de **porciones y saldos**.  

**Carteras bajo MasterVault:**  
- **Liquidez:** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Desarrollo:** `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Marketing:** `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Ecosistema:** `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Reserva Estratégica:** `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  

**Cláusula de contingencia (on-chain):**  
Si **`presaleSoldOut = true`** y **antes del 01/01/2027**, se puede **liberar anticipadamente** solo la **última porción** de **Liquidez (350M)** y **Ecosistema (50M)** — uso **excepcional** y **auditable**.  

---

## 7. Preventa Inicial  

**Contrato:** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  

**Monedas aceptadas:** **USDT** y **BNB** (conversión con **Chainlink BNB/USD** — `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`).  

**Entrega:** los tokens se **envían inmediatamente** al comprar (sin vesting en este contrato).  

**Políticas operativas:** límites mínimos/máximos por transacción/cartera y listas de acceso pueden ser **ajustadas on-chain** y **publicadas** en los canales oficiales.  

**Finalización y transparencia:** al terminar, los tokens **no vendidos** pueden ser **quemados**.  

---

## 8. Gobernanza y Transparencia  

La gobernanza es **temporal y rastreable**, operando 100% mediante contratos.  
Las decisiones estructurales se documentan en tiempo real.  
El fundador **no tiene acceso directo** a fondos, liquidez o contratos — la **cartera del fundador** está **bloqueada durante 12 meses**.  
La soberanía reside en la **estructura**, no en la figura.  

---

## 9. Conclusión  

MoonRise no nació para especular.  
Fue creada para **gobernar, ejecutar y construir** algo resistente a la censura y la manipulación.  

> “La ejecución precede a la valoración. Aquellos que construyen, heredan.”  

---

## Aviso de Riesgo  

Los criptoactivos son volátiles y pueden resultar en la pérdida total del capital invertido.  
Nada en este documento constituye recomendación de inversión, ni asesoramiento legal, contable o fiscal.  
Las traducciones se proporcionan para conveniencia; en caso de discrepancia, prevalece la versión en inglés.  
