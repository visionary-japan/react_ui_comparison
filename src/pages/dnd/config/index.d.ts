import type { UserAuthoredStyles } from '@stylexjs/stylex';
import type { Location, Size } from '../../@types';

// ドラッグ情報
export interface DragData {
    locScroll?: Location;
    locClient?: Location;
    locRect?: Location;
    sizRect?: Size;
    locNext?: Location;
}

// 型
type StyleKeys = 'base' | 'dragging' | 'image';

// ドロップ情報
export interface DropData {
    isOver: (dragData: DragData, rectDrop: DOMRect) => boolean;
    dragStyles: { [key in StyleKeys]: UserAuthoredStyles };
    dropStyles: { over: UserAuthoredStyles };
}

export type DndKeys =
    | 'cursor'
    | 'center'
    | 'percent'
    | 'hotspot'
    | 'distance'
    | 'velocity';

export type DropDatas = {
    [K in DndKeys]: DropData;
};
