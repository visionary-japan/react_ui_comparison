import { type FC, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ButtonVite } from '../components/button/ButtonVite';
import { ButtonZenn } from '../components/button/ButtonZenn';
import { DivCustom } from '../components/div/DivCustom';
import { H1 } from '../components/heading/H1';
import { H2 } from '../components/heading/H2';
import { H3 } from '../components/heading/H3';

const Component: FC = () => {
    const handleClickButtonVite = useCallback(() => {
        alert('Vite最高!');
    }, []);

    return (
        <div>
            <H1>Buttons</H1>
            <DivCustom styleTypes={['margin']}>
                <H2>Zennの記事を参考</H2>
                <p>
                    <a href='https://zenn.dev/kiyoshiro9446/scraps/46b4e4be23bcde'>
                        https://zenn.dev/kiyoshiro9446/scraps/46b4e4be23bcde
                    </a>
                </p>

                <DivCustom styleTypes={['margin']}>
                    <H3>普通にbuttonタグとして使う</H3>
                    <DivCustom styleTypes={['margin']}>
                        <ButtonZenn variant='primary'>普通のボタン</ButtonZenn>
                    </DivCustom>
                </DivCustom>

                <DivCustom styleTypes={['margin']}>
                    <H3>aタグとして振る舞う</H3>
                    <DivCustom styleTypes={['margin']}>
                        <ButtonZenn variant='primary' asChild>
                            <a href='./btn'>Btn</a>
                        </ButtonZenn>
                    </DivCustom>
                </DivCustom>

                <DivCustom styleTypes={['margin']}>
                    <H3>Linkとして振る舞う</H3>
                    <DivCustom styleTypes={['margin']}>
                        <ButtonZenn variant='primary' asChild>
                            <Link to=''>Btn</Link>
                        </ButtonZenn>
                    </DivCustom>
                </DivCustom>

                <DivCustom styleTypes={['margin']}>
                    <H3>イチオシ挙動</H3>
                    <DivCustom styleTypes={['margin']}>
                        <ButtonZenn disabled asChild>
                            <a href='dnd'>Dnd</a>
                        </ButtonZenn>
                    </DivCustom>
                </DivCustom>
            </DivCustom>

            <DivCustom styleTypes={['margin']}>
                <H2>ViteのButton</H2>
                <DivCustom styleTypes={['margin']}>
                    <ButtonVite onClick={handleClickButtonVite}>
                        Vite
                    </ButtonVite>
                </DivCustom>
            </DivCustom>
        </div>
    );
};

export const Button = memo(Component);
