import stylex from '@stylexjs/stylex';
import { type ChangeEvent, type FC, memo, useRef, useState } from 'react';
import { ButtonVite } from '../../components/button/ButtonVite';
import { DivCustom } from '../../components/div/DivCustom';
import { H1 } from '../../components/heading/H1';
import { grayscale as grayscaleAs } from '../../utils/wasm/assemblyscript/build/release';
import { grayscale as grayscaleTs } from '../../utils/wasm/grayscale';

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

    const handleGrayscale = () => {
        if (!image) return;

        // TypeScript
        if (tsCanvasRef.current) {
            const tsCanvas = tsCanvasRef.current;
            const tsCtx = tsCanvas.getContext('2d', {
                willReadFrequently: true,
            });
            if (tsCtx) {
                tsCanvas.width = image.width;
                tsCanvas.height = image.height;
                tsCtx.drawImage(image, 0, 0);
                const tsImageData = tsCtx.getImageData(
                    0,
                    0,
                    tsCanvas.width,
                    tsCanvas.height,
                );
                const tsPixels = tsImageData.data;

                const tsStartTime = performance.now();
                const tsResult = grayscaleTs(tsPixels);
                const tsEndTime = performance.now();
                setTsTime(tsEndTime - tsStartTime);

                const tsNewImageData = new ImageData(
                    tsResult,
                    tsCanvas.width,
                    tsCanvas.height,
                );
                tsCtx.putImageData(tsNewImageData, 0, 0);
            }
        }

        // AssemblyScript
        if (asCanvasRef.current) {
            const asCanvas = asCanvasRef.current;
            const asCtx = asCanvas.getContext('2d', {
                willReadFrequently: true,
            });
            if (asCtx) {
                asCanvas.width = image.width;
                asCanvas.height = image.height;
                asCtx.drawImage(image, 0, 0);
                const asImageData = asCtx.getImageData(
                    0,
                    0,
                    asCanvas.width,
                    asCanvas.height,
                );
                const asPixels = asImageData.data;

                const asStartTime = performance.now();
                const asResult = grayscaleAs(asPixels);
                const asEndTime = performance.now();
                setAsTime(asEndTime - asStartTime);

                const asNewImageData = new ImageData(
                    asResult,
                    asCanvas.width,
                    asCanvas.height,
                );
                asCtx.putImageData(asNewImageData, 0, 0);
            }
        }
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
