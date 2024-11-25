export function grayscale(imageData: Uint8ClampedArray): Uint8ClampedArray {
    const len = imageData.length;
    const result = new Uint8ClampedArray(len);

    for (let i = 0; i < len; i += 4) {
        const r = imageData[i];
        const g = imageData[i + 1];
        const b = imageData[i + 2];

        const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

        result[i] = gray;
        result[i + 1] = gray;
        result[i + 2] = gray;
        result[i + 3] = imageData[i + 3]; // アルファ値はそのまま
    }

    return result;
}
