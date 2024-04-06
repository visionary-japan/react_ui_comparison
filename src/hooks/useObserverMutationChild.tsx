import { useLayoutEffect, useRef, useState } from 'react';

export function useObserverMutationChild() {
    // 子要素
    const refChild = useRef<HTMLDivElement>(null);
    // 子要素の高さ
    const [heightChild, setHeightChild] = useState<number>(0);

    useLayoutEffect(() => {
        const target = refChild.current;
        if (!target) return;

        // 初期の高さを設定
        setHeightChild(target.scrollHeight);

        // MutationObserver のコールバック関数に型注釈を追加
        const callback = (mutations: MutationRecord[], _: MutationObserver) => {
            for (const mutation of mutations) {
                if (
                    mutation.type === 'childList' ||
                    mutation.type === 'attributes'
                ) {
                    setHeightChild(target.scrollHeight);
                }
            }
        };

        // MutationObserver の設定
        const config = { childList: true, subtree: true, attributes: true };
        const observer = new MutationObserver(callback);

        // 監視の開始
        observer.observe(target, config);

        // クリーンアップ関数
        return () => observer.disconnect();
    }, []);

    return { refChild, heightChild };
}
