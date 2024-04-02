import stylex from '@stylexjs/stylex';
import { type FC, memo, useState } from 'react';
import logoVite from '/vite.svg';
import logoReact from '../assets/react.svg';
import { ButtonVite } from '../components/button/ButtonVite';
import { DivCustom } from '../components/div/DivCustom';
import { H1 } from '../components/heading/H1';
import { Logo } from '../components/image/Logo';
import { LinkIndex } from '../components/link/LinkIndex';
import { useEnv } from '../hooks/useEnv';

const styles = stylex.create({
    notProd: {
        display: 'none',
    },
    vite: {
        filter: { ':hover': 'drop-shadow(0 0 2em #646cffaa)' },
    },
    react: {
        filter: { ':hover': 'drop-shadow(0 0 2em #61dafbaa)' },
    },
});

const Component: FC = () => {
    const { ROOT_NAME, ANY_NUMBER, IS_PROD } = useEnv();

    const [count, setCount] = useState<number>(ANY_NUMBER);

    const handleClickButton = () => {
        setCount(count => count + 1);
    };

    return (
        <div>
            <H1>{ROOT_NAME.toUpperCase()}</H1>
            <DivCustom
                styleTypes={['flexCenter']}
                styles={!IS_PROD && styles.notProd}
            >
                <Logo
                    url='https://vitejs.dev'
                    src={logoVite}
                    alt='Vite Logo'
                    styles={styles.vite}
                    isSpin
                />
                <Logo
                    url='https://react.dev'
                    src={logoReact}
                    alt='React Logo'
                    styles={styles.react}
                    isSpin
                />
            </DivCustom>
            <DivCustom styleTypes={['center', 'margin2']}>
                <ButtonVite type='button' onClick={handleClickButton}>
                    count is {count}
                </ButtonVite>
            </DivCustom>
            <LinkIndex />
        </div>
    );
};

export const Index = memo(Component);
