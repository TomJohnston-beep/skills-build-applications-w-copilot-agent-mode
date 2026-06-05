/// <reference types="vite/client" />

declare global {
  interface ImportMetaEnv {
    readonly VITE_CODESPACE_NAME?: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
