const path = require('path')

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  refs: {
    '@chakra-ui/react': { disabled: true },
  },
  stories: [
    '../packages/components/lib/**/*.stories.mdx',
    '../packages/components/lib/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-performance/register',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
        },
      },
    }
  },
}
