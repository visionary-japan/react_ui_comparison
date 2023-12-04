// 型
export interface location {
    x: number;
    y: number;
}
export interface size {
    width: number;
    height: number;
}
export interface Dragdata {
    clientX: number;
    clientY: number;
    location: location;
    size: size;
}
export interface DragdataStatic {
    id: string;
    color: string;
    isOver: (dragData: Dragdata, rectDrop: DOMRect) => boolean;
}

// ドロップ関連
export const dropAmount = 200;

// ドラッグ関連
export const dragdataInit: Dragdata = {
    clientX: 0,
    clientY: 0,
    location: {
        x: 0,
        y: 0,
    },
    size: {
        width: 0,
        height: 0,
    },
};
export const dragdatasStatic: DragdataStatic[] = [
    {
        id: 'cursor',
        color: 'red',
        isOver: (props: Dragdata, dropRect: DOMRect) => {
            const { clientX, clientY } = props;
            return (
                clientX >= dropRect.left &&
                clientX <= dropRect.right &&
                clientY >= dropRect.top &&
                clientY <= dropRect.bottom
            );
        },
    },
    {
        id: 'center',
        color: 'green',
        isOver: (props: Dragdata, dropRect: DOMRect) => {
            const { location, size } = props;
            const centerX = location.x + size.width / 2;
            const centerY = location.y + size.height / 2;
            return (
                centerX >= dropRect.left &&
                centerX <= dropRect.right &&
                centerY >= dropRect.top &&
                centerY <= dropRect.bottom
            );
        },
    },
    {
        id: 'percent',
        color: 'blue',
        isOver: (props: Dragdata, dropRect: DOMRect) => {
            const { location, size } = props;
            const dropArea = dropRect.width * dropRect.height;
            const overlapWidth =
                Math.min(location.x + size.width, dropRect.right) -
                Math.max(location.x, dropRect.left);
            if (overlapWidth <= 0) return false;
            const overlapHeight =
                Math.min(location.y + size.height, dropRect.bottom) -
                Math.max(location.y, dropRect.top);
            if (overlapHeight <= 0) return false;
            return overlapWidth * overlapHeight >= dropArea * 0.25;
        },
    },
    {
        id: 'fakeCursor',
        color: 'white',
        isOver: (props: Dragdata, dropRect: DOMRect) => {
            const { location, size } = props;
            const centerX = location.x + size.width / 2;
            const topY = location.y;
            return (
                centerX >= dropRect.left &&
                centerX <= dropRect.right &&
                topY >= dropRect.top &&
                topY <= dropRect.bottom
            );
        },
    },
    {
        id: 'distance',
        color: 'yellow',
        isOver: (props: Dragdata, dropRect: DOMRect) => {
            const { location, size } = props;
            const dragCenterX = location.x + size.width / 2;
            const dragCenterY = location.y + size.height / 2;
            const dropCenterX = dropRect.x + dropRect.width / 2;
            const dropCenterY = dropRect.y + dropRect.height / 2;
            const distance =
                (dragCenterX - dropCenterX) ** 2 +
                (dragCenterY - dropCenterY) ** 2;
            return distance <= 10000;
        },
    },
    {
        id: 'velocity',
        color: 'purple',
        isOver: (props: Dragdata, dropRect: DOMRect) => {
            const { location, size } = props;
            const dragCenterX = location.x + size.width / 2;
            const dragCenterY = location.y + size.height / 2;
            const dropCenterX = dropRect.x + dropRect.width / 2;
            const dropCenterY = dropRect.y + dropRect.height / 2;
            const distance =
                (dragCenterX - dropCenterX) ** 2 +
                (dragCenterY - dropCenterY) ** 2;
            return distance <= 10000;
        },
    },
];
