import type { UserAuthoredStyles } from '@stylexjs/stylex';
import type { Coordinate } from '../../../@types';

// ドラッグ情報
export interface DragData {
    rect?: DOMRect;
    rectNext?: DOMRect;
    cooClient?: Coordinate;
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
