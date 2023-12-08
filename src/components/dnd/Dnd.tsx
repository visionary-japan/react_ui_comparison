/* eslint-disable react/prop-types */
import React, { useCallback, useRef, useState } from 'react';
import { useResizeObserver } from '../../hooks/useDivResizeObserver.tsx';
import './Dnd.css';
import { Drag } from './Drag.tsx';
import { Drop } from './Drop.tsx';
import {
    DragData,
    dragDataInit,
    dropDatas,
    dropStyle,
    dropWrapStyle,
} from './configs.tsx';

const MemoDrag = React.memo(Drag);
const MemoDrop = React.memo(Drop);

export function Dnd() {
    const [dragIndex, setDragIndex] = useState<number>(-1);
    const [dragData, setDragData] = useState<DragData>(dragDataInit);
    const [dropAmount, setDropAmount] = useState<number>(120);

    const handleDragStart = (id: string) => {
        setDragIndex(dropDatas.map(val => val.id).indexOf(id));
    };
    const handleDrag = (props: DragData) => {
        setDragData({
            locClient: props.locClient,
            locRect: props.locRect,
            locScroll: props.locScroll,
            sizRect: props.sizRect,
            locNext: props.locNext,
        });
    };

    const handleResize = useCallback(() => {
        if (!ref.current) return;
        setDragIndex(-1);
        setDragData(dragDataInit);
        setDropAmount(
            Math.floor(
                (ref.current.clientWidth -
                    parseFloat(ref.current.style.marginLeft) -
                    parseFloat(ref.current.style.marginRight) +
                    parseFloat(dropWrapStyle.gap as string)) /
                    (parseFloat(dropStyle.width as string) +
                        parseFloat(dropStyle.borderWidth as string) * 2 +
                        parseFloat(dropWrapStyle.gap as string)) +
                    0.25, // TODO なぜかこの +0.25 のおかげでキレイになってるけど、マジで意味わからん
            ) * 16,
        );
        document.body.style.height = `${
            ref.current.clientHeight +
            parseInt(ref.current.style.marginTop) +
            parseInt(ref.current.style.marginBottom)
        }px`;
    }, []);

    const ref = useRef<HTMLDivElement>(null);
    useResizeObserver(ref, handleResize);

    return (
        <div id='wrap'>
            <div ref={ref} id='drop-wrap' style={dropWrapStyle}>
                {Array.from({ length: dropAmount }, (_, i) => (
                    <MemoDrop
                        key={`${i}`}
                        dragData={dragData}
                        dropData={dropDatas[dragIndex]}
                    />
                ))}
            </div>
            {dropDatas.map((drag, i) => (
                <MemoDrag
                    key={`${i}`}
                    dragData={dragData}
                    dropData={drag}
                    handleDragStart={handleDragStart}
                    handleDrag={handleDrag}
                />
            ))}
        </div>
    );
}
