import React, { useRef, useState } from 'react';
import './Drag.css';
import { Dragdata, DragdataStatic, location } from './configs';

interface Props {
    dragdataDynamic: Dragdata;
    dragdataStatic: DragdataStatic;
    handleDragStart: (id: string) => void;
    handleDrag: (props: Dragdata) => void;
}
export function Drag(props: Props) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [offset, setOffset] = useState<location>({ x: 0, y: 0 });

    const ref = useRef<HTMLDivElement>(null);

    const handlePointerDown = (event: React.PointerEvent) => {
        event.preventDefault();
        if (!ref.current) return;
        ref.current.classList.add('dragging');
        setIsDragging(true);
        event.currentTarget.setPointerCapture(event.pointerId);
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.x;
        const y = event.clientY - rect.y;
        props.handleDrag({
            clientX: event.clientX,
            clientY: event.clientY,
            location: rect,
            size: rect,
        });
        setOffset({ x, y });
        props.handleDragStart(props.dragdataStatic.id);
    };
    const handlePointerMove = (event: React.PointerEvent) => {
        event.preventDefault();
        if (!(isDragging && ref.current)) return;
        const x = event.clientX - offset.x;
        const y = event.clientY - offset.y;
        ref.current.style.left = `${x}px`;
        ref.current.style.top = `${y}px`;
        const rect = ref.current.getBoundingClientRect();
        props.handleDrag({
            clientX: event.clientX,
            clientY: event.clientY,
            location: {
                x,
                y,
            },
            size: rect,
        });
    };
    const handlePointerUp = () => {
        if (!(isDragging && ref.current)) return;
        setIsDragging(false);
        ref.current.classList.remove('dragging');
    };

    return (
        <div
            ref={ref}
            id={props.dragdataStatic.id}
            className='drag-wrap'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        />
    );
}
