import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

// ドラッグ要素のスタイル
const dragStyles = stylex.create({
    base: {
        backgroundColor: 'purple',
        top: 600,
        left: '60%',
        width: 48,
        height: 48,
        borderRadius: '50%',
    },
    dragging: {},
});

// ドロップ要素のスタイル
const dropStyles = stylex.create({
    over: {
        borderColor: {
            '@media (prefers-color-scheme: light)': '#ff00ff',
            '@media (prefers-color-scheme: dark)': '#ff00ff',
        },
    },
});

// ドロップ要素
export const velocity: DropData = {
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { rect, rectNext } = props;
        if (!(rect && rectNext)) return false;
        const nextCenterX = rectNext.x + rect.width / 2;
        const nextCenterY = rectNext.y + rect.height / 2;
        return (
            dropRect.left <= nextCenterX &&
            dropRect.right >= nextCenterX &&
            dropRect.top <= nextCenterY &&
            dropRect.bottom >= nextCenterY
        );
    },
    dragStyles,
    dropStyles,
};
