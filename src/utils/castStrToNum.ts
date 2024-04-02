export const castStrToNum = (s: string): number => {
    switch (s) {
        case 'NaN':
            return Number.NaN;
        default:
            return Number(s);
    }
};
