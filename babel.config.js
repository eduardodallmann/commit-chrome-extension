/**
 * @type {import('@babel/core').TransformOptions}
 */
const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: { version: '3.35', shippedProposals: true },
      },
    ],
    '@babel/preset-typescript',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.NODE_ENV !== 'production',
      },
    ],
  ],
};

module.exports = config;
