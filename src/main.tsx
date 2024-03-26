import React from 'react';
import reactDom from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './main.css';
import { Btn } from './pages/btn/Btn.tsx';
import { DndHTML5 } from './pages/dnd/DndHTML5.tsx';
import { DndIndex } from './pages/dnd/DndIndex.tsx';
import { DndPointer } from './pages/dnd/DndPointer.tsx';
import { DndSortablejs } from './pages/dnd/DndSortablejs.tsx';
import { Index } from './pages/index/Index.tsx';
import { Query } from './pages/query/Query.tsx';

reactDom.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <Routes>
                <Route path='/' element={<Index />} />
                <Route path='btn' element={<Btn />} />
                <Route path='dnd' element={<DndIndex />} />
                <Route path='dnd/htmlapi' element={<DndHTML5 />} />
                <Route path='dnd/pointer' element={<DndPointer />} />
                <Route path='dnd/sortablejs' element={<DndSortablejs />} />
                <Route path='query' element={<Query />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
