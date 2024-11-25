export function fibonacci(n: number): number {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// この実装では、おおよそ 黄金数^n 回 (たとえば n=40 なら 4億回ほど) fibonacci 関数を実行するみたい
// https://ja.stackoverflow.com/questions/54887/%E3%83%95%E3%82%A3%E3%83%9C%E3%83%8A%E3%83%83%E3%83%81%E6%95%B0%E5%88%97%E3%81%AE%E8%A8%88%E7%AE%97%E9%87%8F%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
// なお、通常はメモ化や動的計画法などにより計算の効率を高める

// メモ化のコード例
// export function fibonacci(n: number, memo = new Map<number, number>()): number {
//     if (n <= 1) return n;
//     const memoized = memo.get(n);
//     if (memoized !== undefined) return memoized;
//     const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
//     memo.set(n, result);
//     return result;
// }

// 動的計画法 (itertive) のコード例
// export function fibonacci(n: number): number {
//     if (n <= 1) return n;

//     let a = 0;
//     let b = 1;
//     for (let i = 2; i <= n; i++) {
//         [a, b] = [b, a + b];
//     }
//     return b;
// }
