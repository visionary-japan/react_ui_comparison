import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

// ドラッグ要素のスタイル
const dragStyles = stylex.create({
    base: {
        backgroundColor: 'yellow',
        top: 500,
        left: '40%',
        borderRadius: '50%',
    },
    dragging: {
        filter: 'drop-shadow(0 0 32px yellow)',
    },
    image: {},
});

// ドロップ要素のスタイル
const dropStyles = stylex.create({
    over: {
        borderColor: {
            '@media (prefers-color-scheme: light)': '#dddd00',
            '@media (prefers-color-scheme: dark)': '#ffff00',
        },
    },
});

// ドロップ要素
export const distance: DropData = {
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { rect } = props;
        if (!rect) return false;
        const dragCenterX = rect.x + rect.width / 2;
        const dragCenterY = rect.y + rect.height / 2;
        const dropCenterX = dropRect.x + dropRect.width / 2;
        const dropCenterY = dropRect.y + dropRect.height / 2;
        const distance =
            (dragCenterX - dropCenterX) ** 2 + (dragCenterY - dropCenterY) ** 2;
        return distance <= 16384; // 2^14
    },
    dragStyles,
    dropStyles,
};
