interface ImportMetaEnv {
    readonly VITE_ROOT_NAME: string;
    readonly VITE_ANY_NUMBER: string;
    readonly VITE_IS_PROD: string;
}

// exportするとimport.meta.envに反映されない
// biome-ignore lint/correctness/noUnusedVariables: <explanation>
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
