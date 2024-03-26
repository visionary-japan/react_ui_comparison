import stylex from '@stylexjs/stylex';
import { type FC, memo, useCallback, useEffect, useRef, useState } from 'react';
import { PointerDrag } from '../../components/dnd/PointerDrag.tsx';
import {
    DropBorderWidth,
    DropWidth,
    PointerDrop,
} from '../../components/dnd/PointerDrop.tsx';
import { useResizeObserver } from '../../hooks/useDivResizeObserver.tsx';
import { dragDataInit, dropDatas } from './config/configs.ts';
import type { DndKeys, DragData } from './config/index';

const margin = 8;
const gap = 2;
const columns = 30;

const styles = stylex.create({
    base: {
        position: 'absolute',
        top: 0,
        left: 0,
        margin: margin,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: gap,
    },
});

const Pointer: FC = () => {
    const [dragId, setDragId] = useState<DndKeys | undefined>(undefined);
    const [dragData, setDragData] = useState<DragData>(dragDataInit);
    const [dropAmount, setDropAmount] = useState<number>(120);

    const handleDragStart = (id: DndKeys | undefined) => {
        setDragId(id);
    };
    const handleDrag = (props: DragData) => {
        setDragData({
            // TODO さすがにこれはヤバイ
            // eslint-disable-next-line react/prop-types
            locClient: props.locClient,
            // eslint-disable-next-line react/prop-types
            locRect: props.locRect,
            // eslint-disable-next-line react/prop-types
            locScroll: props.locScroll,
            // eslint-disable-next-line react/prop-types
            sizRect: props.sizRect,
            // eslint-disable-next-line react/prop-types
            locNext: props.locNext,
        });
    };

    const handleResize = useCallback(() => {
        if (!ref.current) return;
        setDragId(undefined);
        setDragData(dragDataInit);
        setDropAmount(
            Math.floor(
                (ref.current.clientWidth -
                    Number(ref.current.style.marginLeft) -
                    Number(ref.current.style.marginRight) +
                    gap) /
                    (DropWidth + DropBorderWidth * 2 + gap) +
                    0.25, // TODO なぜかこの +0.25 のおかげでキレイになってるけど、マジで意味わからん
            ) * columns,
        );
        document.body.style.height = `${
            ref.current.clientHeight +
            Number(ref.current.style.marginTop) +
            Number(ref.current.style.marginBottom)
        }px`;
    }, []);

    useEffect(() => {
        return () => {
            document.body.style.height = '';
        };
    }, []);

    const ref = useRef<HTMLDivElement>(null);
    useResizeObserver(ref, handleResize);

    return (
        <div id='wrap'>
            <h1>DnD Pointer</h1>
            <div ref={ref} {...stylex.props(styles.base)}>
                {Array.from({ length: dropAmount }, (_, i) => (
                    <PointerDrop
                        // TODO データの持ち方を考え直す
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={i}
                        dragData={dragData}
                        dropData={dragId && dropDatas[dragId as DndKeys]}
                    />
                ))}
                {Object.keys(dropDatas).map((key: string) => (
                    <PointerDrag
                        key={key}
                        id={key}
                        dragData={dragData}
                        dropData={dropDatas[key as DndKeys]}
                        handleDragStart={() => handleDragStart(key as DndKeys)}
                        handleDrag={handleDrag}
                    />
                ))}
            </div>
        </div>
    );
};

export const DndPointer = memo(Pointer);
