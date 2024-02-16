const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const { cypressBrowserPermissionsPlugin } = require('cypress-browser-permissions')

// Implement node event listeners here
async function setupNodeEvents(on, config) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  /**
   * ENV AND FIXTURES CONFIG
   */
  
  // This is to load cupress config per environment
  const environmentName = config.env.configFile || 'development'
  console.log('loading settings for environment: %s', environmentName)
  // The configFile path will change according to environment
  const filePath = `./cypress/config/${environmentName}.json`
  console.log('loading env file: %s', filePath)
  const configFile = require(filePath)
  // Set the config
  if (configFile.baseUrl) {
    config.baseUrl = configFile.baseUrl
  }

  if (configFile.env) {
    config.env = {
      ...config.env,
      ...configFile.env,
    }
  }

  // Browser Permissions for Geolocation and so on
  config = cypressBrowserPermissionsPlugin(on, config)
  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents,
    specPattern: ["cypress/features/**/*.feature", "cypress/features/**/**/*.feature"],
    screenshotsFolder: "cypress/test-reports/screenshots",
    defaultCommandTimeout: 10000,
    includeShadowDom: true
  }
});
