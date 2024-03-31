import type React from 'react';
import { type FC, memo, useCallback, useState } from 'react';
import { H1 } from '../../components/heading/H1';

const Component: FC = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [isDroppable, setIsDroppable] = useState(false);

    const handleDragStart = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            setIsDragging(true);
            e.dataTransfer.setData('text/plain', e.currentTarget.id);
            e.dataTransfer.dropEffect = 'move';
        },
        [],
    );
    const handleDrag = useCallback((_: React.DragEvent<HTMLDivElement>) => {
        // console.log('dragging', e);
    }, []);
    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleDragEnter = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            if (e.currentTarget.id === 'drop-area') {
                setIsDroppable(true);
            }
        },
        [],
    );
    const handleDragLeave = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            if (e.currentTarget.id === 'drop-area') {
                setIsDroppable(false);
            }
        },
        [],
    );
    const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'drop-area') {
            setIsDroppable(false);
        }
    }, []);

    return (
        <>
            <H1>DnD HTML5 API</H1>
            <div
                style={{
                    height: 64,
                    width: 64,
                    backgroundColor: isDragging ? 'red' : 'gray',
                }}
                draggable
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDrag={handleDrag}
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
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={e => e.preventDefault()} // これがないとdropイベントが発火しない
                onDrop={handleDrop}
            >
                drop area
            </div>
        </>
    );
};

export const HTML5 = memo(Component);
