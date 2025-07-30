module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        '@nuxt/eslint-config',
        'plugin:prettier/recommended'
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
    },
}
