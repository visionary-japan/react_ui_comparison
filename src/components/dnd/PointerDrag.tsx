import stylex from '@stylexjs/stylex';
import type { FC, PointerEvent } from 'react';
import { memo, useRef, useState } from 'react';
import type { Location } from '../../@types';
import type { DragData, DropData } from '../../pages/dnd/config';

const width = 72;
const height = 72;

const styles = stylex.create({
    base: {
        position: 'absolute',
        touchAction: 'none',
        width: width,
        height: height,
        cursor: 'pointer',
        opacity: 0.75,
        willChange: 'left, top, filter, opacity',
    },
    dragging: {
        filter: 'drop-shadow(0 0 16px black)',
        opacity: 0.9,
    },
});

interface Props {
    id: string;
    dragData: DragData;
    dropData: DropData;
    handleDragStart: (id: string) => void;
    handleDrag: (props: DragData) => void;
}

const Drag: FC<Props> = props => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [locOffset, setLocOffset] = useState<Location>({ x: 0, y: 0 });
    const [locRectLast, setLocRectLast] = useState<Location>({ x: 0, y: 0 });
    const [timeLast, setTimeLast] = useState<number>(0);

    const ref = useRef<HTMLDivElement>(null);

    const handlePointerDown = (event: PointerEvent) => {
        if (!ref.current) return;
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
    const handlePointerMove = (event: PointerEvent) => {
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
            locRect: { x, y },
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
    };

    return (
        <div
            ref={ref}
            className='dnd-pointer-drag-wrap'
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            {...stylex.props(
                styles.base,
                isDragging && styles.dragging,
                props.dropData.dragStyles.base,
                isDragging && props.dropData.dragStyles.dragging,
                props.dropData.dragStyles.image,
            )}
        />
    );
};

export const PointerDrag = memo(Drag);
