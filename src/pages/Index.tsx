import stylex from '@stylexjs/stylex';
import {
    type ChangeEvent,
    type FC,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import logoVite from '/vite.svg';
import logoReact from '../assets/react.svg';
import { ButtonVite } from '../components/button/ButtonVite.tsx';
import { DivCustom } from '../components/div/DivCustom.tsx';
import { H1 } from '../components/heading/H1.tsx';
import { Logo } from '../components/image/Logo.tsx';
import { LinkIndex } from '../components/link/LinkIndex.tsx';
import { getEnv } from '../utils/getEnv.ts';

const styles = stylex.create({
    notProd: {
        display: 'none',
    },
    vite: {
        filter: { ':hover': 'drop-shadow(0 0 2em #646cffaa)' },
    },
    react: {
        filter: { ':hover': 'drop-shadow(0 0 2em #61dafbaa)' },
    },
});

const { rootName, anyNumber, isProd } = getEnv();
const wasmInstance = await WebAssembly.instantiateStreaming(
    fetch('./pkg/rust_wasm_bg.wasm'),
);

const Component: FC = () => {
    const [count, setCount] = useState<number>(anyNumber);

    const handleClickButton = () => {
        setCount(count => count + 1);
    };

    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const fetchWasm = () => {
            const { grayscale } = wasmInstance.instance.exports; //
            if (image && canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                ctx?.drawImage(image, 0, 0);

                const imageData = ctx?.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                );
                if (imageData) {
                    const grayData = (grayscale as Function)(
                        imageData.data,
                        image.width,
                        image.height,
                    );
                    const newImageData = new ImageData(
                        new Uint8ClampedArray(grayData),
                        canvas.width,
                        canvas.height,
                    );
                    ctx?.putImageData(newImageData, 0, 0);
                }
            }
        };
        fetchWasm();
    }, [image]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                const img = new Image();
                img.onload = () => setImage(img);
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div>
            <H1>{rootName.toUpperCase()}</H1>
            <DivCustom
                styleTypes={['flexCenter']}
                styles={!isProd && styles.notProd}
            >
                <Logo
                    url='https://vitejs.dev'
                    src={logoVite}
                    alt='Vite Logo'
                    styles={styles.vite}
                    isSpin={true}
                />
                <Logo
                    url='https://react.dev'
                    src={logoReact}
                    alt='React Logo'
                    styles={styles.react}
                    isSpin={true}
                />
            </DivCustom>
            <DivCustom styleTypes={['center', 'margin2']}>
                <ButtonVite type='button' onClick={handleClickButton}>
                    count is {count}
                </ButtonVite>
            </DivCustom>
            <LinkIndex />
            <input type='file' accept='image/*' onChange={handleImageChange} />
            {image && (
                <div>
                    <canvas ref={canvasRef} />
                </div>
            )}
        </div>
    );
};

export const Index = memo(Component);
