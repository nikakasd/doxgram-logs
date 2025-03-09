import perfectionist from 'eslint-plugin-perfectionist'
import neostandard from 'neostandard'
import tseslint from 'typescript-eslint'

export default [
  {
    ignores: ['**/dist', '**/node_modules'],
  },
  perfectionist.configs['recommended-natural'],
  ...neostandard({
    ignores: neostandard.resolveIgnoresFromGitignore(),
    ts: true,
  }),
  ...tseslint.configs.recommended,
  {
    rules: {
      '@stylistic/comma-dangle': ['error', {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        imports: 'always-multiline',
        objects: 'always-multiline',
        enums: 'always-multiline',
      }],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@stylistic/brace-style': [0, '1tbs', {
        allowSingleLine: true,
      }],
      '@stylistic/indent': ['warn', 2],
      '@typescript-eslint/no-explicit-any': ['off'],

      'no-return-await': ['warn'],

      'no-unused-vars': ['off'],

      'perfectionist/sort-classes': ['warn', {
        groups: [
          'index-signature',
          'static-property',
          'private-property',
          'property',
          'constructor',
          'static-method',
          'private-method',
          'static-private-method',
          ['get-method', 'set-method'],
          'method',
          'unknown',
        ],
      }],

      'perfectionist/sort-enums': ['off'],
      'perfectionist/sort-imports': ['error', {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        internalPattern: ['@/.+'],
      }],
      'perfectionist/sort-interfaces': ['off'],
      'perfectionist/sort-object-types': ['off'],

      'perfectionist/sort-objects': ['off'],
      'perfectionist/sort-union-types': ['off'],
    },
  },
]
