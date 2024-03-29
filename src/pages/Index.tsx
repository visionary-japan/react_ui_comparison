import stylex from '@stylexjs/stylex';
import { type FC, memo, useState } from 'react';
import logoVite from '/vite.svg';
import logoReact from '../assets/react.svg';
import { Button } from '../components/button/ButtonVite';
import { FlexCenter } from '../components/div/FlexCenter';
import { H1 } from '../components/heading/H1';
import { Logo } from '../components/image/Logo';
import { Links } from '../components/link/Links';

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
            <FlexCenter>
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
            </FlexCenter>
            <H1>{(import.meta.env.VITE_BASE_PATH as string).toUpperCase()}</H1>
            <div style={{ padding: '1em', textAlign: 'center' }}>
                <Button type='button' onClick={handleClickButton}>
                    count is {count}
                </Button>
            </div>
            <Links />
        </div>
    );
};

export const Index = memo(Component);
