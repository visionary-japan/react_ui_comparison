import React, { type FC, memo, useState } from 'react';
import {
    DragDropContext,
    Draggable,
    type DropResult,
    Droppable,
} from 'react-beautiful-dnd';
import { DivCustom } from '../../components/div/DivCustom';
import { H1 } from '../../components/heading/H1';

interface QuoteType {
    id: string;
    content: string;
}

const initial: QuoteType[] = Array.from({ length: 10 }, (_, k) => k).map(k => {
    const custom: QuoteType = {
        id: `id-${k}`,
        content: `Quote ${k}`,
    };
    return custom;
});

const grid = 8;

const reorder = (
    list: QuoteType[],
    startIndex: number,
    endIndex: number,
): QuoteType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

const quoteItemStyle: React.CSSProperties = {
    width: '200px',
    border: '1px solid grey',
    marginBottom: `${grid}px`,
    backgroundColor: 'lightblue',
    padding: `${grid}px`,
};

interface QuoteProps {
    quote: QuoteType;
    index: number;
}

const Quote: FC<QuoteProps> = ({ quote, index }) => {
    return (
        <Draggable draggableId={quote.id} index={index} key={quote.id}>
            {provided => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={quoteItemStyle}
                >
                    {quote.content}
                </div>
            )}
        </Draggable>
    );
};

interface QuoteListProps {
    quotes: QuoteType[];
}

const QuoteList = React.memo(function QuoteList({ quotes }: QuoteListProps) {
    return (
        <>
            {quotes.map((quote: QuoteType, index: number) => (
                <Quote quote={quote} index={index} key={quote.id} />
            ))}
        </>
    );
});

interface AppState {
    quotes: QuoteType[];
}

const Component: FC = () => {
    const [state, setState] = useState<AppState>({ quotes: initial });

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const quotes = reorder(
            state.quotes,
            result.source.index,
            result.destination.index,
        );

        setState({ quotes });
    }

    return (
        <>
            <H1>react-beautiful-dnd</H1>
            <p>
                <a href='https://github.com/atlassian/react-beautiful-dnd'>
                    https://github.com/atlassian/react-beautiful-dnd
                </a>
            </p>
            <p>
                <a href='https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/about/examples.md'>
                    https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/about/examples.md
                </a>
            </p>
            <p>
                <a href='https://codesandbox.io/p/sandbox/zqwz5n5p9x?file=%2Fsrc%2Findex.js%3A3%2C38'>
                    https://codesandbox.io/p/sandbox/zqwz5n5p9x?file=%2Fsrc%2Findex.js%3A3%2C38
                </a>
            </p>
            <DivCustom styleTypes={['center', 'margin']}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='list'>
                        {provided => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                <QuoteList quotes={state.quotes} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </DivCustom>
        </>
    );
};

export const Beautiful = memo(Component);
