import { create } from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

// ドラッグ要素のスタイル
const dragStyles = create({
    base: {
        backgroundColor: 'red',
        top: 100,
        left: '20%',
        borderRadius: '50%',
    },
    dragging: {},
});

// ドロップ要素のスタイル
const dropStyles = create({
    over: {
        borderColor: {
            '@media (prefers-color-scheme: light)': '#ff0000',
            '@media (prefers-color-scheme: dark)': '#ff0000',
        },
    },
});

// ドロップ要素
export const cursor = {
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { cooClient } = props;
        if (!cooClient) return false;
        return (
            cooClient.x >= dropRect.left &&
            cooClient.x <= dropRect.right &&
            cooClient.y >= dropRect.top &&
            cooClient.y <= dropRect.bottom
        );
    },
    dragStyles,
    dropStyles,
} as const satisfies DropData;
