/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './App.css';
import { Defaults } from './Defaults.tsx';
import { Draggable } from './Draggable.tsx';
import { Droppable } from './Droppable.tsx';

const MemoDefaults = React.memo(Defaults);
const MemoDraggable = React.memo(Draggable);
const MemoDroppable = React.memo(Droppable);

export interface DragData {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

export function App() {
    const [dragData, setDragData] = useState<DragData | null>(null);

    const handleDrag = (props: DragData) => {
        setDragData({
            x: props.x,
            y: props.y,
            width: props.width,
            height: props.height,
            color: props.color,
        });
    };

    return (
        <>
            <MemoDefaults />
            <MemoDroppable dragData={dragData} />
            <MemoDraggable handleDrag={handleDrag} />
        </>
    );
}
