export const castStrToBoolean = (s: string): boolean => {
    switch (s) {
        case 'true':
            return true;
        case 'TRUE':
            return true;
        default:
            return false;
    }
};
