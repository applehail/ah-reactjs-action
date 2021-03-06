module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "no-unused-vars": ["off"],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "no-console": "off",
    "quotes": [
      "error",
      "single"
    ],
    //"semi": [
    //  "error",
    //  "always"
    //],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/react-in-jsx-scope": "error",
    "react/no-unknown-property": ["off", {"ignore": ["class", "for"]}],
  }
};