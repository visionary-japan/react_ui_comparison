import { castStrToBoolean } from './castStrToBoolean';
import { castStrToNum } from './castStrToNum';

export function getEnv() {
    // Viteの場合はimport.meta.env.を使用
    const baseUrl: string = import.meta.env.BASE_URL;
    const rootName: string = import.meta.env.VITE_ROOT_NAME || 'RN';
    const anyNumber: number = castStrToNum(
        import.meta.env.VITE_ANY_NUMBER || '123',
    );
    const isProd: boolean = castStrToBoolean(import.meta.env.VITE_IS_PROD);

    return { baseUrl, rootName, anyNumber, isProd };
}
