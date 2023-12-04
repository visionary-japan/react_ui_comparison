/* eslint-disable react/prop-types */
import React, { useCallback, useState } from 'react';
import './App.css';
import { Defaults } from './Defaults.tsx';
import { Drag } from './Drag.tsx';
import { Drop } from './Drop.tsx';
import {
    Dragdata,
    dragdataInit,
    dragdatasStatic,
    dropAmount,
} from './configs.tsx';
import { useResizeObserver } from './useResizeObserver.tsx';

const MemoDefaults = React.memo(Defaults);
const MemoDrag = React.memo(Drag);
const MemoDrop = React.memo(Drop);

export function App() {
    const [dragIndex, setDragIndex] = useState<number>(-1);
    const [dragdata, setDragdata] = useState<Dragdata>(dragdataInit);

    const handleDragStart = (id: string) => {
        setDragIndex(dragdatasStatic.map(val => val.id).indexOf(id));
    };
    const handleDrag = (props: Dragdata) => {
        setDragdata({
            clientX: props.clientX,
            clientY: props.clientY,
            location: props.location,
            size: props.size,
        });
    };

    const handleResize = useCallback(() => {
        setDragIndex(-1);
        setDragdata(dragdataInit);
    }, []);

    const ref = useResizeObserver(handleResize);

    return (
        <>
            <MemoDefaults />
            <div id='drop-wrap'>
                {Array.from({ length: dropAmount }, (_, i) => (
                    <MemoDrop
                        key={`${i}`}
                        dragdataDynamic={dragdata}
                        dragdataStatic={dragdatasStatic[dragIndex]}
                    />
                ))}
            </div>
            {dragdatasStatic.map((drag, i) => (
                <MemoDrag
                    key={`${i}`}
                    dragdataDynamic={dragdata}
                    dragdataStatic={drag}
                    handleDragStart={handleDragStart}
                    handleDrag={handleDrag}
                />
            ))}
            <div ref={ref} id='overlay' />
        </>
    );
}
