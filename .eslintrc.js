module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    quotes: ["error", "double", { "allowTemplateLiterals": true, "avoidEscape": true }],
    indent: ["error", 4],
    semi: ["error", "always"],
    "@typescript-eslint/member-delimiter-style": ["error", {
      multiline: {
        delimiter: 'comma',
        requireLast: true,
      },
      singleline: {
        delimiter: 'comma',
        requireLast: false,
      },
      overrides: {
        interface: {
          multiline: {
            delimiter: "semi",
            requireLast: true
          }
        }
      }
    }],
  }
};
