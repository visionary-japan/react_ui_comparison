import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

const styles = stylex.create({
    base: {
        backgroundColor: 'green',
        top: 200,
        left: '40%',
        borderRadius: 16,
        '::before': {
            position: 'absolute',
            content: '',
            background: 'black',
            top: '50%',
            right: 0,
            left: 0,
            height: 1,
        },
        '::after': {
            position: 'absolute',
            content: '',
            background: 'black',
            top: 0,
            bottom: 0,
            left: '50%',
            width: 1,
        },
    },
    dragging: {},
    image: {},
});

// ドロップ要素
export const center: DropData = {
    color: 'green',
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { locScroll, locRect, sizRect } = props;
        if (!(locScroll && locRect && sizRect)) return false;
        const centerX = locRect.x + sizRect.width / 2;
        const centerY = locRect.y + sizRect.height / 2;
        return (
            locScroll.x + dropRect.left <= centerX &&
            locScroll.x + dropRect.right >= centerX &&
            locScroll.y + dropRect.top <= centerY &&
            locScroll.y + dropRect.bottom >= centerY
        );
    },
    styles,
};
