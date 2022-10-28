const path = require("path");
module.exports = {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-react-router-v6",
    "@storybook/preset-scss",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config) => {
    // 절대 경로
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    config.module.rules.push({
      test: /\.scss$/,
      use: [
        {
          loader: "sass-loader",
          options: {
            additionalData: `
            @import "./src/styles/variables/_variables.scss";
            @import "./src/styles/mixins/_mixins.scss";
		  `,
          },
        },
      ],
    });

    return config;
  },
};
