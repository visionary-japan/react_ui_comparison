import stylex from '@stylexjs/stylex';
import { type FC, memo, useState } from 'react';
import logoVite from '/vite.svg';
import logoReact from '../assets/react.svg';
import { ButtonVite } from '../components/button/ButtonVite';
import { DivCustom } from '../components/div/DivCustom';
import { H1 } from '../components/heading/H1';
import { Logo } from '../components/image/Logo';
import { LinkIndex } from '../components/link/LinkIndex';

const viteLogoStyles = stylex.create({
    img: {
        filter: { ':hover': 'drop-shadow(0 0 2em #646cffaa)' },
    },
});
const reactLogoStyles = stylex.create({
    img: {
        filter: { ':hover': 'drop-shadow(0 0 2em #61dafbaa)' },
    },
});

const Component: FC = () => {
    const [count, setCount] = useState<number>(0);

    const handleClickButton = () => {
        setCount(count => count + 1);
    };

    return (
        <div>
            <H1>{(import.meta.env.VITE_BASE_PATH as string).toUpperCase()}</H1>
            <DivCustom styleTypes={['flexCenter']}>
                <Logo
                    url='https://vitejs.dev'
                    src={logoVite}
                    alt='Vite Logo'
                    styles={viteLogoStyles}
                />
                <Logo
                    url='https://react.dev'
                    src={logoReact}
                    alt='React Logo'
                    styles={reactLogoStyles}
                />
            </DivCustom>
            <DivCustom styleTypes={['center']}>
                <ButtonVite type='button' onClick={handleClickButton}>
                    count is {count}
                </ButtonVite>
            </DivCustom>
            <LinkIndex />
        </div>
    );
};

export const Index = memo(Component);
