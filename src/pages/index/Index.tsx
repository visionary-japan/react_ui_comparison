import React from 'react';
import { Link } from 'react-router-dom';
import { Vite } from '../../components/Vite/Vite';

const MemoDefaults = React.memo(Vite);

export function Index() {
    return (
        <div id='wrap'>
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
                                <Link to='/dnd/htmlapi'>DnD HTML5 API</Link>
                            </li>
                            <li>
                                <Link to='/dnd/sortablejs'>
                                    DnD Sortable.js
                                </Link>
                            </li>
                        </ul>
                        <li>
                            <Link to='/btn'>Btn</Link>
                        </li>
                        <li>
                            <Link to='/query'>Query</Link>
                        </li>
                        <li>Scroll</li>
                        <ul>
                            <li>Normal Scroll</li>
                            <li>Smooth Scroll</li>
                        </ul>
                    </ul>
                </ul>
            </div>
        </div>
    );
}
