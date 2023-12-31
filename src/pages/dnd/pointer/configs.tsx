import React from 'react';

// TODO やっぱもっとマトモな値の格納方法があるんじゃないの・・・？

// 型
export interface location {
    x: number;
    y: number;
}
export interface size {
    width: number;
    height: number;
}
export interface DragData {
    locScroll?: location;
    locClient?: location;
    locRect?: location;
    sizRect?: size;
    locNext?: location;
}
export interface DropData {
    color: string;
    isOver: (dragData: DragData, rectDrop: DOMRect) => boolean;
}
export interface DropDatas {
    [id: string]: DropData;
}

// ドロップ関連
export const dropWrapStyle: React.CSSProperties = {
    gap: 2,
    margin: 8,
};
export const dropStyle: React.CSSProperties = {
    width: 60,
    height: 60,
    borderWidth: 2,
};

// ドラッグ関連
export const dragDataInit: DragData = {
    locClient: { x: 0, y: 0 },
    locRect: {
        x: 0,
        y: 0,
    },
    sizRect: {
        width: 0,
        height: 0,
    },
};
export const dropDatas: DropDatas = {
    cursor: {
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
    },
    center: {
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
    },
    percent: {
        color: 'blue',
        isOver: (props: DragData, dropRect: DOMRect) => {
            const { locScroll, locRect, sizRect } = props;
            if (!(locScroll && locRect && sizRect)) return false;
            const dropArea = dropRect.width * dropRect.height;
            const overlapWidth =
                Math.min(
                    locRect.x + sizRect.width,
                    locScroll.x + dropRect.right,
                ) - Math.max(locRect.x, locScroll.x + dropRect.left);
            if (overlapWidth <= 0) return false;
            const overlapHeight =
                Math.min(
                    locRect.y + sizRect.height,
                    locScroll.y + dropRect.bottom,
                ) - Math.max(locRect.y, locScroll.y + dropRect.top);
            if (overlapHeight <= 0) return false;
            return overlapWidth * overlapHeight >= dropArea * 0.25;
        },
    },
    hotspot: {
        color: 'white',
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
    },
    distance: {
        color: 'yellow',
        isOver: (props: DragData, dropRect: DOMRect) => {
            const { locScroll, locRect, sizRect } = props;
            if (!(locScroll && locRect && sizRect)) return false;
            const dragCenterX = locRect.x + sizRect.width / 2;
            const dragCenterY = locRect.y + sizRect.height / 2;
            const dropCenterX = locScroll.x + dropRect.x + dropRect.width / 2;
            const dropCenterY = locScroll.y + dropRect.y + dropRect.height / 2;
            const distance =
                (dragCenterX - dropCenterX) ** 2 +
                (dragCenterY - dropCenterY) ** 2;
            return distance <= 16384; // 2^14
        },
    },
    velocity: {
        color: 'purple',
        isOver: (props: DragData, dropRect: DOMRect) => {
            const { locScroll, locRect, sizRect, locNext } = props;
            if (!(locScroll && locRect && sizRect && locNext)) return false;
            const nextDragCenterX = locNext.x + sizRect.width / 2;
            const nextDragCenterY = locNext.y + sizRect.height / 2;
            return (
                locScroll.x + dropRect.left <= nextDragCenterX &&
                locScroll.x + dropRect.right >= nextDragCenterX &&
                locScroll.y + dropRect.top <= nextDragCenterY &&
                locScroll.y + dropRect.bottom >= nextDragCenterY
            );
        },
    },
};
