module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb',
        'react-app'
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: [
        'react',
    ],
    rules: {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "react/jsx-indent": ["error", 4],
        "semi": "error",
        "semi-style": ["error", "last"],
        "camelcase": [0, {properties: "never"}],
        "global-require": [0],
        "max-len": ["error", {"code": 120, "tabWidth": 4}],
        "quotes": ["error", "single"],
        "react/jsx-filename-extension": [0],
        "react/jsx-indent-props": [0],
        "react-hooks/exhaustive-deps": [0],
        "import/prefer-default-export": [0]
    },
};
