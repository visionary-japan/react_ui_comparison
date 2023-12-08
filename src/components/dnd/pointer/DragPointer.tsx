import React, { useRef, useState } from 'react';
import {
    DragData,
    DropData,
    location,
} from '../../../pages/dnd/pointer/configs';
import './DragPointer.css';

interface Props {
    id: string;
    dragData: DragData;
    dropData: DropData;
    handleDragStart: (id: string) => void;
    handleDrag: (props: DragData) => void;
}
export function Drag(props: Props) {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [locOffset, setLocOffset] = useState<location>({ x: 0, y: 0 });
    const [locRectLast, setLocRectLast] = useState<location>({ x: 0, y: 0 });
    const [timeLast, setTimeLast] = useState<number>(0);

    const ref = useRef<HTMLDivElement>(null);

    const handlePointerDown = (event: React.PointerEvent) => {
        if (!ref.current) return;
        ref.current.classList.add('dnd-pointer-dragging');
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
        setLocOffset({ x, y });
        setLocRectLast({ x, y });
        setTimeLast(Date.now());
        props.handleDragStart(props.id);
    };
    const handlePointerMove = (event: React.PointerEvent) => {
        if (!(isDragging && ref.current)) return;
        const x = event.clientX + window.scrollX - locOffset.x;
        const y = event.clientY + window.scrollY - locOffset.y;
        ref.current.style.left = `${x}px`;
        ref.current.style.top = `${y}px`;
        const rect = ref.current.getBoundingClientRect();
        const time = Date.now();
        const timeDelta = (time - timeLast) / 100;
        props.handleDrag({
            locScroll: { x: window.scrollX, y: window.scrollY },
            locClient: { x: event.clientX, y: event.clientY },
            locRect: {
                x,
                y,
            },
            sizRect: rect,
            locNext: {
                x: x + (x - locRectLast.x) / timeDelta,
                y: y + (y - locRectLast.y) / timeDelta,
            },
        });
        setLocRectLast({ x, y });
        setTimeLast(Date.now());
    };
    const handlePointerUp = () => {
        if (!(isDragging && ref.current)) return;
        setIsDragging(false);
        ref.current.classList.remove('dnd-pointer-dragging');
    };

    return (
        <div
            ref={ref}
            id={props.id}
            className='dnd-pointer-drag-wrap'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        />
    );
}
