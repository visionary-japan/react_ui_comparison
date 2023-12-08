import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import './DndSortablejs.css';

const draggableList = [
    {
        id: '01',
        name: '01',
    },
    {
        id: '02',
        name: '02',
    },
    {
        id: '03',
        name: '03',
    },
];

export function DndSortablejs() {
    const [list, setList] = React.useState(draggableList);

    return (
        <div id='wrap'>
            <h1>DnD Sortable.js</h1>
            <ReactSortable
                list={list}
                setList={setList}
                animation={200}
                easing='ease-out'
            >
                {list.map(item => (
                    <div key={item.id} className='dnd-sortablejs-draggable'>
                        {item.name}
                    </div>
                ))}
            </ReactSortable>
        </div>
    );
}
