// 書き込み可能な型
export type Writable<T> = { -readonly [K in keyof T]: T[K] };

// 座標
export interface Coordinate {
    x: number;
    y: number;
}

interface Config {
    keyString: string;
}

export interface Configs {
    [id: string]: Config;
}

declare global {
    interface Window {
        configs: Configs;
    }
}

declare module '/js/configs.js' {
    export const EXPORT_CONFIGS: Configs;
}

export interface JsonConfigs {
    [id: string]: Config[];
}
