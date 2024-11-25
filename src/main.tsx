import React, { type FC } from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LinkIndex } from './components/link/LinkIndex.tsx';
import './main.css';
import { Button } from './pages/Button.tsx';
import { Index } from './pages/Index.tsx';
import { Public } from './pages/Public.tsx';
import { Query } from './pages/Query.tsx';
import { Beautiful } from './pages/dnd/Beautiful.tsx';
import { HTML5 } from './pages/dnd/HTML5.tsx';
import { Pointer } from './pages/dnd/Pointer.tsx';
// import { Sortablejs } from './pages/dnd/Sortablejs.tsx';
import { Scroll } from './pages/scroll/Scroll.tsx';
import { ScrollCss } from './pages/scroll/ScrollCss.tsx';
import { ScrollDiv } from './pages/scroll/ScrollDiv.tsx';
import { Fibonacci } from './pages/wasm/Fibonacci.tsx';
import { Grayscale } from './pages/wasm/Grayscale.tsx';
import { getEnv } from './utils/getEnv.ts';

const { rootName } = getEnv();

const App: FC = () => {
    return (
        <BrowserRouter basename={rootName}>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='btn' element={<Button />} />
                <Route path='dnd' element={<LinkIndex path='/dnd' />} />
                <Route path='dnd/htmlapi' element={<HTML5 />} />
                <Route path='dnd/pointer' element={<Pointer />} />
                {/* <Route path='dnd/sortablejs' element={<Sortablejs />} /> */}
                <Route path='dnd/beautiful' element={<Beautiful />} />
                <Route path='query' element={<Query />} />
                <Route path='public' element={<Public />} />
                <Route path='scroll' element={<Scroll />} />
                <Route path='scroll/div' element={<ScrollDiv />} />
                <Route path='scroll/css' element={<ScrollCss />} />
                <Route path='wasm' element={<LinkIndex path='/wasm' />} />
                <Route path='wasm/fibonacci' element={<Fibonacci />} />
                <Route path='wasm/grayscale' element={<Grayscale />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    );
};

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
