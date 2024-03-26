import { type RefObject, useEffect } from 'react';

export function useResizeObserver<T extends Element>(
    ref: RefObject<T>,
    callback: ResizeObserverCallback,
) {
    useEffect(() => {
        const resizeObzerver = new ResizeObserver(callback);
        ref.current && resizeObzerver.observe(ref.current);
        return () => resizeObzerver.disconnect();
    }, [ref, callback]);
}
