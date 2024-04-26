export const getChildWidthes = (elem: HTMLDivElement) => {
    const children = Array.from(elem.children);
    return {
        childWidthes: children.map(child => child.clientWidth),
        childHeights: children.map(child => child.clientHeight),
    };
};
