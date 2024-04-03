import { type FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { H1 } from '../heading/H1';

interface Props {
    path?: string;
}

const Component: FC<Props> = props => {
    const Dnd = () => (
        <ul>
            <li>
                <Link to='/dnd/pointer'>PointerEvents</Link>
            </li>
            <li>
                <Link to='/dnd/htmlapi'>HTML5 API</Link>
            </li>
            <li>
                <Link to='/dnd/sortablejs'>Sortable.js</Link>
            </li>
            <li>
                <Link to='/dnd/beautiful'>react-beautiful-dnd</Link>
            </li>
        </ul>
    );

    switch (props.path) {
        case '/dnd':
            return (
                <>
                    <H1>DnD</H1>
                    <Dnd />
                </>
            );
        default:
            return (
                <>
                    <ul>
                        <li>
                            <Link to='/'>Index</Link>
                        </li>
                        <ul>
                            <li>
                                <Link to='/dnd'>DnD</Link>
                            </li>
                            <Dnd />
                        </ul>
                        <ul>
                            <li>
                                <Link to='/btn'>Btn</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link to='/query'>Query</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link to='/public'>Public</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <Link to='/scroll'>Scroll</Link>
                            </li>
                        </ul>
                        <ul>
                            <li>Nav</li>
                        </ul>
                    </ul>
                </>
            );
    }
};

export const LinkIndex = memo(Component);
