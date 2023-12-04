import { useState } from 'react';
import viteLogo from '/vite.svg';
import './Defaults.css';
import reactLogo from './assets/react.svg';

export function Defaults() {
    const [count, setCount] = useState<number>(0);

    const handleClickButton = () => {
        setCount(count => count + 1);
    };

    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
                    <img src={viteLogo} className='logo' alt='Vite logo' />
                </a>
                <a href='https://react.dev' target='_blank' rel='noreferrer'>
                    <img
                        src={reactLogo}
                        className='logo react'
                        alt='React logo'
                    />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button type='button' onClick={handleClickButton}>
                    count is {count}
                </button>
            </div>
        </>
    );
}
