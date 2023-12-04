import { useEffect, useRef } from 'react';

export const useResizeObserver = (
    callback: (entries: ResizeObserverEntry[]) => void,
) => {
    const ref = useRef(null);

    useEffect(() => {
        const resizeObzerver = new ResizeObserver(entries => callback(entries));
        ref.current && resizeObzerver.observe(ref.current);
        return () => resizeObzerver.disconnect();
    }, [callback]);

    return ref;
};
