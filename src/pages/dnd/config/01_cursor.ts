import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

const styles = stylex.create({
    base: {
        backgroundColor: 'red',
        top: 100,
        left: '20%',
        borderRadius: 16,
    },
    dragging: {},
    image: {},
});

// ドロップ要素
export const cursor: DropData = {
    color: 'red',
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { locClient } = props;
        if (!locClient) return false;
        return (
            locClient.x >= dropRect.left &&
            locClient.x <= dropRect.right &&
            locClient.y >= dropRect.top &&
            locClient.y <= dropRect.bottom
        );
    },
    styles,
};
