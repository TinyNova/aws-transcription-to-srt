module.exports = {
    "env": {
        "node": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "globals": {
        "module": true,
        "setImmediate": true,
        "require": true,
        "__dirname": true,
        "process": true,
        "Buffer": true,
        "Promise": true
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "eol-last": ["error", "always"],
        // disable rules from base configurations
        "no-console": "off",
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        "no-unused-expressions": ["error", {
            "allowShortCircuit": true,
            "allowTernary": true,
            "allowTaggedTemplates": true
        }],
    }
};
