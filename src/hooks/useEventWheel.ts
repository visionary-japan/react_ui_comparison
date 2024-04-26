import { type RefObject, useEffect } from 'react';

const WHEEL_DURATION = 300;
let wheelTimeoutid: number | null = null;

export const useEventWheel = (
    ref: RefObject<HTMLElement>,
    callbackWheel: () => void,
    callbackEnd: () => void,
) => {
    //
    const handleWheel = (e: WheelEvent) => {
        // 要素がないならキャンセル
        if (!ref.current) return;
        // 実行中の処理を実行
        callbackWheel();
        // デフォルトのスクロールを無効化
        e.preventDefault();
        //
        ref.current.scrollLeft += e.deltaX;
        ref.current.scrollTop += e.deltaY;
        // タイムアウトを設定済みならクリア
        if (wheelTimeoutid) clearTimeout(wheelTimeoutid);
        // タイムアウトを設定
        wheelTimeoutid = setTimeout(callbackEnd, WHEEL_DURATION);
    };
    //
    useEffect(() => {
        ref.current?.addEventListener('wheel', handleWheel, {
            passive: false,
        });
        return () => {
            ref.current?.removeEventListener('wheel', handleWheel);
        };
    }, [ref, handleWheel]);
};
