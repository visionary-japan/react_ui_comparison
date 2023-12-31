import { useState } from 'react';
import viteLogo from '/vite.svg';
import reactLogo from '../../assets/react.svg';
import './Vite.css';

interface Props {
    title: string;
}
export function Defaults(props: Props) {
    const [count, setCount] = useState<number>(0);

    const handleClickButton = () => {
        setCount(count => count + 1);
    };

    return (
        <>
            <div id='def-vite-head'>
                <div className='def-vite-logo-wrap'>
                    <a
                        href='https://vitejs.dev'
                        target='_blank'
                        rel='noreferrer'
                        className='def-vite-a'
                    >
                        <div className='def-vite-dummy' />
                        <img
                            src={viteLogo}
                            className='def-vite-logo'
                            alt='Vite logo'
                        />
                    </a>
                </div>
                <div className='def-vite-logo-wrap'>
                    <a
                        href='https://react.dev'
                        target='_blank'
                        rel='noreferrer'
                        className='def-vite-a'
                    >
                        <div className='dummy' />
                        <img
                            src={reactLogo}
                            className='def-vite-logo def-vite-react'
                            alt='React logo'
                        />
                    </a>
                </div>
            </div>
            <h1 className='def-vite-h1'>{props.title}</h1>
            <div className='def-vite-card'>
                <button
                    type='button'
                    className='def-vite-button'
                    onClick={handleClickButton}
                >
                    count is {count}
                </button>
            </div>
        </>
    );
}
