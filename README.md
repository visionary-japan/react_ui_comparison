# 使用方法

## DnD

以下の記事を参照:

https://qiita.com/nyarlathotep/private/451181c4f2e53a8e4298

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

---

# 環境構築

## ライブラリ

### インストール

```
npm install
```

## VSCODE

### 拡張機能

`.vscode\extensions.json`

- JavaScript and TypeScript Nightly
- Biome

## 起動

以下のコマンドでローカル起動できる。

```
npm run dev
```

以下のコマンドで `dist` ディレクトリにビルド内容が出力される。

```
num run build
```

## 配置

Push したら Git が勝手にやってくれる

`.github\workflows\pages.yml`

https://visionary-japan.github.io/react_ui_comparison/
