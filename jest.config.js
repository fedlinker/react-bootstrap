module.exports = {
  transformIgnorePatterns: [
    "<rootDir>/(node_modules)/(?!@fedlinker/font-awesome)",
  ],
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
};
