import { useEffect, useRef, useState } from 'react';
import { DragData } from './App';

interface Props {
    dragData: DragData | null;
}
export const Droppable = (props: Props) => {
    const dropRef = useRef<HTMLDivElement>(null);
    const [isOver, setIsOver] = useState(false);

    useEffect(() => {
        if (props.dragData) {
            if (!dropRef.current) return;
            const { x, y, width, height } = props.dragData;
            const centerX = x + width / 2;
            const centerY = y + height / 2;
            const dropRect = dropRef.current.getBoundingClientRect();

            const over =
                centerX >= dropRect.left &&
                centerX <= dropRect.right &&
                centerY >= dropRect.top &&
                centerY <= dropRect.bottom;
            setIsOver(over);
        }
    }, [props.dragData]);

    return (
        <div
            ref={dropRef}
            style={{
                width: '300px',
                height: '300px',
                border: isOver
                    ? `2px dashed ${props.dragData?.color}`
                    : '2px dashed gray',
                position: 'relative',
                overflow: 'hidden',
            }}
        />
    );
};
