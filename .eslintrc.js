module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    // "prettier",
    // "prettier/@typescript-eslint"
  ],
  root: true,
  env: {
    node: true,
    jest: true
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "quotes": ["error", "double"],
    "comma-dangle": ["error", "never"],
    "indent": ["error", 4],
    "brace-style": ["error", "stroustrup"],
    "@typescript-eslint/explicit-member-accessibility": ["error"],
    "no-trailing-spaces": ["error"],
    "semi": ["error", "always"]
  },
};
