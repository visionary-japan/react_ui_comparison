/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/add
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function add(a: number, b: number): number;
/**
 * assembly/index/fibonacci
 * @param n `i32`
 * @returns `i32`
 */
export declare function fibonacci(n: number): number;
/**
 * assembly/index/grayscale
 * @param imageData `~lib/typedarray/Uint8ClampedArray`
 * @returns `~lib/typedarray/Uint8ClampedArray`
 */
export declare function grayscale(imageData: Uint8ClampedArray): Uint8ClampedArray;
