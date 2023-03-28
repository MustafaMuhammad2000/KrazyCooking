# Back End Unit Tests
These are tests designed to test the functionality of the backend routes for Krazy Cooking, our final project for SENG 401 - Software Architecture.

# How To Run
1. Make sure to have Node.js installed

2. Install Jest as a development dependency:
`npm install --save-dev jest`

3. Add the following line to the "scripts" section of backend/package.json:
`"test": "node --experimental-vm-modules ./node_modules/jest/bin/jest.js --runInBand"`

4. Install SuperTest `npm install supertest`

5. Run test suite as a whole with `npm test`

6. Optionally run test files individually with `npm test -- unitTests/[name_of_test_file].test.js`