// 座標
export interface Location {
    x: number;
    y: number;
}

// 大きさ
export interface Size {
    width: number;
    height: number;
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

declare module '/public/js/configs.js' {
    export const EXPORT_CONFIGS: Configs;
}
