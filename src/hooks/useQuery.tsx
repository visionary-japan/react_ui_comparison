import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { castStrToNum } from '../utils/castStrToNum';

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

    useEffect(() => {
        setStr(getParam('str'));
        setNum(castStrToNum(getParam('num')));
    }, [getParam]);

    const handleChangeParams = useCallback(
        (newStr: string, newNum: number) => {
            setSearchParams({ str: newStr, num: String(newNum) });
        },
        [setSearchParams],
    );

    return { str, num, castStrToNum, handleChangeParams };
}
