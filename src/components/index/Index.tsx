import React from 'react';
import { Link } from 'react-router-dom';
import { Defaults } from './Defaults';
import './Index.css';

export function Index() {
    const MemoDefaults = React.memo(Defaults);
    return (
        <div>
            <MemoDefaults
                title={(import.meta.env.VITE_BASE_PATH as string).toUpperCase()}
            />
            <nav>
                <ul>
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
