playwright-pom/
│── playwright.config.ts
│── package.json
│── tsconfig.json
│
├── tests/
│   └── login.spec.ts
│
├── pages/
│   └── LoginPage.ts
│
├── utils/
│   └── testData.ts
│   └── helpers.ts



Run Tests
# Install dependencies
npm init playwright@latest   # choose TypeScript
npm install

# Run tests
npx playwright test