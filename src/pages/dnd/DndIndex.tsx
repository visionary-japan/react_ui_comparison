import { Link } from 'react-router-dom';

export function DndIndex() {
    return (
        <div id='wrap'>
            <ul>
                <li>
                    <Link to='/dnd/pointer'>DnD Pointer</Link>
                </li>
                <li>
                    <Link to='/dnd/htmlapi'>DnD HTML5 API</Link>
                </li>
                <li>
                    <Link to='/dnd/sortablejs'>DnD Sortable.js</Link>
                </li>
            </ul>
        </div>
    );
}
