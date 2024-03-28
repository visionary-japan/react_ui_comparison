import { type FC, memo } from 'react';
import { Link } from 'react-router-dom';

interface Props {
    path?: string;
}

const Component: FC<Props> = props => {
    const Dnd = () => (
        <ul>
            <li>
                <Link to='/dnd/pointer'>DnD Pointer</Link>
            </li>
            <li>
                <Link to='/dnd/htmlapi'>DnD HTML5 API</Link>
            </li>
            <li>
                <Link to='/dnd/sortablejs'>DnD Sortable.js</Link>
            </li>
        </ul>
    );

    switch (props.path) {
        case '/dnd':
            return <Dnd />;
        default:
            return (
                <div>
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
                            <li>Scroll</li>
                            <ul>
                                <li>Normal Scroll</li>
                                <li>Smooth Scroll</li>
                            </ul>
                        </ul>
                        <ul>
                            <li>
                                <Link to='/public'>Public</Link>
                            </li>
                        </ul>
                    </ul>
                </div>
            );
    }
};

export const Links = memo(Component);
