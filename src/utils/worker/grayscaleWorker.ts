import { grayscale as grayscaleAs } from '../../utils/wasm/assemblyscript/build/release';
import { grayscale as grayscaleTs } from '../../utils/wasm/grayscale';

self.onmessage = (event: MessageEvent) => {
    const { pixels, type } = event.data;
    const startTime = performance.now();
    const result = type === 'ts' ? grayscaleTs(pixels) : grayscaleAs(pixels);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    self.postMessage({ result, executionTime, type });
};
