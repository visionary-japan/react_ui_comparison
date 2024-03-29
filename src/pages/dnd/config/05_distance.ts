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
        const { locScroll, locRect, sizRect } = props;
        if (!(locScroll && locRect && sizRect)) return false;
        const dragCenterX = locRect.x + sizRect.width / 2;
        const dragCenterY = locRect.y + sizRect.height / 2;
        const dropCenterX = locScroll.x + dropRect.x + dropRect.width / 2;
        const dropCenterY = locScroll.y + dropRect.y + dropRect.height / 2;
        const distance =
            (dragCenterX - dropCenterX) ** 2 + (dragCenterY - dropCenterY) ** 2;
        return distance <= 16384; // 2^14
    },
    dragStyles,
    dropStyles,
};
