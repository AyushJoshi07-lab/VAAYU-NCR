Create a **high-fidelity, interactive, working MVP prototype** for **SIH 2026 Problem Statement SIH26082 — “Air Pollution–Weather Coupled Forecasting System (Delhi NCR Focus)”**.

The product must NOT look like a generic AQI monitoring website.

It must look like a **scientific environmental intelligence and early-warning platform** designed for government agencies, meteorologists, disaster-management authorities, researchers and city administrators.

The central concept is:

# **VAAYU-X**

### **Coupled Air Intelligence for Delhi NCR**

**“See the atmosphere. Predict the pollution. Understand the cause. Act before the spike.”**

The platform's core workflow is:

**OBSERVE → COUPLE → FORECAST → EXPLAIN → TRACE → WARN → ACT**

---

# 1. UNDERSTAND THE ACTUAL PROBLEM

Design the MVP around the scientific requirement of SIH26082.

The system must represent the interaction between:

### Meteorology

* Temperature
* Wind speed
* Wind direction
* Planetary Boundary Layer (PBL) height
* Relative humidity
* Atmospheric pressure
* Atmospheric stability
* Temperature inversion

### Atmospheric chemistry / pollution

* PM2.5
* PM10
* Ground-level O₃
* NOx
* AQI

### External pollution transport

* Regional crop-residue/stubble-burning emissions
* Pollution plume movement
* Wind-driven transport
* Atmospheric trapping

The system should communicate that pollution and weather are **not independent**.

Example causal chain:

**Strong inversion**
↓
**Low PBL height**
↓
**Weak vertical mixing**
↓
**Pollutants trapped near surface**
↓
**PM2.5 accumulation**
↓
**Aerosol loading increases**
↓
**Radiation / local atmospheric conditions change**
↓
**Meteorological state changes**
↓
**Pollution dispersion changes again**

This two-way interaction must be visually apparent throughout the product.

---

# 2. PRODUCT PHILOSOPHY

Do not create a dashboard that merely says:

“Delhi AQI = 300.”

Instead, the product must answer five questions:

### 1. WHAT is happening?

Current pollution state.

### 2. WHAT will happen?

72-hour forecast.

### 3. WHY will it happen?

Weather + chemistry coupling.

### 4. WHERE will it happen?

Spatial hotspot and plume prediction.

### 5. WHEN should authorities act?

Early-warning window and confidence.

Every major screen should reinforce these five questions.

---

# 3. VISUAL STYLE

Create a premium **scientific command-center interface**.

Design language:

* Modern environmental intelligence platform
* Government-grade
* Scientific
* Data-dense but highly readable
* Professional
* Minimal decoration
* Strong information hierarchy
* Dark/light hybrid command-center aesthetic
* High-quality maps and charts
* Subtle animations
* No excessive glassmorphism
* No generic startup illustrations
* No fake 3D Earth graphics unless genuinely useful

Use a restrained palette:

* Deep navy / charcoal for command-center areas
* White / light neutral for analytical surfaces
* Green = Good
* Yellow = Moderate
* Orange = Poor
* Red = Very Poor
* Deep red / purple = Severe
* Blue/cyan = meteorological variables
* Magenta/purple = plume/transport visualization

Use **Inter or another highly legible professional UI font**.

---

# 4. GLOBAL NAVIGATION

Create a persistent sidebar:

**VAAYU-X**

Navigation:

1. **Command Center**
2. **72H Forecast**
3. **Coupling Engine**
4. **Pollution Map**
5. **Plume Tracker**
6. **Inversion Monitor**
7. **Hotspots**
8. **Alerts**
9. **Model Validation**

Bottom:

* Data status
* Model status
* Last update
* Settings

Top bar:

**Delhi NCR**

Date/time

**LIVE / DEMO MODE**

Data freshness

Notification icon

User profile

---

# 5. SCREEN 1 — COMMAND CENTER

This is the most important screen.

When judges open the product, they should immediately understand the entire solution.

Header:

## **Delhi NCR Atmospheric Intelligence**

Subheading:

**72-hour coupled meteorology–chemistry forecast**

---

## CURRENT STATE CARD

Large central card:

### **CURRENT AQI**

**287**

**POOR**

Show:

PM2.5 — 168 µg/m³
PM10 — 294 µg/m³
O₃ — 42 µg/m³
NOx — 61 µg/m³

Beside it show:

### Atmospheric State

Temperature:
24°C

Humidity:
82%

Wind:
2.1 m/s NW

PBL Height:
420 m

Inversion:
**STRONG**

---

# 6. ATMOSPHERIC COUPLING STATUS

Create a visually impressive horizontal “system state” visualization:

### **ATMOSPHERIC COUPLING**

Show interconnected nodes:

**Meteorology**

Temperature
Wind
PBL Height
Humidity

↓

**Atmospheric Stability**

↓

**Pollution Dispersion**

↓

**PM2.5 / PM10 / O₃ / NOx**

↓

**AQI**

Then show feedback:

**Aerosol loading → radiation effect → PBL modification**

Make this look like an actual scientific model pipeline.

Add status:

### Coupling State

**HIGH POLLUTION TRAPPING**

Confidence:
**89%**

---

# 7. 72-HOUR FORECAST — HERO COMPONENT

Create the largest chart on the dashboard.

Title:

## **72-Hour Coupled Pollution Forecast**

Display:

* Observed PM2.5
* Forecast PM2.5
* Forecast confidence interval
* AQI category bands

Timeline:

NOW
+6H
+12H
+24H
+36H
+48H
+60H
+72H

The graph should clearly show a pollution spike.

Example:

Current:
287 AQI

+12h:
322

+24h:
401

+36h:
428

+48h:
365

+72h:
276

Add a visible forecast peak:

### **Predicted peak**

**AQI 428**

Tomorrow:
**07:00–10:00**

Confidence:
**87%**

Do NOT claim these numbers are real. Clearly label the prototype data as:

**DEMO / SIMULATED FORECAST**

---

# 8. FORECAST EXPLANATION

Immediately beside the forecast graph create:

## **WHY IS AQI RISING?**

Show ranked drivers:

### Strong temperature inversion

**34%**

### Low PBL height

**27%**

### Weak wind

**21%**

### Regional plume transport

**11%**

### High humidity

**7%**

Use horizontal contribution bars.

Then provide a plain-language explanation:

“Stable atmospheric conditions and a shallow planetary boundary layer are expected to restrict vertical mixing. Weak winds may allow transported particulate matter to accumulate over Delhi NCR, increasing near-surface PM2.5 during the morning period.”

Button:

**Explain Forecast**

When clicked, open an expandable scientific explanation panel.

---

# 9. INVERSION MONITOR

Create a dedicated high-importance card.

Title:

## **Atmospheric Inversion Monitor**

Show a vertical atmospheric diagram.

Represent:

Upper air
↓
Warm layer
────────────
**Inversion layer**
────────────
Cold polluted surface air
PM2.5 particles trapped near ground

Show:

Surface temperature:
18°C

850m temperature:
23°C

Inversion strength:
**5°C**

PBL height:
**420 m**

Classification:

🔴 **STRONG INVERSION**

Add a 24-hour chart:

**Inversion Strength vs Time**

Highlight the predicted strongest period.

Example:

**Peak trapping window: 05:00–09:00**

This component should make it obvious to judges that the system is addressing one of the specific mechanisms mentioned in the problem statement.

---

# 10. POLLUTION DISPERSION / PLUME TRACKER

Create a dedicated screen called:

# **Regional Pollution Plume Tracker**

Use a high-quality Delhi NCR regional map.

Include:

Punjab
Haryana
Delhi NCR
Uttar Pradesh
Rajasthan

Show animated / directional pollution plume movement.

Use:

* arrows for wind
* colored concentration plume
* fire/emission source markers
* Delhi NCR receptor area
* monitoring stations

Example source:

### Regional Crop Residue Burning Activity

Detected source clusters:
**Punjab + Haryana**

Plume direction:
**SE**

Estimated Delhi NCR arrival:
**10–14 hours**

Transport confidence:
**78%**

Add a timeline slider:

**NOW → +6H → +12H → +24H → +48H**

When slider changes, the plume position should change.

Make the plume visualization one of the strongest visual features of the entire MVP.

---

# 11. “TRACE THE POLLUTION” FEATURE

Add a major button:

## **TRACE POLLUTION SOURCE**

When clicked, show:

**Delhi NCR PM2.5 increase**

↓

**Regional transport detected**

↓

**Upwind source region**

↓

**Punjab/Haryana emission cluster**

↓

**Wind trajectory**

↓

**Delhi NCR arrival window**

Show the trajectory as an animated map path.

Add:

### Source Contribution Estimate

Local emissions:
**46%**

Regional transport:
**38%**

Other background:
**16%**

Clearly label this as:

**Prototype estimate — not an official emissions inventory.**

---

# 12. POLLUTION MAP

Create:

# **Delhi NCR Pollution Intelligence Map**

Map should contain:

Delhi
Noida
Ghaziabad
Gurugram
Faridabad

Display:

* AQI heatmap
* PM2.5 concentration
* monitoring stations
* forecast grid
* hotspot boundaries
* plume direction

Controls:

### Pollutant

PM2.5
PM10
O₃
NOx
AQI

### Time

Now
+24H
+48H
+72H

### Layer

Observed
Forecast
Plume
Inversion
PBL

Make these controls actually change the visual state in the prototype.

---

# 13. HOTSPOT PREDICTION

Create:

## **Emerging Pollution Hotspots**

Rank locations based on predicted deterioration rather than just current AQI.

Example:

### 01 — Anand Vihar

Current:
AQI 365

Forecast:
AQI 448

Change:
+23%

Risk:
**SEVERE**

Primary driver:
**Low PBL + traffic + regional transport**

---

### 02 — Ghaziabad

Current:
AQI 341

Forecast:
AQI 421

Change:
+19%

---

### 03 — Noida

Current:
AQI 298

Forecast:
AQI 377

Change:
+16%

---

Add:

**Why these locations?**

Explain that predicted hotspots depend on local emissions, meteorological trapping, transport and atmospheric mixing.

---

# 14. 72-HOUR SCENARIO ANALYSIS

This is a powerful feature for judges.

Create:

# **What-If Scenario Simulator**

Allow users to modify:

Wind speed
Humidity
PBL height
Regional emissions
Temperature

Example:

### Scenario A

**Current conditions**

AQI peak:
428

### Scenario B

**Wind +2 m/s**

AQI peak:
351

### Scenario C

**Regional emissions +30%**

AQI peak:
469

### Scenario D

**Stronger inversion**

AQI peak:
452

Show these scenarios on one comparison graph.

Add a disclaimer:

**Scenario outputs are model estimates for decision support, not official forecasts.**

---

# 15. EARLY WARNING ENGINE

Create a major section:

# **EARLY WARNING CENTER**

Example:

🔴 **SEVERE POLLUTION EVENT PREDICTED**

Area:
East Delhi + Ghaziabad

Forecast window:
Tomorrow
05:00–11:00

Expected AQI:
**410–450**

Confidence:
**87%**

Drivers:

Strong inversion
Low PBL
Weak winds
Regional PM2.5 transport

Status:

### **PRE-ALERT**

Buttons:

**Generate Advisory**

**View Impact Zone**

**Trace Cause**

---

# 16. AUTOMATIC ADVISORY GENERATOR

Clicking “Generate Advisory” should open a modal.

Title:

## **AI-Generated Pollution Advisory**

Generate a professional advisory containing:

* affected region
* forecast window
* expected AQI
* dominant pollutants
* atmospheric conditions
* confidence
* contributing factors
* recommended precautionary actions

Provide buttons:

**Edit**
**Approve**
**Export PDF**
**Share**

Clearly label:

**AI-generated draft — requires authorized review before publication.**

---

# 17. ROLE-BASED ACTIONS

Create three stakeholder views:

### GOVERNMENT / AUTHORITIES

Show:

* hotspot alerts
* pollution source tracking
* predicted peak windows
* intervention planning
* regional transport
* forecast confidence

### RESEARCHER / METEOROLOGIST

Show:

* model variables
* inversion profiles
* PBL
* chemical species
* forecast uncertainty
* station comparison
* model diagnostics

### CITIZEN

Show:

* local AQI
* 72-hour outlook
* peak pollution times
* simple health/safety guidance
* location-based alerts

The underlying scientific engine remains the same; only the presentation changes.

---

# 18. MODEL VALIDATION SCREEN

Create:

# **Forecast Verification**

This screen is extremely important for credibility.

Show:

### Forecast vs Observation

Graph:

Observed PM2.5
vs
Predicted PM2.5

Across the previous 72 hours.

Show metrics:

PM2.5 MAE
**XX µg/m³**

RMSE
**XX µg/m³**

AQI correlation
**XX**

Forecast bias
**XX**

24H skill
**XX**

48H skill
**XX**

72H skill
**XX**

Do NOT fabricate performance numbers.

Use:

**Demo metric**
or
**Not evaluated**

until actual validation data is connected.

This is critical because the product should never pretend that a prototype has accuracy that has not been measured.

---

# 19. DATA PIPELINE SCREEN

Create a visual technical architecture page.

Title:

# **Data → Coupling → Forecast → Decision**

Show:

### DATA INGESTION

Ground monitoring
Weather observations
NWP fields
Satellite / remote sensing
Emission estimates
Regional fire activity

↓

### DATA PROCESSING

Quality control
Missing-value handling
Spatial interpolation
Temporal synchronization

↓

### COUPLING ENGINE

Meteorology

Temperature
Wind
PBL
Humidity

↕

Chemistry

PM2.5
PM10
O₃
NOx

↓

### FORECAST ENGINE

72-hour forecast

↓

### ANALYTICS

Inversion detection
Plume tracking
Hotspot prediction
Uncertainty
Attribution

↓

### DECISION SUPPORT

Alerts
Advisories
Maps
Recommendations

This screen should make the project technically understandable to a judge.

---

# 20. DATA SOURCE TRANSPARENCY

Create a dedicated section:

## **Data Provenance**

For every dataset display:

Source
Timestamp
Spatial resolution
Temporal resolution
Quality status

Use statuses:

🟢 Available
🟡 Delayed
🔴 Missing

Never create fake “LIVE CPCB” or “LIVE IMD” labels.

For the MVP, explicitly show:

### **DEMO MODE**

“Prototype interface currently uses simulated/sample data. Production deployment will connect validated meteorological, air-quality and emissions datasets.”

This makes the product credible instead of pretending.

---

# 21. NOTIFICATION SYSTEM

Create notifications for:

* severe AQI forecast
* inversion strengthening
* plume approaching Delhi NCR
* hotspot deterioration
* forecast confidence changes
* data-quality problems

Example:

### 🔴 08:42 PM

**Plume arrival risk increased**

Regional PM2.5 transport toward Delhi NCR has strengthened.

Expected arrival:
**+10 hours**

Confidence:
**78%**

---

# 22. INTERACTIVE PROTOTYPE BEHAVIOUR

Make the Figma prototype genuinely clickable.

Implement these interactions:

### Dashboard

Click **72H Forecast**
→ Forecast Explorer

### Map

Click a hotspot
→ Location details

### Forecast

Click +24H / +48H / +72H
→ Update forecast state

### Pollutant selector

Click PM2.5 / PM10 / O₃ / NOx
→ Update graph

### Inversion Monitor

Click inversion event
→ Open atmospheric profile

### Plume Tracker

Move timeline slider
→ Plume location changes

### Trace Pollution

Click
→ Animated source-to-receptor pathway

### Why AQI?

Click
→ Explainable AI panel

### Early Warning

Click
→ Alert details

### Generate Advisory

Click
→ Advisory modal

### Scenario Simulator

Modify variables
→ Show scenario comparison

### Model Validation

Click forecast point
→ Show predicted vs observed value

---

# 23. LOADING / ERROR / UNCERTAINTY STATES

Do not design only perfect screens.

Create realistic:

* Loading state
* Data unavailable
* Delayed sensor
* Forecast uncertainty high
* Model unavailable
* Map loading
* Missing station data
* Warning acknowledgement

Example:

### Forecast confidence reduced

“Regional emissions data has not updated in the last 6 hours. Forecast uncertainty has increased.”

Confidence:
**61%**

This will make the product feel operational rather than fictional.

---

# 24. RESPONSIVENESS

Design:

### Desktop

Primary target:
1440 × 900

### Tablet

1024 × 768

### Mobile

390 × 844

Mobile should prioritize:

Current AQI
72-hour forecast
Local hotspot
Warning
Simple explanation

Do not attempt to squeeze the entire scientific dashboard onto mobile.

---

# 25. COMPONENT SYSTEM

Create reusable Figma components for:

* AQI cards
* Pollutant cards
* Forecast cards
* Weather cards
* Alert banners
* Map markers
* Plume markers
* Timeline controls
* Chart tooltips
* Confidence badges
* Status indicators
* Buttons
* Tabs
* Modals
* Data-source badges
* Stakeholder cards

Use Auto Layout and reusable variants.

---

# 26. MICRO-INTERACTIONS

Use subtle professional animations:

* Map layer transition
* Forecast timeline transition
* AQI card update
* Plume movement
* Alert appearance
* Chart hover
* Tooltip
* Expand/collapse explanation
* Scenario comparison

Avoid flashy animations.

The interface should feel like a **mission-control system**, not a gaming dashboard.

---

# 27. FIRST 30-SECOND JUDGE EXPERIENCE

Optimize the prototype around this exact demo sequence:

### STEP 1

Judge sees:

**AQI is currently 287.**

### STEP 2

System says:

**AQI may reach 428 within 24 hours.**

### STEP 3

System explains:

**Strong inversion + low PBL + weak winds are trapping pollution.**

### STEP 4

System shows:

**Regional plume moving toward Delhi NCR.**

### STEP 5

System identifies:

**Anand Vihar / Ghaziabad as emerging hotspots.**

### STEP 6

System predicts:

**Peak pollution window: 05:00–11:00.**

### STEP 7

System generates:

**An early-warning advisory for authorities.**

The entire product should make this story effortless to understand.

---

# 28. IMPORTANT SCIENTIFIC INTEGRITY

Do NOT present the prototype as if it has already achieved operational WRF-Chem-level forecasting.

The UI should distinguish:

**Observed**
**Forecast**
**Simulated**
**Derived**
**Model estimate**
**Confidence**

If a value has not been scientifically validated, do not display it as an established fact.

The MVP is demonstrating the **architecture, workflow, decision-support experience and coupled-model concept**.

---

# 29. FINAL DESIGN GOAL

When a SIH judge opens the prototype, they should immediately think:

> “This isn't another AQI app.”

They should understand:

> “This system is trying to understand the atmospheric mechanism behind Delhi's pollution, forecast the next 72 hours, identify where pollution will move, explain why the spike is happening, quantify uncertainty, and convert the prediction into an actionable early warning.”

The final product should visually communicate:

## **WE DON'T JUST PREDICT AQI.**

## **WE PREDICT THE ATMOSPHERIC CONDITIONS THAT CREATE IT.**

Build the Figma MVP as a **complete end-to-end operational prototype**, not a collection of disconnected screens.

Prioritize:
**scientific credibility + usability + explainability + spatial intelligence + early warning + decision support.**
