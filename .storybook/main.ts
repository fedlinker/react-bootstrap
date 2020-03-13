module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [["react-app", { flow: false, typescript: true }]],
      },
    });
    config.resolve.extensions.push(".ts", ".tsx");
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: require.resolve("react-docgen-typescript-loader"),
      exclude: [/node_modules/],
      enforce: "pre",
    });
    return config;
  },
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-docs",
    "@storybook/addon-knobs",
    "@storybook/addon-viewport",
    "@storybook/addon-backgrounds",
    "@storybook/addon-jest",
    "@storybook/addon-storysource",
    "@storybook/addon-a11y",
    "@storybook/addon-options",
    "@storybook/addon-links",
    "@storybook/addon-notes",
    "@storybook/addon-contexts",
  ],
};
