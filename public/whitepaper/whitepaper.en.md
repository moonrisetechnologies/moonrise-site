# Whitepaper — MoonRise (EN)

**Last update:** 2025-10-01  

---

## 1. Executive Vision  

MoonRise is a **decentralized financial infrastructure**, built for **real execution**, **full transparency**, and **strategic control**.  
With its own token (**MRS**), dedicated wallet, liquidity vault, and governance modules, MoonRise operates as a **closed ecosystem** — integrated, autonomous, and designed to scale.  

This is not a future promise; it is present execution.  
From contract to product, everything is **traceable and public**.  

**Official Contracts (BSC):**  
- **Token MRS:** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  
- **Initial Sale (Presale):** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  
- **MasterVault:** `0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`  

---

## 2. Market Context  

Much of the crypto market has been dominated by hype projects: loud launches, zero product, and abandoned communities.  
Serious investors seek what is rare:  

- Transparency  
- Real structure  
- Proven execution  
- True liquidity  

MoonRise emerges as the answer — engineering from day one, product delivery, and a brand built on precision, consistency, and global ambition.  

---

## 3. MoonRise Ecosystem  

MoonRise operates through a set of components developed **100% in-house**:  

- **Token MRS** — the core currency of the ecosystem, featuring a **dynamic sell fee (3.5%–7.0%)**, **0.5% buy fee**, **anti-dump cooldowns**, and a **12-month founder lock**.  
- **Moon+ (RWA)** — **technical infrastructure** for real-world asset operations in partnership with **independent entities and SPVs**:  
  - standardized, public, and auditable on-chain contracts;  
  - **on-chain monitoring** and technical reporting;  
  - **no brokerage or security intermediation.** Execution occurs through independent partners under public rules.  
- **MoonWallet** — native multi-chain wallet with real-time data and dApp integration.  

**Principle:** real-world value, captured within the ecosystem.  

---

## 4. Tokenomics & Strategic Distribution  

**Token:** MoonRise (**MRS**) — **BEP-20** standard  
**Total Supply (minted):** **9,700,000,000 MRS**  
**Initial Burn (at deploy):** **1,700,000,000 MRS**  
**Post-burn Supply (active on-chain):** **8,000,000,000 MRS**  
**Official Contract (MRS):** `0x178A7Ef67fCBC4c3a1a7d4dAee511F21271b6908`  

**Distribution (over post-burn supply):**  
- **Liquidity/DEX:** **6,000,000,000** (**75.00%**) — `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Marketing:** **750,000,000** (**9.375%**) — `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Development:** **630,000,000** (**7.875%**) — `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Ecosystem:** **350,000,000** (**4.375%**) — `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Strategic Reserve:** **250,000,000** (**3.125%**) — `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  
- **Founder (locked 12 months):** **20,000,000** (**0.25%**) — `0x2d0D394CdD4AD1D185C28064C809C14fBd82f27b`  

> **Token source for presale:** on-chain transfer from the **Liquidity wallet** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F` to the **presale contract** `0xdA89B77ef1770051685039911B64D2C6C2E85891`.  

> **No additional minting.** Unsold tokens may be **burned** to `0x000000000000000000000000000000000000dEaD`.  

**Fees & Protections (technical summary):**  

- **Buy Fee:** **0.50%** → **Ecosystem**  
- **Sell Fee (dynamic):** **3.5% or 7.0%** — recalculated every **15 minutes** (if **sales > buys**, the 7.0% rate applies) → **Ecosystem**  
- **Post-buy delay:** **5 min** before selling (applies also to **anchored P2P**)  
- **Admin/Security:** contract is pausable; owner renunciation only after **locking** AMM/exemptions and **defining** router; AMM pairs can only be **marked**, never **unmarked**.  

---

## 5. Use of Funds  

**Automatic on-chain split (BNB/USDT):**  
- **62%** — **Ecosystem** (`0x7c6e0128b390cD108d0D3B1976830943Ab7CDD6E`)  
- **23%** — **Liquidity** (`0xf3843Ec0571192EB109D12aba50F54d59a961E30`)  
- **15%** — **Development/Operations** (`0x9d492BfD7690402acE4707A07dFF1639D4cE4127`)  

Practical allocation:  

- **Development Expansion** — new products, modules, and security.  
- **Ecosystem Operations** — infrastructure, support, and on-chain monitoring.  
- **Liquidity** — programmed injections to maintain healthy depth.  
- **Institutional Marketing** — strengthening global brand presence.  

All transfers are **traceable and executed by smart contracts**.  

---

## 6. Locked Supply, Reserves & MasterVault  

MoonRise uses the **MasterVault** (`0xe47B229af03996BdaB9ccb90E1123260c6eD67B3`) for control, discipline, and protection:  
- unlock schedule is **immutable**;  
- **no manual access** to funds;  
- **public auditability** of tranches and balances.  

**Wallets under MasterVault:**  
- **Liquidity:** `0xe0a6A9293bbF5CCF121415aEA864ea6dcFA7c95F`  
- **Development:** `0xaC5D1A8A83239B8a1b1AE06B28157c43f0b416E3`  
- **Marketing:** `0x2Feb4cc556cb470067DEa59A12542BEe5F1bd16B`  
- **Ecosystem:** `0xbc06CC9A2bc23EBC84F5512E66CffFa4eba6958d`  
- **Strategic Reserve:** `0x6C09dC3Dbc57e836CDB42FeF0321CeCac9233f66`  

**Contingency Clause (on-chain):**  
If **`presaleSoldOut = true`** and **before 2027-01-01**, early unlock is allowed only for the **final tranche** of **Liquidity (350M)** and **Ecosystem (50M)** — **exceptional** and **auditable** use.  

---

## 7. Initial Presale  

**Contract:** `0xdA89B77ef1770051685039911B64D2C6C2E85891`  

**Accepted currencies:** **USDT** and **BNB** (conversion via **Chainlink BNB/USD** — `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`).  

**Delivery:** tokens are **instantly sent** upon purchase (no vesting in this contract).  

**Operational policies:** min/max limits per transaction and address, and access lists, may be **adjusted on-chain** and disclosed through official channels.  

**Completion & transparency:** after the end of the sale, unsold tokens may be **burned**.  

---

## 8. Governance & Transparency  

Governance is **temporary and traceable**, operating 100% via contracts.  
All structural decisions are documented in real time.  
The founder has **no direct access** to funds, liquidity, or contracts — the **founder wallet** is **locked for 12 months**.  
Sovereignty lies in the **structure**, not the individual.  

---

## 9. Conclusion  

MoonRise was not created for speculation.  
It was built to **govern, execute, and construct** something resistant to censorship and manipulation.  

> “Execution precedes valuation. Those who build, inherit.”  

---

## Risk Notice  

Crypto assets are volatile and may result in total capital loss.  
Nothing in this document constitutes investment, legal, accounting, or tax advice.  
Translations are provided for convenience; in case of discrepancy, the English version prevails.  
