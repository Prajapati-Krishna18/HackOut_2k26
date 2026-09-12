# 🌍 CarbonSphere

### ♻️ Transforming Captured Carbon into a Valuable Resource

CarbonSphere is a digital platform that connects industries with captured CO₂ to potential utilization opportunities through intelligent matchmaking, verification, trust scoring, and logistics-aware recommendations.

---

## 🌍 The Problem

Carbon capture is becoming increasingly important, but capturing CO₂ is only one part of the challenge.

Industries such as cement, steel, power, and chemical plants can capture significant amounts of CO₂, while other industries can potentially use CO₂ as a raw material.

However, finding the right utilization opportunity is difficult because companies need to evaluate:

* 🧪 CO₂ purity
* 📦 Available quantity
* 📍 Location and transportation distance
* 💰 Price
* ⭐ Supplier reliability
* 🛡️ Verification and documentation
* 🏭 Suitable utilization industries

Existing solutions often focus on **carbon capture, carbon storage, or carbon credits**, while the process of discovering and matching captured CO₂ with potential utilization demand remains fragmented.

---

## 💡 Our Solution

**CarbonSphere** creates a digital ecosystem where captured CO₂ can be listed, discovered, evaluated, matched, transported, and utilized.

The platform connects:

**🏭 CO₂ Suppliers → 🌐 Carbon Marketplace → 🧠 Smart Matching → 🚚 Logistics → 🤝 Buyers → ♻️ Utilization**

Instead of simply showing available suppliers, CarbonSphere helps users identify the **most suitable opportunities** based on technical, commercial, trust, and logistical factors.

---

## 🔄 How CarbonSphere Works

```text
Supplier Registers
       ↓
CO₂ Capture Information Added
       ↓
Verification & Trust Evaluation
       ↓
CO₂ Listed on Marketplace
       ↓
Buyer Defines Requirements
       ↓
Smart Matching Engine
       ↓
Ranked Compatible Opportunities
       ↓
Request / Offer
       ↓
Logistics Calculation
       ↓
Transaction
       ↓
CO₂ Utilization
```

---

## 🚀 Core Features

### 🏭 1. Supplier Registration

Suppliers can create profiles containing:

* Company information
* Industry type
* Capture facility details
* CO₂ capture capacity
* CO₂ purity
* Location
* Availability
* Verification documents

---

### 🧑‍💼 2. Buyer Registration

Buyers can specify their CO₂ requirements, including:

* Required quantity
* Required purity
* Budget
* Location
* Industry / utilization type
* Availability requirements

---

### 🛒 3. Carbon Marketplace

Suppliers can list available captured CO₂ and buyers can explore available opportunities.

Listings include:

* CO₂ quantity
* Purity
* Price
* Availability
* Supplier location
* Verification status
* Supplier trust score

Users can filter and sort listings based on relevant requirements.

---

## 🧠 Smart Matching Engine

The Smart Matching Engine is one of the core features of CarbonSphere.

Instead of manually comparing every supplier, the platform evaluates compatibility between a buyer's requirements and available CO₂ supply.

### 📊 Matching Factors

The current scoring model considers:

| Factor                     | Weight |
| -------------------------- | -----: |
| 🧪 Purity Match            |    30% |
| 📦 Quantity Match          |    25% |
| 📍 Distance Match          |    20% |
| ⭐ Supplier Trust Score     |    15% |
| 📈 Historical Success Rate |    10% |

### 🧮 Compatibility Score

```text
Compatibility Score =
30% Purity Match
+ 25% Quantity Match
+ 20% Distance Match
+ 15% Trust Score
+ 10% Historical Success Rate
```

The result is a ranked list of potential suppliers instead of a simple marketplace listing.

### 💡 Why This Matters

A supplier may technically have CO₂ available, but that does not automatically mean it is the best option for a particular buyer.

CarbonSphere considers multiple factors together to identify more practical opportunities.

> The MVP uses an explainable weighted scoring approach. As transaction data grows, the system can evolve toward more advanced machine-learning-based recommendations.

---

## 🔎 Carbon Opportunity Engine

A major challenge occurs when a supplier cannot immediately find a suitable buyer.

Instead of simply displaying:

> ❌ "No Match Found"

CarbonSphere can identify **potential utilization pathways** based on the characteristics of the available CO₂.

Potential sectors include:

* 🌱 Greenhouses
* 🦠 Algae cultivation
* 🧱 Concrete and construction materials
* 🥤 Beverage applications
* ⚗️ Chemical production
* ⛽ Synthetic fuels

These are **potential utilization opportunities**, not guaranteed buyers.

This feature helps suppliers understand where their captured CO₂ could potentially create additional value.

---

## 🛡️ Carbon Verification System

Trust is critical when dealing with industrial CO₂.

CarbonSphere provides a verification layer where suppliers can submit supporting information such as:

* 📄 Government certifications
* 📊 Carbon capture reports
* 🏢 Facility documentation
* ✅ Third-party audit records
* 🧪 CO₂ quality information

The verification status can be used by the platform when evaluating suppliers.

### 🔄 Verification Flow

```text
Supplier
   ↓
Upload Documents
   ↓
Verification Review
   ↓
Approved / Rejected / Pending
   ↓
Verified Supplier Profile
```

Future versions can integrate IoT-based monitoring and external verification systems for stronger validation.

---

## ⭐ Supplier Trust Score

CarbonSphere provides a Trust Score to help buyers evaluate supplier reliability.

The score can consider:

* ✅ Verification status
* 🤝 Successful transactions
* ⏱️ On-time deliveries
* 🧪 CO₂ quality consistency
* ⭐ Buyer reviews
* 📜 Transaction history

Example:

```text
Supplier Trust Score
        92 / 100
```

This gives buyers another decision-making factor beyond price.

---

## 🚚 Logistics-Aware Matching

CO₂ transportation can significantly affect the economics of utilization.

CarbonSphere therefore considers logistics as part of the matching process.

The platform can calculate:

* 📍 Distance between supplier and buyer
* 💰 Estimated transportation cost
* ⏱️ Estimated delivery time
* 🗺️ Route information

This helps users compare opportunities not only by technical compatibility but also by physical feasibility.

---

## 🗺️ Carbon Flow Digital Twin

CarbonSphere provides a visual representation of the carbon journey:

```text
┌──────────────┐
│   Supplier   │
│  Captured CO₂│
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Transportation│
│ Route / Cost │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│     Buyer    │
│ CO₂ Demand   │
└──────┬───────┘
       │
       ↓
┌──────────────┐
│ Utilization  │
│   Pathway    │
└──────────────┘
```

The visualization helps users understand:

* 🏭 Where the CO₂ originated
* 🚚 Where it is being transported
* 🤝 Who is receiving it
* 📦 How much CO₂ is being utilized
* 📍 Associated distance and logistics
* 🌱 Potential sustainability impact

The MVP uses a simplified digital representation; future versions can integrate real-time sensor and logistics data.

---

## 📊 Sustainability Impact

CarbonSphere helps visualize the potential environmental impact of captured CO₂ utilization.

Possible metrics include:

* 🌍 CO₂ supplied
* 🔗 CO₂ matched
* ♻️ CO₂ utilized
* 🤝 Number of successful transactions
* 📍 Transportation distance
* 📉 Potential emissions reduction
* 🔄 Circular economy contribution

> ⚠️ Environmental impact depends on the specific utilization pathway. CarbonSphere therefore presents these values as potential impacts rather than assuming that every tonne of reused CO₂ equals one tonne of avoided emissions.

---

## 🔐 Authentication & User Roles

CarbonSphere supports role-based access for different participants in the ecosystem.

### 🏭 Supplier

Can:

* Manage company profile
* Add CO₂ listings
* Upload verification documents
* View buyer requests
* Manage transactions
* Track performance

### 🧑‍💼 Buyer

Can:

* Define CO₂ requirements
* Search marketplace listings
* View recommended suppliers
* Send requests
* Manage transactions
* Review suppliers

### 🚚 Logistics Partner

Can:

* View assigned deliveries
* Manage shipment information
* Update delivery status

### 🛠️ Admin

Can:

* Manage users
* Review verification requests
* Monitor marketplace activity
* Manage platform data
* View analytics

---

## 🏗️ System Architecture

```text
                ┌─────────────────────┐
                │      Frontend       │
                │      React.js       │
                └──────────┬──────────┘
                           │
                           ↓
                ┌─────────────────────┐
                │     Backend API     │
                │   Node.js/Express   │
                └──────────┬──────────┘
                           │
                           ↓
                ┌─────────────────────┐
                │      Supabase       │
                ├─────────────────────┤
                │ PostgreSQL Database │
                │ Authentication      │
                │ Storage             │
                │ Row Level Security  │
                └─────────────────────┘
```

---

## 🛠️ Tech Stack

### 🎨 Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Tailwind CSS

### ⚙️ Backend

* Node.js
* Express.js
* REST APIs

### 🗄️ Database & Backend Services

* Supabase
* PostgreSQL
* Supabase Authentication
* Supabase Storage
* Row Level Security (RLS)

### 🧠 Intelligence

* Explainable weighted matching algorithm
* Rule-based opportunity recommendations
* Trust score calculation

### 🔗 APIs / Integrations

* Maps / geolocation APIs for distance and route calculations
* Future IoT integrations
* Future external verification integrations

---

## 🗄️ Database Structure

The platform can use the following primary tables:

```text
users
│
├── suppliers
│
├── buyers
│
├── logistics_partners
│
├── carbon_listings
│
├── matches
│
├── transactions
│
├── verification_records
│
├── trust_scores
│
└── notifications
```

### 🔗 Main Relationships

```text
User
 ├── Supplier Profile
 │      └── Carbon Listings
 │             └── Matches
 │                    └── Transactions
 │
 └── Buyer Profile
        └── Requirements
               └── Matches
                      └── Transactions
```

---

## 🔒 Security

CarbonSphere uses Supabase security features to protect platform data.

Key security mechanisms include:

* 🔐 Authentication
* 👥 Role-based access
* 🛡️ Row Level Security (RLS)
* 🔑 Protected API endpoints
* 📁 Secure document storage
* 🚫 Controlled access to verification records

Users should only be able to access data permitted by their role and permissions.

---

## 🎯 Why CarbonSphere?

Traditional carbon solutions generally focus on specific parts of the carbon lifecycle.

```text
Carbon Capture
       ↓
Carbon Storage
       ↓
Carbon Credits
```

CarbonSphere focuses on another important question:

> **What can we do with the CO₂ after it has been captured?**

The platform treats captured CO₂ as a potential **industrial resource** rather than only a waste stream or liability.

CarbonSphere combines:

**🔎 Discovery + 🧠 Matching + 🛡️ Verification + ⭐ Trust + 🚚 Logistics + ♻️ Utilization**

into one ecosystem.

---

## 🆚 Existing Solutions vs CarbonSphere

| Capability                        | Traditional / Specialized Solutions | CarbonSphere      |
| --------------------------------- | ----------------------------------- | ----------------- |
| Carbon Capture                    | ✅                                   | Ecosystem input   |
| Carbon Storage                    | ✅                                   | Not primary focus |
| Carbon Credits                    | ✅                                   | Future scope      |
| CO₂ Marketplace                   | Limited / fragmented                | ✅                 |
| Supplier Discovery                | Limited                             | ✅                 |
| Buyer Requirement Matching        | Limited                             | ✅                 |
| Technical Compatibility           | Limited                             | ✅                 |
| Supplier Trust Score              | Limited                             | ✅                 |
| Verification Layer                | Varies                              | ✅                 |
| Logistics-Aware Matching          | Limited                             | ✅                 |
| Alternative Utilization Discovery | Limited                             | ✅                 |
| Carbon Flow Visualization         | Limited                             | ✅                 |

CarbonSphere is not trying to replace carbon capture or carbon-credit platforms.

It focuses on the **post-capture utilization and matchmaking layer**.

---

## 🧩 Problem Statement Alignment

### 📌 Problem Statement

**Carbon Capture-to-Product Matchmaking Platform**

### CarbonSphere addresses the problem through:

* 🏭 Captured CO₂ supplier registration
* 🧑‍💼 Buyer demand registration
* 🛒 CO₂ marketplace
* 🧠 Smart compatibility matching
* 🔎 Utilization opportunity discovery
* 🛡️ Supplier verification
* ⭐ Trust scoring
* 🚚 Logistics consideration
* 🤝 Transaction management
* 📊 Sustainability visualization

The platform creates a digital connection between **captured carbon supply and potential product/utilization demand**.

---

## 🚀 MVP Scope

The initial MVP focuses on the most important functionality required to demonstrate the concept.

### ✅ Included

* User authentication
* Supplier registration
* Buyer registration
* Carbon listings
* Carbon marketplace
* Smart matching engine
* Verification system
* Supplier trust score
* Opportunity engine
* Logistics calculation
* Dashboard
* Carbon flow visualization

### 🔮 Future Scope

The platform can later evolve with:

* AI demand forecasting
* AI price prediction
* Advanced buyer discovery
* AI negotiation assistant
* IoT sensor integration
* Blockchain-based verification
* Smart contracts
* Carbon credit marketplace
* International CO₂ trading

---

## 💼 Potential Business Model

CarbonSphere can potentially generate revenue through:

### 💰 Transaction Commission

A small percentage of successful CO₂ transactions.

### ⭐ Premium Supplier Accounts

Advanced analytics, higher visibility, market insights, and additional tools.

### 🏢 Enterprise Plans

Customized dashboards, reporting, integrations, and analytics for large industrial companies.

### 🚚 Logistics Partnerships

Potential partnerships with transportation and logistics providers.

### 📊 Data & Market Intelligence

Aggregated market insights around CO₂ supply, demand, pricing, and utilization trends.

---

## 🌱 Example Use Case

### 📌 Scenario

A cement plant captures:

**50 tonnes of CO₂**

with:

**95% purity**

The supplier lists the available CO₂ on CarbonSphere.

A buyer requires:

**30 tonnes**

with:

**90%+ purity**

CarbonSphere evaluates:

* 🧪 Purity compatibility
* 📦 Quantity compatibility
* 📍 Distance
* ⭐ Supplier trust
* 📈 Historical performance

The system generates a compatibility score and ranks the supplier as a potential match.

The buyer can then:

```text
View Supplier
      ↓
Check Verification
      ↓
Check Trust Score
      ↓
View Logistics
      ↓
Send Request
      ↓
Transaction
      ↓
CO₂ Utilization
```

If no suitable buyer is available, the Carbon Opportunity Engine can suggest potential utilization sectors for the remaining supply.

---

## 📈 Future Vision

CarbonSphere can evolve into a broader **Circular Carbon Ecosystem** where companies can discover, trade, transport, verify, and utilize captured CO₂.

The long-term vision is:

```text
Capture
   ↓
Verify
   ↓
Match
   ↓
Transport
   ↓
Utilize
   ↓
Measure Impact
   ↓
Create Value
```

This creates a pathway where captured CO₂ can become a **traceable, reusable industrial resource**.

---

## 👥 Team

Built as a hackathon project focused on solving the challenge of connecting captured carbon supply with utilization opportunities.

### 🤝 Team Responsibilities

**Backend & Database**

* Authentication
* User management
* Supplier & buyer modules
* Marketplace
* Transactions
* Supabase integration

**🧠 Intelligence & Business Logic**

* Smart matching
* Opportunity engine
* Verification
* Trust score
* Logistics
* Sustainability calculations

---

## 🎬 Demo Flow

For the project demonstration, the recommended flow is:

```text
1. Supplier Registration
        ↓
2. Add Captured CO₂
        ↓
3. Upload Verification
        ↓
4. Buyer Registration
        ↓
5. Define CO₂ Requirements
        ↓
6. Smart Match
        ↓
7. View Compatibility Score
        ↓
8. Check Trust Score
        ↓
9. Calculate Logistics
        ↓
10. View Carbon Flow
        ↓
11. Send Request
        ↓
12. Transaction
```

Then demonstrate the **no-match scenario**:

```text
No Direct Match
       ↓
Opportunity Engine
       ↓
Potential Utilization Sectors
```

---

## 📂 Project Structure

```text
CarbonSphere/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   └── ...
│
├── supabase/
│   ├── migrations/
│   └── ...
│
├── README.md
└── package.json
```

---

## 📜 License

This project was developed as a hackathon project for exploring digital solutions for carbon utilization and circular carbon ecosystems.

---

## 🌍 CarbonSphere

### ♻️ Transforming Captured Carbon into a Valuable Resource.
