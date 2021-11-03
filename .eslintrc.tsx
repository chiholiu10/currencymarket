module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  "rules": {
    "indent": 'off',
    "consistent-return": 2,
    "semi": [2, "always"],
    "no-mixed-spaces-and-tabs": 0,
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "unused-imports/no-unused-imports": "error"
  },
  "plugins": ['react', 'unused-imports'],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 9,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },
  "settings": {
    "react": {
      "createClass": "createReactClass",
      "pragma": "React",
      "fragment": "Fragment",
      "version": "detect",
      "flowVersion": "0.53"
    },
  },
  "env": {
    "browser": true,
    "jest": true,
    "node": true 
  },
};