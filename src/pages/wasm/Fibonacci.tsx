import stylex from '@stylexjs/stylex';
import { type FC, type ReactNode, memo, useRef, useState } from 'react';
import { Hr } from '../../components/Hr';
import { ButtonVite } from '../../components/button/ButtonVite';
import { DivCustom } from '../../components/div/DivCustom';
import { H1 } from '../../components/heading/H1';
import Worker from '../../utils/worker/fibonacciWorker.ts?worker';

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
    const [tsRunning, setTsRunning] = useState<boolean>(false);
    const [asRunning, setAsRunning] = useState<boolean>(false);

    const workerRef = useRef<Worker>(new Worker());

    const handleRun = () => {
        if (tsRunning || asRunning) return;
        setTsRunning(true);
        setAsRunning(true);
        setSingleResultTs('計算中...');
        setSingleResultAs('計算中...');
        workerRef.current?.postMessage({ n, type: 'ts' });
        workerRef.current?.postMessage({ n, type: 'as' });
        workerRef.current.onmessage = (event: MessageEvent) => {
            const { result, executionTime } = event.data;
            if (event.data.type === 'ts') {
                setSingleResultTs(`${result} ( ${executionTime} ms )`);
                setTsRunning(false);
            } else {
                setSingleResultAs(`${result} ( ${executionTime} ms )`);
                setAsRunning(false);
            }
        };
    };

    const handleRun10 = async () => {
        if (tsRunning || asRunning) return;
        setTsRunning(true);
        setAsRunning(true);
        setMultiResultTs('計算中...');
        setMultiResultAs('計算中...');
        setTsAvgTime(0);
        setAsAvgTime(0);

        const tsResults: string[] = [];
        const asResults: string[] = [];
        let tsTotalTime = 0;
        let asTotalTime = 0;

        const promises = [];

        for (let i = 0; i < 10; i++) {
            promises.push(
                new Promise<void>(resolve => {
                    workerRef.current.postMessage({ n, type: 'ts', index: i });
                    workerRef.current.postMessage({ n, type: 'as', index: i });
                    workerRef.current.onmessage = (event: MessageEvent) => {
                        const { result, executionTime, type, index } =
                            event.data;
                        if (type === 'ts') {
                            tsTotalTime += executionTime;
                            tsResults[index] =
                                `${result} ( ${executionTime} ms )`;
                            const tsAverage = tsTotalTime / (index + 1);
                            setTsAvgTime(tsAverage);
                            setMultiResultTs(
                                <div>
                                    {tsResults.map((result, i) => (
                                        <div key={`ts-result-${i}-${result}`}>
                                            {result}
                                        </div>
                                    ))}
                                </div>,
                            );
                        } else {
                            asTotalTime += executionTime;
                            asResults[index] =
                                `${result} ( ${executionTime} ms )`;
                            const asAverage = asTotalTime / (index + 1);
                            setAsAvgTime(asAverage);
                            setMultiResultAs(
                                <div>
                                    {asResults.map((result, i) => (
                                        <div key={`as-result-${i}-${result}`}>
                                            {result}
                                        </div>
                                    ))}
                                </div>,
                            );
                        }
                        if (index === 9) resolve();
                    };
                }),
            );
        }

        await Promise.all(promises);

        setTsRunning(false);
        setAsRunning(false);
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
                <ButtonVite
                    type='button'
                    onClick={handleRun}
                    disabled={asRunning || tsRunning}
                >
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
                <ButtonVite
                    type='button'
                    onClick={handleRun10}
                    disabled={asRunning || tsRunning}
                >
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
