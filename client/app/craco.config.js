const path = require("path");
const enableImportsFromExternalPaths = require("./src/helpers/craco/enableImportsFromExternalPaths");

module.exports = {
  plugins: [
    {
      plugin: {
        overrideWebpackConfig: ({ webpackConfig }) => {
          enableImportsFromExternalPaths(webpackConfig, [
            path.resolve(__dirname, "../"),
          ]);
          return webpackConfig;
        },
      },
    },
  ],
};
