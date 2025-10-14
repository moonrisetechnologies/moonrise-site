# Whitepaper — MoonRise (EN)

**Last update:** 2025-10-01  

---

## 1. Executive Overview  

MoonRise is a financial infrastructure built for **real execution**, **full transparency**, and **strategic control**.  
With its own token (**MRS**), dedicated wallet, liquidity fund, and governance modules, MoonRise operates as a **closed ecosystem**, integrated and self-sufficient, designed to scale.  

This is not a future promise; it is present execution. From contract to final product, everything is **traceable and public**.  

**Official contracts (BSC):**  
- **Token MRS:** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  
- **Initial Presale:** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  
- **MasterVault:** `0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`  

---

## 2. Market Context  

Most of the crypto market has been dominated by hype projects: loud launches, no product, and abandoned communities. Serious investors seek what is rare:  

- Transparency  
- Real structure  
- Proven execution  
- True liquidity  

MoonRise emerges as the answer: engineering from day one, product delivery, and a brand of precision, consistency, and global ambition.  

---

## 3. MoonRise Ecosystem  

MoonRise operates through a set of components developed **100% in-house**:  

- **Token MRS** — ecosystem currency, with **dynamic sell fee (3.5%–7.0%)**, **buy fee 0.5%**, **anti-dump delays/cooldowns**, and **founder lock (12 months)**.  
- **Moon+ (RWA)** — **technical infrastructure** for operations with real-world assets in partnership with **SPVs and independent companies**:  
  - standards, contracts, and public/auditable on-chain rules;  
  - **on-chain monitoring** and technical reports;  
  - **we do not intermediate securities. We are not a broker.** Execution is carried out by SPVs and independent partners, under public rules.  
- **MoonWallet** — proprietary multi-chain wallet with real-time data and integration with dApps of the ecosystem.  

**Principle:** investment in the real world, value captured in the ecosystem.  

---

## 4. Tokenomics and Strategic Distribution  

**Token:** MoonRise (**MRS**) — **BEP-20 standard**  
**Total supply (issued):** **9,700,000,000 MRS**  
**Initial burn (at deploy):** **1,700,000,000 MRS**  
**Post-burn supply (active on-chain):** **8,000,000,000 MRS**  
**Official contract (MRS):** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  

**Distribution (over the post-burn supply: 8.0B):**  
- **Liquidity/DEX:** **6,000,000,000** (**75.00%**) — `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Marketing:** **750,000,000** (**9.375%**) — `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Development:** **630,000,000** (**7.875%**) — `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Ecosystem:** **350,000,000** (**4.375%**) — `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Strategic Reserve:** **250,000,000** (**3.125%**) — `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  
- **Founder (locked 12 months):** **20,000,000** (**0.25%**) — `0x2d0D394CdD4AD1D185C28064C809C14fBd82f27b`  

> **Source of presale tokens:** on-chain transfer from **Liquidity wallet** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F` to the **presale contract** `0xdA89B77ef1770051685039911B64D2C6C2E85891`.  

> **No additional mint.** Unsold tokens may be **burned** to `0x000000000000000000000000000000000000dEaD`.  

**Fees & Protections (technical summary):**  

- **Buy:** **0.50%** (50 bps) → **Ecosystem**  
- **Sell (dynamic):** **3.5% or 7.0%** — recalculated every **15 min** (if **sells > buys** in the window, 7.0% applies) → **Ecosystem**  
- **Post-buy delay:** **5 min** before selling (also applies to anchored P2P when enabled)  
- **Admin/Security:** contract pausable; owner renunciation only after **freezing** AMM/exemptions and defining router; AMM pairs can only be **marked** (cannot be unmarked).  

---

## 5. Use of Raised Funds  

**Automatic on-chain split of BNB/USDT raise:**  
- **62%** — **Ecosystem** (`0x7c6e0128b390cD108d0D3B1976830943Ab7CDD6E`)  
- **23%** — **Liquidity** (`0xf3843Ec0571192EB109D12aba50F54d59a961E30`)  
- **15%** — **Development/Initial Operations** (`0x9d492BfD7690402acE4707A07dFF1639D4cE4127`)  

Practical application:  

- **Development Expansion** — new products, security, and strategic modules.  
- **Ecosystem Operations** — infrastructure, support, and on-chain monitoring.  
- **Liquidity** — programmed injections to maintain healthy market depth.  
- **Institutional Marketing** — strengthening the global brand.  

All movements are **traceable** and executed via **smart contracts**.  

---

## 6. Locked Supply, Reserves, and MasterVault  

For discipline and protection, MoonRise uses the **MasterVault** contract (`0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`), which:  
- controls token unlocks through an **immutable schedule**;  
- prevents manual access to funds;  
- allows **public auditing** of tranches and balances.  

**Wallets under MasterVault (official):**  
- **Liquidity:** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Development:** `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Marketing:** `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Ecosystem:** `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Strategic Reserve:** `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  

**MasterVault Strategic Reserves:**  
The last tranche of **Liquidity** and **Ecosystem** is held exclusively for **emergencies and operational agility**, such as: early listing in case of presale depletion, immediate partner support, or technical adjustments that cannot wait for the schedule — always **public and auditable**.  

**Note:** no institutional unlock in **2025**; releases scheduled starting **2026**.  

**Contingency clause (on-chain):** if **`presaleSoldOut = true`** and **before 01/01/2027**, it is possible to **release in advance** only the **last tranche** of **Liquidity (350M)** and **Ecosystem (50M)** to a designated address — **exceptional** and **auditable use**.  

---

## 7. Initial Presale  

**Contract:** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  

**Accepted currencies:** **USDT** and **BNB** (conversion via **Chainlink BNB/USD** — `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`).  

**Delivery:** tokens **sent at the time of purchase** (no vesting for the buyer in this contract).  

**Operational policies:** minimum/maximum limits per transaction/wallet and possible access lists can be **adjusted on-chain** and disclosed via official channels.  

**Finalization & transparency:** after the end, unsold tokens may be **burned** to `DEAD`. All allocations and splits are **verifiable on-chain**.  

**Source of tokens (on-chain proof):**  
- **From:** **Liquidity/DEX wallet** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`.  
- **To:** **presale contract** `0xdA89B77ef1770051685039911B64D2C6C2E85891`.  
- **Maximum allocated:** **2,500,000,000 MRS** (subset of the **6.0B** reserved for Liquidity).  
- **End rule:** unsold tokens may be **burned** (reducing circulating supply).  

*(No disclosure of prices or phases in this document. Commercial items — when applicable — remain in the presale interface and official channels.)*  

---

## 8. Governance and Transparency  

Governance is **temporary and traceable**, operating 100% through contracts.  

Structural decisions are documented in real-time.  
The founder has **no direct access** to funds, liquidity, or contracts — the **founder wallet** is locked for **12 months**.  
Sovereignty lies in the **structure**, not the individual.  

---

## 9. Conclusion  

MoonRise was not created to speculate. It was built to **govern, execute, and build** a financial empire — resistant to censorship and manipulation.  

> “Execution precedes valuation. Those who build, inherit.”  

**MoonRise Technologies LLC (WY, USA)**  

---

## Risk Disclaimer  

Crypto assets are volatile and may result in the total loss of invested capital.  
Nothing in this document constitutes investment advice, legal, accounting, or tax advice.  
Translations are provided for convenience; in case of divergence, the English version prevails.  
