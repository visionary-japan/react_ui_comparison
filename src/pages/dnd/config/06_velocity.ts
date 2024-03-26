import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

const styles = stylex.create({
    base: {
        backgroundColor: 'purple',
        top: 600,
        left: '60%',
        width: 48,
        height: 48,
        borderRadius: '50%',
    },
    dragging: {},
    image: {},
});

// ドロップ要素
export const velocity: DropData = {
    color: 'purple',
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { locScroll, locRect, sizRect, locNext } = props;
        if (!(locScroll && locRect && sizRect && locNext)) return false;
        const nextDragCenterX = locNext.x + sizRect.width / 2;
        const nextDragCenterY = locNext.y + sizRect.height / 2;
        return (
            locScroll.x + dropRect.left <= nextDragCenterX &&
            locScroll.x + dropRect.right >= nextDragCenterX &&
            locScroll.y + dropRect.top <= nextDragCenterY &&
            locScroll.y + dropRect.bottom >= nextDragCenterY
        );
    },
    styles,
};
