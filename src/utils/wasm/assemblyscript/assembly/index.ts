// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
    return a + b;
}

// フィボナッチ
export function fibonacci(n: i32): i32 {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// export function fibonacci(n: i32): i32 {
//     if (n <= 1) {
//         return n;
//     }
//     let prev: i32 = 0;
//     let current: i32 = 1;
//     for (let i: i32 = 2; i <= n; i++) {
//         const temp = current;
//         current = prev + current;
//         prev = temp;
//     }
//     return current;
// }

//
export function grayscale(imageData: Uint8ClampedArray): Uint8ClampedArray {
    const len = imageData.length;
    const result = new Uint8ClampedArray(len);

    for (let i = 0; i < len; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];

        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b) as u32;

        result[i] = gray;
        result[i + 1] = gray;
        result[i + 2] = gray;
        result[i + 3] = imageData[i + 3]; // アルファ値はそのまま
    }

    return result;
}
