import React, { useRef, useState } from 'react';
import './Drag.css';
import { DragData, DropData, location } from './configs';

interface Props {
    dragdataDynamic: DragData;
    dragdataStatic: DropData;
    handleDragStart: (id: string) => void;
    handleDrag: (props: DragData) => void;
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
            locScroll: { x: window.scrollX, y: window.scrollY },
            locClient: { x: event.clientX, y: event.clientY },
            locRect: rect,
            sizRect: rect,
        });
        setOffset({ x, y });
        props.handleDragStart(props.dragdataStatic.id);
    };
    const handlePointerMove = (event: React.PointerEvent) => {
        event.preventDefault();
        if (!(isDragging && ref.current)) return;
        const x = event.clientX + window.scrollX - offset.x;
        const y = event.clientY + window.scrollY - offset.y;
        ref.current.style.left = `${x}px`;
        ref.current.style.top = `${y}px`;
        const rect = ref.current.getBoundingClientRect();
        props.handleDrag({
            locScroll: { x: window.scrollX, y: window.scrollY },
            locClient: { x: event.clientX, y: event.clientY },
            locRect: {
                x,
                y,
            },
            sizRect: rect,
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
