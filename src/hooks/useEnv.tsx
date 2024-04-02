import { castStrToBoolean } from '../utils/castStrToBoolean';
import { castStrToNum } from '../utils/castStrToNum';

export function useEnv() {
    // Viteの場合はimport.meta.env.を使用
    const ROOT_NAME: string = import.meta.env.VITE_ROOT_NAME || 'RN';
    const ANY_NUMBER: number = castStrToNum(
        import.meta.env.VITE_ANY_NUMBER || '123',
    );
    const IS_PROD: boolean = castStrToBoolean(import.meta.env.VITE_IS_PROD);

    return { ROOT_NAME, ANY_NUMBER, IS_PROD };
}
