import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Базовые рекомендации
  pluginJs.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // React (явно подключаем конфиг и настройки)
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // React Hooks
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },

  // Simple Import Sort + Кастомные правила
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'simple-import-sort': pluginSimpleImportSort,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',

      // Правила сортировки
      'simple-import-sort/imports': [
        'warn', // Лучше использовать 'warn', чтобы сборка не падала, но в IDE было видно
        {
          groups: [
            // 1. Внешние библиотеки
            ['^react', '^@?\\w'],
            // 2. Абсолютные алиасы (FSD)
            ['^app', '^pages', '^features', '^entities', '^shared'],
            // 3. Относительные импорты
            ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 4. Стили
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
  eslintConfigPrettier,
];
