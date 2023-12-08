import { useEffect, useRef, useState } from 'react';
import {
    DragData,
    DropData,
    dropStyle,
} from '../../../pages/dnd/pointer/configs';
import './DropPointer.css';

interface Props {
    dragData: DragData | null;
    dropData: DropData;
}
export function Drop(props: Props) {
    const [isOver, setIsOver] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (props.dragData && props.dropData) {
            if (!ref.current) return;
            setIsOver(
                props.dropData.isOver(
                    props.dragData,
                    ref.current.getBoundingClientRect(),
                ),
            );
        } else {
            setIsOver(false);
        }
    }, [props.dragData, props.dropData]);

    return (
        <div
            ref={ref}
            className={
                isOver
                    ? 'dnd-pointer-drop dnd-pointer-over'
                    : 'dnd-pointer-drop'
            }
            style={{
                ...dropStyle,
                borderColor: isOver ? props.dropData?.color : 'gray',
            }}
        />
    );
}
