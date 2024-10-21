import { cursor } from './01_cursor.ts';
import { center } from './02_center.ts';
import { percent } from './03_percent.ts';
import { hotspot } from './04_hotspot.ts';
import { distance } from './05_distance.ts';
import { velocity } from './06_velocity.ts';
import type { DropDatas } from './index.ts';

// ドロップ要素
export const dropDatas: DropDatas = {
    cursor,
    center,
    percent,
    hotspot,
    distance,
    velocity,
};
