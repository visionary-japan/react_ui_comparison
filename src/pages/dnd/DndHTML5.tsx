import type React from 'react';
import { useState } from 'react';

export function DndHTML5() {
    const [isDragging, setIsDragging] = useState(false);
    const [isDroppable, setIsDroppable] = useState(false);

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDragging(true);
        e.dataTransfer.setData('text/plain', e.currentTarget.id);
        e.dataTransfer.dropEffect = 'move';
    };
    const onDragEnd = () => {
        setIsDragging(false);
    };

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'drop-area') {
            setIsDroppable(true);
        }
    };
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'drop-area') {
            setIsDroppable(false);
        }
    };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'drop-area') {
            setIsDroppable(false);
        }
    };

    return (
        <>
            <h1>DnD HTML5 API</h1>
            <div
                style={{
                    height: 64,
                    width: 64,
                    backgroundColor: isDragging ? 'red' : 'gray',
                }}
                draggable
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                // onDrag={(e) => console.log('on drag', e)} // ドラッグ中に発火するだけで未使用でもOK
            >
                drag item
            </div>
            <div
                id='drop-area'
                style={{
                    height: 128,
                    width: 128,
                    backgroundColor: isDroppable ? 'green' : 'darkgray',
                }}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={e => {
                    e.preventDefault(); // これがないとdropイベントが発火しない
                }}
                onDrop={onDrop}
            >
                drop area
            </div>
        </>
    );
}
