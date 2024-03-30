import { Link } from 'react-router-dom';
import { ButtonVite } from '../../components/button/ButtonVite';
import { ButtonZenn } from '../../components/button/ButtonZenn';
import { DivCustom } from '../../components/div/DivCustom';
import { H1 } from '../../components/heading/H1';
import { H2 } from '../../components/heading/H2';

export function Btn() {
    return (
        <div>
            <H1>Zenn Button</H1>
            <p>
                <a href='https://zenn.dev/kiyoshiro9446/scraps/46b4e4be23bcde'>
                    https://zenn.dev/kiyoshiro9446/scraps/46b4e4be23bcde
                </a>
            </p>
            <DivCustom styleTypes={['margin']}>
                <H2>普通にbuttonタグとして使う</H2>
                <ButtonZenn variant='primary'>普通のボタン</ButtonZenn>
            </DivCustom>
            <DivCustom styleTypes={['margin']}>
                <H2>aタグとして振る舞う</H2>
                <ButtonZenn variant='primary' asChild>
                    <a href='dnd'>Dnd</a>
                </ButtonZenn>
            </DivCustom>
            <DivCustom styleTypes={['margin']}>
                <H2>Linkとして振る舞う</H2>
                <ButtonZenn variant='primary' asChild>
                    <Link to='dnd'>Dnd</Link>
                </ButtonZenn>
            </DivCustom>
            <DivCustom styleTypes={['margin']}>
                <H2>イチオシ挙動</H2>
                <ButtonZenn disabled asChild>
                    <a href='dnd'>Dnd</a>
                </ButtonZenn>
            </DivCustom>
            <H1>Vite Default Button</H1>
            <ButtonVite>Vite</ButtonVite>
        </div>
    );
}
