import * as stylex from '@stylexjs/stylex';
import type { DragData, DropData } from '.';

// ドラッグ要素のスタイル
const dragStyles = stylex.create({
    base: {
        top: 400,
        left: '20%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundSize: 'contain',
        '::after': {
            content: '',
            backgroundColor: 'red',
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 2,
            height: 2,
            transform: 'translateX(-50%)',
        },
    },
    dragging: {},
    image: {
        // TODO ファイルから直接情報を引っ張る
        // ただstaticな情報しか置けないみたい
        // だからといって引数にこれを置くのも違和感があり頓挫
        backgroundImage: `url("/react_ui_comparison/computer_cursor_arrow_white.png")`,
    },
});

// ドロップ要素のスタイル
const dropStyles = stylex.create({
    over: {
        borderColor: {
            '@media (prefers-color-scheme: light)': '#ccd3d9',
            '@media (prefers-color-scheme: dark)': '#acb3b9',
        },
    },
});

// ドロップ要素
export const hotspot: DropData = {
    isOver: (props: DragData, dropRect: DOMRect) => {
        const { locScroll, locRect, sizRect } = props;
        if (!(locScroll && locRect && sizRect)) return false;
        const centerX = locRect.x + sizRect.width / 2;
        const topY = locRect.y;
        return (
            locScroll.x + dropRect.left <= centerX &&
            locScroll.x + dropRect.right >= centerX &&
            locScroll.y + dropRect.top <= topY &&
            locScroll.y + dropRect.bottom >= topY
        );
    },
    dragStyles,
    dropStyles,
};
