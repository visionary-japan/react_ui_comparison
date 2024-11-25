/// <reference types="vite/client" />

declare module '*.wasm?init' {
    export const init: () => Promise<{
        fibonacci: (n: number) => number;
        memory: WebAssembly.Memory;
    }>;
}
