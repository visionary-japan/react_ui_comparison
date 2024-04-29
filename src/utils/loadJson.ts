import { getEnv } from './getEnv';

const { baseUrl } = getEnv();

export const loadJson = async (src: string) => {
    const response = await fetch(baseUrl + src);
    return await response.json();
};
