import { Link } from 'react-router-dom';
import ButtonZenn from '../../components/button/ButtonZenn';
import './Btn.css';

export function Btn() {
    return (
        <div id='wrap'>
            <div>
                <h1>Zenn Button</h1>
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
            </div>
        </div>
    );
}
