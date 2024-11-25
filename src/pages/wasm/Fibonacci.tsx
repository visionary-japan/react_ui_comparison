import stylex from '@stylexjs/stylex';
import { type FC, type ReactNode, memo, useState } from 'react';
import { Hr } from '../../components/Hr';
import { ButtonVite } from '../../components/button/ButtonVite';
import { DivCustom } from '../../components/div/DivCustom';
import { H1 } from '../../components/heading/H1';
import { fibonacci } from '../../utils/wasm/fibonacci';

const styles = stylex.create({
    input: {
        width: '96.5%',
    },
    th: {
        textAlign: 'right',
    },
    td: {
        textAlign: 'left',
    },
    tableBorder: {
        borderBottom: '1px solid #ccc',
    },
});

const Component: FC = () => {
    const [n, setN] = useState<number>(40);
    const [singleResultTs, setSingleResultTs] = useState<ReactNode>('実行待ち');
    const [singleResultAs, setSingleResultAs] = useState<ReactNode>('実行待ち');
    const [multiResultTs, setMultiResultTs] = useState<ReactNode>('実行待ち');
    const [multiResultAs, setMultiResultAs] = useState<ReactNode>('実行待ち');
    const [tsAvgTime, setTsAvgTime] = useState<number>(0);
    const [asAvgTime, setAsAvgTime] = useState<number>(0);

    const measureExecutionTime = (n: number): string => {
        const startTime = performance.now();
        const result = fibonacci(n);
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        return `${result} ( ${executionTime} ms )`;
    };

    const handleRun = () => {
        setSingleResultTs('計算中...');
        setSingleResultAs('計算中...');
        setSingleResultTs(measureExecutionTime(n));
        setSingleResultAs(measureExecutionTime(n));
    };

    const handleRun10 = async () => {
        setMultiResultTs('計算中...');
        setMultiResultAs('計算中...');
        setTsAvgTime(0);
        setAsAvgTime(0);

        const tsResults: string[] = [];
        const asResults: string[] = [];
        let tsTotalTime = 0;
        let asTotalTime = 0;

        for (let i = 0; i < 10; i++) {
            const startTimeTs = performance.now();
            const resultTs = fibonacci(n);
            const endTimeTs = performance.now();
            const executionTimeTs = endTimeTs - startTimeTs;
            tsTotalTime += executionTimeTs;
            tsResults.push(`${resultTs} ( ${executionTimeTs} ms )`);

            const startTimeAs = performance.now();
            const resultAs = fibonacci(n);
            const endTimeAs = performance.now();
            const executionTimeAs = endTimeAs - startTimeAs;
            asTotalTime += executionTimeAs;
            asResults.push(`${resultAs} ( ${executionTimeAs} ms )`);

            const tsAverage = tsTotalTime / (i + 1);
            const asAverage = asTotalTime / (i + 1);
            setTsAvgTime(tsAverage);
            setAsAvgTime(asAverage);

            setMultiResultTs(
                <div>
                    {tsResults.map((result, i) => (
                        <div key={`ts-result-${i}-${result}`}>{result}</div>
                    ))}
                </div>,
            );

            setMultiResultAs(
                <div>
                    {asResults.map((result, i) => (
                        <div key={`as-result-${i}-${result}`}>{result}</div>
                    ))}
                </div>,
            );

            // UIの更新を待つ
            await new Promise(resolve => setTimeout(resolve, 0));
        }
    };

    return (
        <div>
            <H1>Fibonacci</H1>
            <DivCustom styleTypes={['margin']}>
                <input
                    type='number'
                    value={n}
                    onChange={e => setN(Number(e.target.value))}
                    {...stylex.props(styles.input)}
                />
            </DivCustom>
            <DivCustom styleTypes={['margin']}>
                <ButtonVite type='button' onClick={handleRun}>
                    1回実行
                </ButtonVite>
            </DivCustom>
            <DivCustom styleTypes={['margin', 'center']}>
                <table>
                    <tbody>
                        <tr>
                            <th {...stylex.props(styles.th)}>TypeScript:</th>
                            <td {...stylex.props(styles.td)}>
                                {singleResultTs}
                            </td>
                        </tr>
                        <tr>
                            <th {...stylex.props(styles.th)}>
                                AssemblyScript:
                            </th>
                            <td {...stylex.props(styles.td)}>
                                {singleResultAs}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </DivCustom>
            <Hr />
            <DivCustom styleTypes={['margin']}>
                <ButtonVite type='button' onClick={handleRun10}>
                    10回実行
                </ButtonVite>
            </DivCustom>
            <DivCustom styleTypes={['margin', 'center']}>
                <table>
                    <tbody>
                        <tr>
                            <th
                                {...stylex.props(styles.th, styles.tableBorder)}
                            >
                                TypeScript:
                                <br />
                                平均: {tsAvgTime.toFixed(2)} ms
                            </th>
                            <td
                                {...stylex.props(styles.td, styles.tableBorder)}
                            >
                                {multiResultTs}
                            </td>
                        </tr>
                        <tr>
                            <th {...stylex.props(styles.th)}>
                                AssemblyScript:
                                <br />
                                平均: {asAvgTime.toFixed(2)} ms
                            </th>
                            <td {...stylex.props(styles.td)}>
                                {multiResultAs}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </DivCustom>
        </div>
    );
};

export const Fibonacci = memo(Component);
