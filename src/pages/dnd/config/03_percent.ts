import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

const styles = stylex.create({
    base: {
        top: 300,
        left: '60%',
        '::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
            width: '100%',
            height: '100%',
            content: '',
            backgroundColor: 'blue',
        },
    },
    dragging: {},
    image: {},
});

// ドロップ要素
export const percent: DropData = {
    color: 'blue',
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { locScroll, locRect, sizRect } = props;
        if (!(locScroll && locRect && sizRect)) return false;
        const dropArea = dropRect.width * dropRect.height;
        const overlapWidth =
            Math.min(locRect.x + sizRect.width, locScroll.x + dropRect.right) -
            Math.max(locRect.x, locScroll.x + dropRect.left);
        if (overlapWidth <= 0) return false;
        const overlapHeight =
            Math.min(
                locRect.y + sizRect.height,
                locScroll.y + dropRect.bottom,
            ) - Math.max(locRect.y, locScroll.y + dropRect.top);
        if (overlapHeight <= 0) return false;
        return overlapWidth * overlapHeight >= dropArea * 0.25;
    },
    styles,
};
