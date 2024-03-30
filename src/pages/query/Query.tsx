import * as stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import { ButtonVite } from '../../components/button/ButtonVite';
import { useQuery } from '../../hooks/useQuery';

const styles = stylex.create({
    base: {
        display: 'flex',
        gap: 8,
        margin: 8,
    },
});

const Component: FC = () => {
    const { str, num, onChangeParams } = useQuery();

    return (
        <>
            <ul>
                <li>str: &quot;{str}&quot;</li>
                <li>num: {num}</li>
            </ul>
            <div {...stylex.props(styles.base)}>
                <ButtonVite
                    type='button'
                    onClick={() => {
                        onChangeParams(str + 1, num);
                    }}
                >
                    str + 1
                </ButtonVite>
                <ButtonVite
                    type='button'
                    onClick={() => {
                        onChangeParams(str.replace(/1(?!.*1)/, ''), num);
                    }}
                >
                    str - 1
                </ButtonVite>
            </div>
            <div {...stylex.props(styles.base)}>
                <ButtonVite
                    type='button'
                    onClick={() => {
                        onChangeParams(str, num + 1);
                    }}
                >
                    num + 1
                </ButtonVite>
                <ButtonVite
                    type='button'
                    onClick={() => {
                        onChangeParams(str, num - 1);
                    }}
                >
                    num - 1
                </ButtonVite>
            </div>
        </>
    );
};

export const Query = memo(Component);
