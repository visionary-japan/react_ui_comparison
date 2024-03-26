import stylex from '@stylexjs/stylex';
import { type FC, memo, useEffect, useRef, useState } from 'react';
import type { DragData, DropData } from '../../pages/dnd/config';

interface Props {
    dragData: DragData | undefined;
    dropData: DropData | undefined;
}

export const DropWidth = 60;
export const DropHeight = 60;
export const DropBorderWidth = 2;

const styles = stylex.create({
    base: {
        width: DropWidth,
        height: DropHeight,
        borderWidth: DropBorderWidth,
        borderStyle: 'dashed',
        willChange: 'border-style',
        borderColor: 'gray',
    },
    over: (color: string | undefined) => ({
        filter: 'brightness(2.5)',
        borderColor: color,
    }),
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
                isOver && styles.over(props.dropData?.color),
            )}
        />
    );
};

export const PointerDrop = memo(Drop);
