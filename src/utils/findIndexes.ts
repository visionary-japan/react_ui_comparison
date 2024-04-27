type Type = (str: string, arr: string[][]) => number[];

export const findIndexes: Type = (str, arr) => {
    const indexes: number[] = [];
    arr.forEach((subArr, chapIdx) => {
        const pageIdx = subArr.indexOf(str);
        if (pageIdx !== -1) {
            indexes.push(chapIdx, pageIdx);
        }
    });
    return indexes;
};
