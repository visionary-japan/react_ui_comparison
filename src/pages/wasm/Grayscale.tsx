import stylex from '@stylexjs/stylex';
import {
    type ChangeEvent,
    type FC,
    type RefObject,
    memo,
    useRef,
    useState,
} from 'react';
import { ButtonVite } from '../../components/button/ButtonVite';
import { DivCustom } from '../../components/div/DivCustom';
import { H1 } from '../../components/heading/H1';
import Worker from '../../utils/worker/grayscaleWorker.ts?worker';

const styles = stylex.create({
    input: {
        display: 'none',
    },
    label: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        border: 'none',
        borderRadius: '5px',
    },
    image: {
        maxWidth: '100%',
        maxHeight: '500px',
    },
    canvas: {
        maxWidth: '100%',
        maxHeight: '500px',
    },
});

const Component: FC = () => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [tsTime, setTsTime] = useState<number>(0);
    const [asTime, setAsTime] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const tsCanvasRef = useRef<HTMLCanvasElement>(null);
    const asCanvasRef = useRef<HTMLCanvasElement>(null);

    const workerRef = useRef<Worker>(new Worker());

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                const img = new Image();
                img.onload = () => {
                    setImage(img);
                };
                if (typeof e.target?.result === 'string') {
                    img.src = e.target.result;
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const processImage = (
        canvasRef: RefObject<HTMLCanvasElement>,
        type: 'ts' | 'as',
    ) => {
        if (!(image && canvasRef.current)) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
            );
            const pixels = imageData.data;

            workerRef.current?.postMessage({ pixels, type });
        }
    };

    const handleWorkerMessage = (event: MessageEvent) => {
        const { result, executionTime, type } = event.data;
        const canvasRef = type === 'ts' ? tsCanvasRef : asCanvasRef;
        const setTime = type === 'ts' ? setTsTime : setAsTime;
        //
        setTime(executionTime);
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const newImageData = new ImageData(
                    result,
                    canvas.width,
                    canvas.height,
                );
                ctx.putImageData(newImageData, 0, 0);
            }
        }
    };

    const handleGrayscale = () => {
        if (!image) return;
        processImage(tsCanvasRef, 'ts');
        processImage(asCanvasRef, 'as');
        workerRef.current.onmessage = handleWorkerMessage;
    };

    return (
        <div>
            <H1>Grayscale</H1>
            <DivCustom styleTypes={['margin']}>
                <input
                    type='file'
                    accept='image/*'
                    onChange={handleFileChange}
                    ref={inputRef}
                    id='imageInput'
                    {...stylex.props(styles.input)}
                />
                <label htmlFor='imageInput' {...stylex.props(styles.label)}>
                    画像を選択
                </label>
            </DivCustom>
            {image && (
                <div>
                    <DivCustom styleTypes={['margin']}>
                        {/* biome-ignore lint/a11y/useAltText: <explanation> */}
                        <img
                            src={image.src}
                            alt='Original'
                            {...stylex.props(styles.image)}
                        />
                    </DivCustom>
                    <DivCustom styleTypes={['margin']}>
                        <ButtonVite type='button' onClick={handleGrayscale}>
                            グレースケール化を実行
                        </ButtonVite>
                    </DivCustom>
                    <DivCustom styleTypes={['margin']}>
                        <h3>TypeScript版 ({tsTime.toFixed(2)} ms)</h3>
                        <canvas
                            ref={tsCanvasRef}
                            {...stylex.props(styles.canvas)}
                        />
                    </DivCustom>
                    <DivCustom styleTypes={['margin']}>
                        <h3>AssemblyScript版 ({asTime.toFixed(2)} ms)</h3>
                        <canvas
                            ref={asCanvasRef}
                            {...stylex.props(styles.canvas)}
                        />
                    </DivCustom>
                </div>
            )}
        </div>
    );
};

export const Grayscale = memo(Component);
