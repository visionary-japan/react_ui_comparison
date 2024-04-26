import type { Coordinate } from '../@types';

export const getClosestCoordinate = (
    target: Coordinate,
    samples: Coordinate[],
) =>
    samples.reduce((acc, curr) => {
        const currDistance = Math.sqrt(
            (curr.x - target.x) ** 2 + (curr.y - target.y) ** 2,
        );
        const accDistance = Math.sqrt(
            (acc.x - target.x) ** 2 + (acc.y - target.y) ** 2,
        );
        return currDistance < accDistance ? curr : acc;
    }, samples[0]);
