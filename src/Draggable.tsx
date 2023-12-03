import React, { useRef, useState } from 'react';
import { DragData } from './App';
import './App.css';

const color = 'red';

interface Props {
    handleDrag: (props: DragData) => void;
}
export function Draggable(props: Props) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);

    const handlePointerDown = (event: React.PointerEvent) => {
        if (!ref.current) return;
        ref.current.style.backgroundColor = color;
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setOffset({ x, y });
        props.handleDrag({
            x,
            y,
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
            color,
        });
    };
    const handlePointerMove = (event: React.PointerEvent) => {
        if (!(isDragging && ref.current)) return;
        const x = event.clientX - offset.x;
        const y = event.clientY - offset.y;
        ref.current.style.left = `${x}px`;
        ref.current.style.top = `${y}px`;
        props.handleDrag({
            x,
            y,
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
            color,
        });
    };
    const handlePointerUp = () => {
        if (!(isDragging && ref.current)) return;
        setIsDragging(false);
        ref.current.style.backgroundColor = 'white';
    };

    return (
        <div
            ref={ref}
            id='drag-vite'
            className='drag-wrap'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        />
    );
}
