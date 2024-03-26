import * as stylex from '@stylexjs/stylex';
import { Button } from '../../components/button/Button';
import { useQuery } from '../../hooks/useQuery';

const styles = stylex.create({
    base: {
        display: 'flex',
        gap: 8,
        margin: 8,
    },
});

export function Query() {
    const { str, num, onChangeParams } = useQuery();

    return (
        <>
            <ul>
                <li>str: &quot;{str}&quot;</li>
                <li>num: {num}</li>
            </ul>
            <div {...stylex.props(styles.base)}>
                <Button
                    type='button'
                    onClick={() => {
                        onChangeParams(str + 1, num);
                    }}
                >
                    str + 1
                </Button>
                <Button
                    type='button'
                    onClick={() => {
                        onChangeParams(str.replace(/1(?!.*1)/, ''), num);
                    }}
                >
                    str - 1
                </Button>
            </div>
            <div {...stylex.props(styles.base)}>
                <Button
                    type='button'
                    onClick={() => {
                        onChangeParams(str, num + 1);
                    }}
                >
                    num + 1
                </Button>
                <Button
                    type='button'
                    onClick={() => {
                        onChangeParams(str, num - 1);
                    }}
                >
                    num - 1
                </Button>
            </div>
        </>
    );
}
