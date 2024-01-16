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

    const castStrToNum = (s: string) => {
        switch (s) {
            case 'NaN':
                return NaN;
            default:
                return Number(s);
        }
    };

    useEffect(() => {
        setStr(getParam('str'));
        setNum(castStrToNum(getParam('num')));
    }, [getParam]);

    const onChangeParams = (newStr: string, newNum: number) => {
        setSearchParams({ str: newStr, num: String(newNum) });
    };

    return { str, num, onChangeParams, castStrToNum };
}
