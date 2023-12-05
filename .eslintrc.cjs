module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    // TypeScript 관련 규칙
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 함수의 반환 타입 명시 규칙 비활성화 (TypeScript에서는 자동으로 추론되므로 불필요)
    '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 경고

    // React 관련 규칙
    'react/prop-types': 'off', // TypeScript 사용 시 prop-types 검사 불필요
    'react/react-in-jsx-scope': 'off', // Next.js 사용 시 불필요
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }], // JSX 확장자 허용

    // 기타 규칙
    'no-console': 'warn', // 콘솔 사용 경고
    'no-unused-vars': 'off' // 사용하지 않는 변수 경고 비활성화 (TypeScript에서는 자동으로 체크되므로 불필요)
  }
}
