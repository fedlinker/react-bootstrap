const path = require("path");
exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "../src/components"), "node_modules"],
      alias: {
        "@": path.resolve(__dirname, "../src/components"),
      },
    },
  });
};
