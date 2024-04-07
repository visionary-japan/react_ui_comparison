import stylex from '@stylexjs/stylex';
import React, { type FC, memo } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { H1 } from '../../components/heading/H1';

const draggableList = [
    {
        id: '01',
        name: '01',
    },
    {
        id: '02',
        name: '02',
    },
    {
        id: '03',
        name: '03',
    },
];

const styles = stylex.create({
    base: {
        minWidth: 180,
        padding: '10px 15px',
        margin: 'auto',
        cursor: 'pointer',
        background: 'rgb(71 119 214)',
        borderRadius: 6,
        marginBottom: {
            default: 8,
            ':last-child': 0,
        },
    },
});

const Component: FC = () => {
    const [list, setList] = React.useState(draggableList);

    return (
        <>
            <H1>DnD Sortable.js</H1>
            <ReactSortable
                list={list}
                setList={setList}
                animation={200}
                easing='ease-out'
            >
                {list.map(item => (
                    <div key={item.id} {...stylex.props(styles.base)}>
                        {item.name}
                    </div>
                ))}
            </ReactSortable>
        </>
    );
};

export const Sortablejs = memo(Component);
