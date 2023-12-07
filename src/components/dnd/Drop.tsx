import { useEffect, useRef, useState } from 'react';
import './Drop.css';
import { DragData, DropData, dropStyle } from './configs';

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
            className={isOver ? 'drop over' : 'drop'}
            style={{
                ...dropStyle,
                borderColor: isOver ? props.dropData?.color : 'gray',
            }}
        />
    );
}
