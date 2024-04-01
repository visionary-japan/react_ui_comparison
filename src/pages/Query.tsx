import * as stylex from '@stylexjs/stylex';
import { type FC, memo, useCallback } from 'react';
import { ButtonVite } from '../components/button/ButtonVite';
import { H1 } from '../components/heading/H1';
import { useQuery } from '../hooks/useQuery';

const styles = stylex.create({
    base: {
        display: 'flex',
        gap: 8,
        margin: 8,
    },
});

const SUB_STR = '1';
const SUB_NUM = 1;

const Component: FC = () => {
    const { str, num, handleChangeParams } = useQuery();

    const removeLastChar = useCallback((str: string, target: string) => {
        const regex = new RegExp(`${target}(?!.*${target})`);
        return str.replace(regex, '');
    }, []);

    return (
        <>
            <H1>Query</H1>
            <ul>
                <li>str: &quot;{str}&quot;</li>
                <li>num: {num}</li>
            </ul>
            <div {...stylex.props(styles.base)}>
                <ButtonVite
                    type='button'
                    onClick={() => handleChangeParams(str + SUB_STR, num)}
                >
                    str + {SUB_STR}
                </ButtonVite>
                <ButtonVite
                    type='button'
                    onClick={() =>
                        handleChangeParams(removeLastChar(str, SUB_STR), num)
                    }
                >
                    str - {SUB_STR}
                </ButtonVite>
            </div>
            <div {...stylex.props(styles.base)}>
                <ButtonVite
                    type='button'
                    onClick={() => handleChangeParams(str, num + SUB_NUM)}
                >
                    num + {SUB_NUM}
                </ButtonVite>
                <ButtonVite
                    type='button'
                    onClick={() => handleChangeParams(str, num - SUB_NUM)}
                >
                    num - {SUB_NUM}
                </ButtonVite>
            </div>
        </>
    );
};

export const Query = memo(Component);
