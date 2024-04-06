import stylex from '@stylexjs/stylex';
import { type FC, memo, useCallback, useRef, useState } from 'react';
import { PointerDrag } from '../../components/dnd/PointerDrag.tsx';
import {
    DROP_BORDER_WIDTH,
    DROP_WIDTH,
    PointerDrop,
} from '../../components/dnd/PointerDrop.tsx';
import { H1 } from '../../components/heading/H1.tsx';
import { useObserverResize } from '../../hooks/useObserverResize.tsx';
import { dropDatas } from './config/configs.ts';
import type { DndKeys, DragData } from './config/index';

const DROP_PADDING = 8;
const DROP_GAP = 2;
const DROP_COLUMNS = 25;

const styles = stylex.create({
    base: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: DROP_PADDING,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: DROP_GAP,
    },
});

const Component: FC = () => {
    const [dragId, setDragId] = useState<DndKeys | undefined>(undefined);
    const [dragData, setDragData] = useState<DragData | undefined>(undefined);
    const [dropAmount, setDropAmount] = useState<number>(120);

    // イベントハンドラ
    // ドラッグ開始
    const handleDragStart = useCallback((id: DndKeys | undefined) => {
        setDragId(id);
    }, []);
    // ドラッグ中
    const handleDrag = useCallback((props: DragData) => {
        setDragData(props);
    }, []);

    const handleResize = useCallback(() => {
        if (!ref.current) return;
        setDragId(undefined);
        setDragData(undefined);
        setDropAmount(
            Math.floor(
                (ref.current.clientWidth -
                    Number(ref.current.style.marginLeft) -
                    Number(ref.current.style.marginRight) +
                    DROP_GAP) /
                    (DROP_WIDTH + DROP_BORDER_WIDTH * 2 + DROP_GAP),
            ) * DROP_COLUMNS,
        );
    }, []);

    const ref = useRef<HTMLDivElement>(null);
    useObserverResize(ref, handleResize);

    return (
        <div>
            <H1>DnD Pointer</H1>
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
                        dropData={dropDatas[key as DndKeys]}
                        handleDragStart={() => handleDragStart(key as DndKeys)}
                        handleDrag={handleDrag}
                    />
                ))}
            </div>
        </div>
    );
};

export const Pointer = memo(Component);
