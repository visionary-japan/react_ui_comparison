import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

// ドラッグ要素のスタイル
const dragStyles = stylex.create({
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

// ドロップ要素のスタイル
const dropStyles = stylex.create({
    over: {
        borderColor: {
            '@media (prefers-color-scheme: light)': '#0000ff',
            '@media (prefers-color-scheme: dark)': '#0000ff',
        },
    },
});

// ドロップ要素
export const percent: DropData = {
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
    dragStyles,
    dropStyles,
};
