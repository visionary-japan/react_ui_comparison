import { useState } from 'react';
import './DndDnd.css';

export function DndDnd() {
    const [isDragging, setIsDragging] = useState(false);
    const [isDroppable, setIsDroppable] = useState(false);

    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('non drag start', e);
        setIsDragging(true);
        // e.dataTransfer.setData('text/plain', e.currentTarget.id);
        // e.dataTransfer.dropEffect = 'move';
    };
    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('on drag end', e);
        setIsDragging(false);
    };

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('on drag enter', e);
        if (e.currentTarget.id === 'drop-area') {
            setIsDroppable(true);
        }
    };
    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        // 放しても実行される
        console.log('on drag leave', e);
        if (e.currentTarget.id === 'drop-area') {
            setIsDroppable(false);
        }
    };
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        console.log('on drop', e);
        if (e.currentTarget.id === 'drop-area') {
            setIsDroppable(false);
        }
    };

    return (
        <div id='wrap'>
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
        </div>
    );
}
