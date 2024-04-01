import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQuery() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [str, setStr] = useState<string>('');
    const [num, setNum] = useState<number>(0);

    const getParam = useCallback(
        (key: string) => {
            return searchParams.get(key) || '';
        },
        [searchParams],
    );

    const castStrToNum = useCallback((s: string) => {
        switch (s) {
            case 'NaN':
                return Number.NaN;
            default:
                return Number(s);
        }
    }, []);

    useEffect(() => {
        setStr(getParam('str'));
        setNum(castStrToNum(getParam('num')));
    }, [getParam, castStrToNum]);

    const handleChangeParams = useCallback(
        (newStr: string, newNum: number) => {
            setSearchParams({ str: newStr, num: String(newNum) });
        },
        [setSearchParams],
    );

    return { str, num, castStrToNum, handleChangeParams };
}
