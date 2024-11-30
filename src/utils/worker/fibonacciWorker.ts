import { fibonacci as fibonacciAs } from '../wasm/assemblyscript/build/release';
import { fibonacci as fibonacciTs } from '../wasm/fibonacci';

self.onmessage = (event: MessageEvent) => {
    const { n, type, index } = event.data;
    const startTime = performance.now();
    const result = type === 'ts' ? fibonacciTs(n) : fibonacciAs(n);
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    self.postMessage({ result, executionTime, type, index });
};
