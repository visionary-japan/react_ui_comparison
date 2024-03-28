import { Link } from 'react-router-dom';
import { Button } from '../../components/button/ButtonVite';
import ButtonZenn from '../../components/button/ButtonZenn';
import { H1 } from '../../components/heading/H1';

export function Btn() {
    return (
        <div>
            <H1>Zenn Button</H1>
            <p>
                <a href='https://zenn.dev/kiyoshiro9446/scraps/46b4e4be23bcde'>
                    https://zenn.dev/kiyoshiro9446/scraps/46b4e4be23bcde
                </a>
            </p>
            <div>
                <h2>普通にbuttonタグとして使う</h2>
                <ButtonZenn variant='primary'>普通のボタン</ButtonZenn>
            </div>
            <div>
                <h2>aタグとして振る舞う</h2>
                <ButtonZenn variant='primary' asChild>
                    <a href='dnd'>Dnd</a>
                </ButtonZenn>
            </div>
            <div>
                <h2>Linkとして振る舞う</h2>
                <ButtonZenn variant='primary' asChild>
                    <Link to='dnd'>Dnd</Link>
                </ButtonZenn>
            </div>
            <div>
                <h2>イチオシ挙動</h2>
                <ButtonZenn disabled asChild>
                    <a href='dnd'>Dnd</a>
                </ButtonZenn>
            </div>
            <H1>Vite Default Button</H1>
            <Button />
        </div>
    );
}
