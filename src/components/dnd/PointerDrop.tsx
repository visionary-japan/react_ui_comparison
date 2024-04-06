import stylex from '@stylexjs/stylex';
import { type FC, memo, useEffect, useRef, useState } from 'react';
import type { DragData, DropData } from '../../pages/dnd/config';

interface Props {
    dragData: DragData | undefined;
    dropData: DropData | undefined;
}

export const DROP_WIDTH = 60;
export const DROP_HEIGHT = 60;
export const DROP_BORDER_WIDTH = 2;

const styles = stylex.create({
    base: {
        width: DROP_WIDTH,
        height: DROP_HEIGHT,
        borderWidth: DROP_BORDER_WIDTH,
        borderStyle: 'dashed',
        borderColor: '#aaaaaa',
        willChange: 'border-color',
        transition: 'border-color 500ms ease-out',
    },
});

const Drop: FC<Props> = props => {
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
            {...stylex.props(
                styles.base,
                isOver && props.dropData?.dropStyles.over,
            )}
        />
    );
};

export const PointerDrop = memo(Drop);
