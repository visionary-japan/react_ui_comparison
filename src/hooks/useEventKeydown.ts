import { type RefObject, useEffect } from 'react';

const KEYDOWN_DURATION = 300;
const KEYDOWN_IGNORE_TAGNAMES = ['INPUT', 'TEXTAREA'];
let keydownTimestamp = 0;

interface Trigger {
    key: string;
    callback: () => void;
}

export const useEventKeydown = (
    triggers: Trigger[],
    ref?: RefObject<HTMLElement>,
) => {
    //
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.isComposing) return; // 変換中ならキャンセル
        const tagName = (e.target as HTMLElement).tagName; // 入力対象のタグ名を取得
        if (KEYDOWN_IGNORE_TAGNAMES.includes(tagName)) return; // タグ名が無視リストにあるならキャンセル
        if (triggers.map(t => t.key).includes(e.key)) e.preventDefault(); // デフォルトの動作を無効化
        const sub = e.timeStamp - keydownTimestamp; // 時間間隔を取得
        if (sub < KEYDOWN_DURATION) return; // 間隔が一定以下ならキャンセル
        keydownTimestamp = e.timeStamp; // 最終実行時間を更新
        // 入力に応じたコールバックを実行
        for (const trigger of triggers) {
            if (trigger.key === e.key) {
                trigger.callback();
            }
        }
    };
    //
    useEffect(() => {
        if (ref?.current) {
            ref.current.addEventListener('keydown', handleKeydown, true);
        } else {
            window.addEventListener('keydown', handleKeydown, true);
        }
        return () => {
            if (ref?.current) {
                ref.current.removeEventListener('keydown', handleKeydown, true);
            } else {
                window.removeEventListener('keydown', handleKeydown, true);
            }
        };
    }, [ref, handleKeydown]);
};
