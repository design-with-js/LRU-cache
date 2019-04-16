module.exports = {
  env: {
    es6: true,
    jest: true,
    node: true
  },
  rules: {
    "no-undef": "error",
    "no-unused-vars": "warn",
    "no-console": "warn"
  },
  extends: ["eslint:recommended"]
};
