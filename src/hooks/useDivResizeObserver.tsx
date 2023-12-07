import { useEffect, useRef } from 'react';

export const useResizeObserver = (
    callback: (entries: ResizeObserverEntry[]) => void,
): React.RefObject<HTMLDivElement> => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const resizeObzerver = new ResizeObserver(entries => callback(entries));
        ref.current && resizeObzerver.observe(ref.current);
        return () => resizeObzerver.disconnect();
    }, [callback]);

    return ref;
};
