import React from 'react';
import { ReactSortable } from 'react-sortablejs';
import './DndSortablejs.css';

const draggableList = [
    {
        id: 'Mike',
        name: 'Mike',
    },
    {
        id: 'Michael',
        name: 'Michael',
    },
    {
        id: 'Mason',
        name: 'Mason',
    },
    {
        id: 'Miller',
        name: 'Miller',
    },
    {
        id: 'Milner',
        name: 'Milner',
    },
    {
        id: 'Merry',
        name: 'Merry',
    },
];

export function DndSortablejs() {
    const [list, setList] = React.useState(draggableList);

    return (
        <div className='app'>
            <h1>
                Very Simple Draggable Stuff <>⚛️</>
            </h1>
            <ReactSortable
                filter='.addImageButtonContainer'
                dragClass='sortableDrag'
                list={list}
                setList={setList}
                animation={200}
                easing='ease-out'
            >
                {list.map(item => (
                    <div key={item.name} className='draggable'>
                        {item.name}
                    </div>
                ))}
            </ReactSortable>
        </div>
    );
}
