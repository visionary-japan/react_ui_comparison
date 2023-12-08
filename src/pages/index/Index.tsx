import React from 'react';
import { Link } from 'react-router-dom';
import { Defaults } from '../../components/default/Vite';
import './Index.css';

const MemoDefaults = React.memo(Defaults);

export function Index() {
    return (
        <div>
            <MemoDefaults
                title={(import.meta.env.VITE_BASE_PATH as string).toUpperCase()}
            />
            <div>
                <ul>
                    <li>
                        <Link to='/'>Index</Link>
                    </li>
                    <ul>
                        <li>
                            <Link to='/dnd'>DnD Index</Link>
                        </li>
                        <ul>
                            <li>
                                <Link to='/dnd/pointer'>DnD Pointer</Link>
                            </li>
                            <li>
                                <Link to='/dnd/dnd'>DnD HTML5 API</Link>
                            </li>
                        </ul>
                        <li>
                            <Link to='/btn'>Btn</Link>
                        </li>
                    </ul>
                </ul>
            </div>
        </div>
    );
}
