import { useEffect, useRef, useState } from 'react';
import './Drop.css';
import { Dragdata, DragdataStatic } from './configs';

interface Props {
    dragdataDynamic: Dragdata | null;
    dragdataStatic: DragdataStatic;
}
export function Drop(props: Props) {
    const [isOver, setIsOver] = useState<boolean>(false);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (props.dragdataDynamic && props.dragdataStatic) {
            if (!ref.current) return;
            setIsOver(
                props.dragdataStatic.isOver(
                    props.dragdataDynamic,
                    ref.current.getBoundingClientRect(),
                ),
            );
        } else {
            setIsOver(false);
        }
    }, [props.dragdataDynamic, props.dragdataStatic]);

    return (
        <div
            ref={ref}
            className={isOver ? 'drop over' : 'drop'}
            style={{
                borderColor: isOver ? props.dragdataStatic?.color : 'gray',
            }}
        />
    );
}
