/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Drag } from '../../../components/dnd/pointer/DragPointer.tsx';
import { Drop } from '../../../components/dnd/pointer/DropPointer.tsx';
import { useResizeObserver } from '../../../hooks/useDivResizeObserver.tsx';
import './DndPointer.css';
import {
    DragData,
    dragDataInit,
    dropDatas,
    dropStyle,
    dropWrapStyle,
} from './configs.tsx';

const MemoDrag = React.memo(Drag);
const MemoDrop = React.memo(Drop);

export function DndPointer() {
    const [dragId, setDragId] = useState<string>('');
    const [dragData, setDragData] = useState<DragData>(dragDataInit);
    const [dropAmount, setDropAmount] = useState<number>(120);

    const handleDragStart = (id: string) => {
        setDragId(id);
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
        setDragId('');
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
            ) * 20,
        );
        document.body.style.height = `${
            ref.current.clientHeight +
            parseInt(ref.current.style.marginTop) +
            parseInt(ref.current.style.marginBottom)
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
            <div ref={ref} id='dnd-pointer-drop-wrap' style={dropWrapStyle}>
                {Array.from({ length: dropAmount }, (_, i) => (
                    <MemoDrop
                        key={`${i}`}
                        dragData={dragData}
                        dropData={dropDatas[dragId]}
                    />
                ))}
            </div>
            {Object.keys(dropDatas).map((key: string, i: number) => (
                <MemoDrag
                    key={`${i}`}
                    id={key}
                    dragData={dragData}
                    dropData={dropDatas[key]}
                    handleDragStart={handleDragStart}
                    handleDrag={handleDrag}
                />
            ))}
        </div>
    );
}
