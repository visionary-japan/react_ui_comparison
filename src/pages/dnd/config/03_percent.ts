import { create } from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

// ドラッグ要素のスタイル
const dragStyles = create({
    base: {
        top: 300,
        left: '60%',
        backgroundColor: 'blue',
    },
    dragging: {},
});

// ドロップ要素のスタイル
const dropStyles = create({
    over: {
        borderColor: {
            '@media (prefers-color-scheme: light)': '#0000ff',
            '@media (prefers-color-scheme: dark)': '#0000ff',
        },
    },
});

// ドロップ要素
export const percent = {
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { rect } = props;
        if (!rect) return false;
        const dropArea = dropRect.width * dropRect.height;
        const overlapWidth =
            Math.min(rect.x + rect.width, dropRect.right) -
            Math.max(rect.x, dropRect.left);
        if (overlapWidth <= 0) return false;
        const overlapHeight =
            Math.min(rect.y + rect.height, dropRect.bottom) -
            Math.max(rect.y, dropRect.top);
        if (overlapHeight <= 0) return false;
        return overlapWidth * overlapHeight >= dropArea * 0.25;
    },
    dragStyles,
    dropStyles,
} as const satisfies DropData;
