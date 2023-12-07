import { Link } from 'react-router-dom';
import './App.css';

export function Index() {
    return (
        <div>
            <h1>React UI Comparison</h1>
            <nav>
                <ul>
                    <ul>
                        <li>{import.meta.env.VITE_BASE_PATH}</li>
                    </ul>
                    <li>
                        <Link to='/'>Index</Link>
                    </li>
                    <ul>
                        <li>
                            <Link to='/dnd'>Drag & Drop</Link>
                        </li>
                    </ul>
                </ul>
            </nav>
        </div>
    );
}
