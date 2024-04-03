import { type RefObject, useCallback } from 'react';
import { scroller } from 'react-scroll';

export function useScrollSmooth() {
    // 指定位置に対してスムーススクロールする
    const scrollSmooth = useCallback(
        (
            refTarget: RefObject<HTMLDivElement>,
            top: number,
            containerId?: string,
        ) => {
            // 位置参照先の要素がないならキャンセル
            if (!refTarget.current) return;
            // 位置を設定
            refTarget.current.style.top = `${top}px`;
            // 設定位置にスムーススクロール
            scroller.scrollTo(refTarget.current.id, {
                duration: 500, // 500msかける
                delay: 0, // 即座に実行
                smooth: 'ease-in', // 最初の移動をゆっくりに
                containerId, // 親要素がある場合には指定
            });
        },
        [],
    );

    return { scrollSmooth };
}
