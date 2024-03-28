import { type FC, memo } from 'react';
import { H1 } from '../../components/heading/H1';
import { Links } from '../../components/link/Links';

const Component: FC = () => {
    return (
        <>
            <H1>DnD</H1>
            <Links path='/dnd' />
        </>
    );
};

export const DndIndex = memo(Component);
