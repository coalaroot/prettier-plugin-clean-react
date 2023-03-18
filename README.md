# Prettier Plugin for Clean React

For now it only sorts the objects by key's length but more is coming

## Usage

```
yarn add -D prettier-plugin-clean-react
```

The prettier will automatically detect the plugin.

If you have other plugins, they might be interfering so make sure this plugin is last in prettier config:

For example in `.prettierrc`

```
"plugins": ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-clean-react"]
```
