// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
    return a + b;
}

export function fibonacci(n: i32): i32 {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
