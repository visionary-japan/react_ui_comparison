import type { DragData, DropDatas } from '.';
import { cursor } from './01_cursor';
import { center } from './02_center';
import { percent } from './03_percent';
import { hotspot } from './04_hotspot';
import { distance } from './05_distance';
import { velocity } from './06_velocity';

// 初期ドラッグ情報
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

// ドロップ要素
export const dropDatas: DropDatas = {
    cursor,
    center,
    percent,
    hotspot,
    distance,
    velocity,
};
