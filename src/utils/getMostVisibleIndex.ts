export const getMostVisibleIndex = (target: HTMLElement) => {
    const rectTarget = target.getBoundingClientRect();
    const children = target.children;
    let maxVisibleArea = 0;
    let mostVisibleIndex: number | null = null;
    //
    for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLDivElement;
        const rectChild = child.getBoundingClientRect();
        const visibleWidth =
            Math.min(rectChild.right, rectTarget.right) -
            Math.max(rectChild.left, rectTarget.left);
        const visibleHeight =
            Math.min(rectChild.bottom, rectTarget.bottom) -
            Math.max(rectChild.top, rectTarget.top);
        const visibleArea =
            Math.max(0, visibleWidth) * Math.max(0, visibleHeight);

        if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            mostVisibleIndex = i;
        }
    }
    return mostVisibleIndex;
};
