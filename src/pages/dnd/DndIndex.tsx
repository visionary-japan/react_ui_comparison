import { Link } from 'react-router-dom';
import './DndIndex.css';

export function DndIndex() {
    return (
        <div>
            <ul>
                <li>
                    <Link to='/dnd/pointer'>DnD Pointer</Link>
                </li>
                <li>
                    <Link to='/dnd/dnd'>DnD HTML5 API</Link>
                </li>
            </ul>
        </div>
    );
}
