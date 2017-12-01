
let isTravis = process.env.TRAVIS

module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "chai", "karma-typescript"],
    singleRun: isTravis,
    files: [
      // 'test/setup.ts',
      { pattern: "src/**/*.ts" },
      { pattern: "test/**/*.ts" },
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
    reporters: ["progress", "karma-typescript"],
    browsers: isTravis ? ['Chrome_travis_ci'] : ["Chrome"],
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    karmaTypescriptConfig: {
      bundlerOptions: {
        validateSyntax: false,
        sourceMap: true,
        noParse: ['mqtt/dist/mqtt.min'],
      },
      compilerOptions: {
        allowJs: true,
        moduleResolution: 'node',
      }
    }
  });
};
