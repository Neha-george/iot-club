# IoT Club - Main Website

This is the landing page for the IoT Club, located at `apps/main`.

## 🖼️ Legacy Execom Images Setup
The site expects images to be in specific folders matching the structure in `src/data/execomData.js`.

### 1. Copy Images
Paste your legacy photos into `src/assets/execom/` following this structure:

```text
src/assets/execom/
├── core/
│   ├── Devadathan-S2CSE.jpg
│   └── Rahul-S3ECE.jpg
├── technical/
│   ├── Alan-S4EEE.jpg
│   └── ...
├── design/
│   └── ...
└── media/
    └── ...
```

### 2. Update Data
If you have different members, update `src/data/execomData.js`.
The `name` and `class` fields in the data MUST match the filename:
`{ name: 'Devadathan', class: 'S2CSE' }` -> looks for `Devadathan-S2CSE.jpg`.

## 🚀 Development
Run from the monorepo root:
```bash
npm run dev -w apps/main
```
