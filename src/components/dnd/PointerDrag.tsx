import stylex from '@stylexjs/stylex';
import type { FC, PointerEvent } from 'react';
import { memo, useCallback, useRef, useState } from 'react';
import type { MutableDOMRect } from '.';
import type { Coordinate } from '../../@types';
import type { DragData, DropData } from '../../pages/dnd/config';

const width = 72;
const height = 72;

const styles = stylex.create({
    base: {
        position: 'absolute',
        touchAction: 'none',
        width: width,
        height: height,
        cursor: 'pointer',
        opacity: 0.75,
        willChange: 'left, top, filter, opacity',
    },
    dragging: {
        filter: 'drop-shadow(0 0 16px black)',
        opacity: 0.9,
    },
});

const calculateNewRect = (
    rect: DOMRect,
    rectLast: DOMRect | undefined,
    timestampSub: number,
): DOMRect | undefined => {
    //
    if (rectLast === undefined) return undefined;
    //
    const newRect: MutableDOMRect = { ...rect };

    for (const key in rect) {
        if (key in rect) {
            const value = rect[key as keyof DOMRect];
            const valueLast = rectLast[key as keyof DOMRect];
            if (typeof value === 'number' && typeof valueLast === 'number') {
                newRect[key as keyof MutableDOMRect] =
                    value + (value - valueLast) / timestampSub;
            }
        }
    }
    return newRect as DOMRect;
};

interface Props {
    id: string;
    dropData: DropData;
    handleDragStart: (id: string) => void;
    handleDrag: (props: DragData) => void;
}

const Drag: FC<Props> = props => {
    const [isDragging, setIsDragging] = useState<boolean>(false);

    // 要素の左上とカーソルの距離
    const [cooOffset, setCooOffset] = useState<Coordinate>({ x: 0, y: 0 });
    // 要素の左上の距離
    const [rectLast, setRectLast] = useState<DOMRect | undefined>(undefined);
    // ドラッグ中のタイムスタンプ
    const [timestamp, setTimestamp] = useState<number>(0);

    // ドラッグ要素
    const ref = useRef<HTMLDivElement>(null);

    // イベントハンドラ
    // ドラッグ開始
    const handlePointerDown = useCallback(
        (event: PointerEvent) => {
            if (!ref.current) return;
            // ドラッグを有効化
            setIsDragging(true);
            // ドラッグを追跡
            event.currentTarget.setPointerCapture(event.pointerId);
            // ビューポート表示領域からドラッグ要素の距離を取得
            const rect = event.currentTarget.getBoundingClientRect();
            // ビューポート表示領域から親要素の距離を取得
            const rectParent =
                event.currentTarget.parentElement?.getBoundingClientRect();
            // ドラッグ位置とドラッグ要素の位置の差を算出
            setCooOffset({
                x:
                    rectParent === undefined
                        ? event.clientX - rect.x
                        : event.clientX - rect.x - rectParent.x,
                y:
                    rectParent === undefined
                        ? event.clientY - rect.y
                        : event.clientY - rect.y - rectParent.y,
            });
            // ドラッグ要素の位置・サイズを取得
            setRectLast(rect);
            // タイムスタンプを取得
            setTimestamp(event.timeStamp);
            // ドロップ対象を更新
            props.handleDragStart(props.id);
            props.handleDrag({
                cooClient: { x: event.clientX, y: event.clientY },
                rect,
            });
        },
        [props.id, props.handleDragStart, props.handleDrag],
    );
    // ドラッグ中
    const handlePointerMove = useCallback(
        (event: PointerEvent) => {
            // ドラッグ中でないならキャンセル
            if (!(isDragging && ref.current)) return;
            // 親要素を取得
            const parent = event.currentTarget.parentElement;
            // 親要素がないならキャンセル
            if (!parent) return;
            // ビューポート表示領域からドラッグ要素の距離を取得
            const rect = ref.current.getBoundingClientRect();
            // ビューポート表示領域から親要素の距離を取得
            const rectParent = parent.getBoundingClientRect();
            // 親要素のスタイルを取得
            const styleParent = getComputedStyle(parent);
            // ドラッグ要素の位置を更新
            const newLeft =
                event.pageX -
                cooOffset.x -
                rectParent.x -
                Number.parseFloat(styleParent.marginLeft);
            const newTop =
                event.pageY -
                cooOffset.y -
                rectParent.y -
                Number.parseFloat(styleParent.marginTop);
            ref.current.style.left = `${newLeft}px`;
            ref.current.style.top = `${newTop}px`;
            // ドラッグ要素の位置・サイズを取得
            setRectLast(rect);
            // タイムスタンプを取得
            setTimestamp(event.timeStamp);
            // タイムスタンプの差を算出
            const timestampSub = (event.timeStamp - timestamp) / 100;
            // ドロップ対象を更新
            props.handleDrag({
                cooClient: { x: event.clientX, y: event.clientY },
                rect,
                rectNext: calculateNewRect(rect, rectLast, timestampSub),
            });
        },
        [
            isDragging,
            cooOffset.x,
            cooOffset.y,
            props.handleDrag,
            rectLast,
            timestamp,
        ],
    );
    // ドラッグ終了
    const handlePointerUp = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);
    }, [isDragging]);

    return (
        <div
            ref={ref}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            {...stylex.props(
                styles.base,
                isDragging && styles.dragging,
                props.dropData.dragStyles.base,
                isDragging && props.dropData.dragStyles.dragging,
            )}
        />
    );
};

export const PointerDrag = memo(Drag);
