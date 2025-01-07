import type { DropDatas } from '.';
import { cursor } from './01_cursor';
import { center } from './02_center';
import { percent } from './03_percent';
import { hotspot } from './04_hotspot';
import { distance } from './05_distance';
import { velocity } from './06_velocity';

// ドロップ要素
export const dropDatas = {
    cursor,
    center,
    percent,
    hotspot,
    distance,
    velocity,
} as const satisfies DropDatas;
