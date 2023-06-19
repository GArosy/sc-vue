module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    // 解决不写后缀报错的问题
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        vue: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      // 解决引入时没后缀查不到的问题
      node: {
        extensions: [
          '.js',
          '.ts',
          '.vue',
        ],
      },
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: [
          '.js',
          '.ts',
          '.vue',
        ],
      },
    },
  },
};
