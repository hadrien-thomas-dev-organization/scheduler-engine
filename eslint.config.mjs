import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: [
      "src/**/*.ts"
    ]
  },
  {
    ignores: [
      ".stryker-tmp/",
      "node_modules/",
      "dist/",
      "coverage/",

    ]
  },
);