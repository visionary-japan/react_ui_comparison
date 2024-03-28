import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

// ドラッグ要素のスタイル
const dragStyles = stylex.create({
    base: {
        backgroundColor: 'green',
        top: 200,
        left: '40%',
        borderRadius: '50%',
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

// ドロップ要素のスタイル
const dropStyles = stylex.create({
    over: {
        borderColor: {
            '@media (prefers-color-scheme: light)': '#00ff00',
            '@media (prefers-color-scheme: dark)': '#00ff00',
        },
    },
});

// ドロップ要素
export const center: DropData = {
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
    dragStyles,
    dropStyles,
};
