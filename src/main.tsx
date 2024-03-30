import React from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LinkIndex } from './components/link/LinkIndex.tsx';
import './main.css';
import { Btn } from './pages/Btn.tsx';
import { Index } from './pages/Index.tsx';
import { Public } from './pages/Public.tsx';
import { Query } from './pages/Query.tsx';
import { HTML5 } from './pages/dnd/HTML5.tsx';
import { Pointer } from './pages/dnd/Pointer.tsx';
import { Sortablejs } from './pages/dnd/Sortablejs.tsx';

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='btn' element={<Btn />} />
                <Route path='dnd' element={<LinkIndex path='/dnd' />} />
                <Route path='dnd/htmlapi' element={<HTML5 />} />
                <Route path='dnd/pointer' element={<Pointer />} />
                <Route path='dnd/sortablejs' element={<Sortablejs />} />
                <Route path='query' element={<Query />} />
                <Route path='public' element={<Public />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
