# Whitepaper — MoonRise (EN)

**Last update:** 2025-10-27  

---

## 1. Executive Overview  

MoonRise is a **decentralized financial infrastructure** built for **real execution**, **full transparency**, and **strategic control**.  
With its native token (**MRS**), dedicated wallet, liquidity fund, and governance modules, MoonRise operates as a **closed, integrated, and self-sustaining ecosystem**, engineered to scale.  

It’s not a future promise — it’s **present execution**.  
From contract to product, everything is **traceable and public**.  

**Official Contracts (BSC):**  
- **MRS Token:** `0x8169A998A15142C94d3F03E5C51c216870FBE157`  
- **Initial Raise (Presale):** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`  
- **MasterVault:** `0x732Dde35D139F764FCd642Ad7CDc633C2ED60DE6`  

---

## 2. Market Context  

Most of the crypto market has been flooded with hype projects — loud launches, no product, and abandoned communities.  
Serious investors seek what’s rare:  

- Transparency  
- Real structure  
- Proven execution  
- True liquidity  

MoonRise emerges as an answer: engineering from day one, consistent product delivery, and a brand built on precision, consistency, and global ambition.  

---

## 3. MoonRise Ecosystem  

MoonRise operates through a set of **100% in-house developed** components:  

- **MRS Token** — the ecosystem’s currency, featuring a **dynamic sell tax (3.5%–7.0%)**, **0.5% buy tax**, **anti-dump cooldowns**, and a **12-month founder lock**.  
- **Moon+ (RWA)** — a **technical infrastructure** for real-world asset operations in partnership with **SPEs and independent entities**:  
  - public/auditable on-chain standards, contracts, and rules;  
  - **on-chain monitoring** and technical reports;  
  - **we do not broker securities.** Execution is done by independent partners under public on-chain rules.  
- **MoonWallet** — native multi-chain wallet with real-time data and integrated ecosystem dApps.  

**Principle:** real-world investment, ecosystem-captured value.  

---

## 4. Tokenomics & Strategic Distribution  

**Token:** MoonRise (**MRS**) — **BEP-20 standard**  
**Total supply (minted):** **9,700,000,000 MRS**  
**Initial burn (at deploy):** **1,700,000,000 MRS**  
**Post-burn supply (active on-chain):** **8,000,000,000 MRS**  
**Official contract (MRS):** `0x8169A998A15142C94d3F03E5C51c216870FBE157`  

**Distribution (based on post-burn 8.0B):**  
- **Liquidity/DEX:** **6,000,000,000** (**75.00%**) — `0xB25E9FD517b662CD5740dBB34F569f596E5f9992`  
- **Marketing:** **700,000,000** (**7.21%**) — `0x0286f6AdE4635a736fe62F1355768122f4B282Ed`  
- **Development:** **600,000,000** (**6.18%**) — `0xD9Acf6D88586f363b7732cC3D566121A6c6ff1CF`  
- **Ecosystem:** **350,000,000** (**3.60%**) — `0x2C521F6BC51B31EA4a1D366bc2d692Caf8423149`  
- **Strategic Reserve:** **250,000,000** (**2.57%**) — `0xA91592ffD959110AE5aB1c6826725Cd939E783f8`  
- **Founder (locked 12 months):** **100,000,000** (**1.03%**) — `0x00Ac5b001854Dd5F6c10124E5c1EB2ddF9a0931A`  

> **Token origin:** Presale tokens come directly from the **Liquidity Wallet** `0xB25E9FD517b662CD5740dBB34F569f596E5f9992` to the **Presale Contract** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`.  

> **No additional mint.** Unsold tokens may be **burned** to `0x000000000000000000000000000000000000dEaD`.  

**Taxes & Protections (technical summary):**  

- **Buy tax:** **0.50%** → **Ecosystem**  
- **Sell tax (dynamic):** **3.5% or 7.0%** — recalculated every **15 minutes** (if **sales > buys**, applies **7.0%**) → **Ecosystem**  
- **Post-buy delay:** **5 min** before selling (also applies to **P2P anchored trades**)  
- **Admin/Security:** contract is pausable; ownership renounced only after **locking** AMM/exemptions and **defining** router; AMM pairs can only be **marked**, never **unmarked**.  

---

## 5. Fund Allocation  

**Automatic on-chain split of raised funds (BNB/USDT):**  
- **62%** — **Ecosystem** (`0x7c6e0128b390cD108d0D3B1976830943Ab7CDD6E`)  
- **23%** — **Liquidity** (`0xf3843Ec0571192EB109D12aba50F54d59a961E30`)  
- **15%** — **Development/Initial Operations** (`0x9d492BfD7690402acE4707A07dFF1639D4cE4127`)  

Practical application:  

- **Development Expansion** — new products, security, and strategic modules.  
- **Ecosystem Operations** — infrastructure, support, and on-chain monitoring.  
- **Liquidity** — scheduled injections to maintain healthy market depth.  
- **Institutional Marketing** — strengthening global brand presence.  

All movements are **traceable** and executed through **smart contracts**.  

---

## 6. Locked Supply, Reserves & MasterVault  

MoonRise uses the **MasterVault** contract (`0x732Dde35D139F764FCd642Ad7CDc633C2ED60DE6`) for secure and disciplined fund control:  
- unlocks follow an **immutable schedule**;  
- no manual access possible;  
- public audit of **tranches and balances**.  

**Wallets under MasterVault (official):**  
- **Liquidity:** `0xB25E9FD517b662CD5740dBB34F569f596E5f9992`  
- **Development:** `0xD9Acf6D88586f363b7732cC3D566121A6c6ff1CF`  
- **Marketing:** `0x0286f6AdE4635a736fe62F1355768122f4B282Ed`  
- **Ecosystem:** `0x2C521F6BC51B31EA4a1D366bc2d692Caf8423149`  
- **Strategic Reserve:** `0xA91592ffD959110AE5aB1c6826725Cd939E783f8`  

**Contingency clause (on-chain):**  
If **`presaleSoldOut = true`** and **before 2026-04-05**, early release of only the **last 2 tranches** of **Liquidity (800M)** and **Ecosystem (50M)** is allowed — **exceptional and auditable** use only.  

---

## 7. Initial Presale  

**Contract:** `0xe04765B7d6B4c9eDAc0a918b41D243e4F507082D`  

**Accepted currencies:** **USDT** and **BNB** (conversion via **Chainlink BNB/USD** — `0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE`).  

**Delivery:** tokens are **sent instantly at purchase** (no vesting for buyers in this contract).  

**Operational policies:** minimum/maximum limits per transaction/wallet and access lists can be **adjusted on-chain** and **announced** via official channels.  

**Completion & transparency:** after the presale ends, unsold tokens may be **burned**.  

---

## 8. Governance & Transparency  

Governance is **temporary and traceable**, operating fully via smart contracts.  
Structural decisions are documented in real-time.  
The founder **has no direct access** to funds, liquidity, or contracts — **founder wallet** is locked for **12 months**.  
Sovereignty lies in the **structure**, not the individual.  

---

## 9. Conclusion  

MoonRise was not created for speculation.  
It was built to **govern, execute, and construct** something resistant to censorship and manipulation.  

> “Execution precedes valuation. Those who build, inherit.”  

---

## Risk Disclaimer  

Crypto assets are volatile and may result in total capital loss.  
Nothing in this document constitutes investment, legal, accounting, or tax advice.  
Translations are provided for convenience; in case of conflict, the **English version prevails**.
