export function useEnv() {
    const ROOT_NAME: string =
        import.meta.env.VITE_ROOT_NAME || 'BASE_PATH_DEFAULT';

    return { ROOT_NAME };
}
