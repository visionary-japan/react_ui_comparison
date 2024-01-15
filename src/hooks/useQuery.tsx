import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useQuery() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [str, setStr] = useState<string>('');
    const [num, setNum] = useState<number>(0);

    useEffect(() => {
        const newStr = searchParams.get('str');
        const newNum = searchParams.get('num');
        setStr(newStr || '');
        setNum(Number(newNum) || 0); // TODO ただのNumberキャストはどうなん
    }, [searchParams]); // TODO strとnumでのみを追跡すればいいはず

    const onChangeParams = (newStr: string, newNum: number) => {
        setSearchParams({ str: newStr, num: String(newNum) });
    };

    return { str, num, onChangeParams };
}
