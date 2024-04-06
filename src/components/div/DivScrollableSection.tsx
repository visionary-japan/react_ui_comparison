import stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { type FC, type ReactNode, memo } from 'react';

interface Common {
    styles?: StyleXStyles<UserAuthoredStyles>;
}

// TODO ContainerとWrapperの違いがわかりにくい
interface Container extends Common {}
interface Wrapper extends Common {}
interface Section extends Common {
    id: string;
    children: ReactNode;
}

interface Props {
    wrapper?: Wrapper;
    container?: Container;
    sections: Section[];
    children?: ReactNode;
}

const styles = stylex.create({
    wrapper: {
        width: '100dvw',
        height: '100lvh',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    container: {
        overflowY: 'scroll',
        overscrollBehavior: 'none',
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory',
        height: '100lvh',
        width: '50lvw',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        '::-webkit-scrollbar': {
            width: 8,
        },
        '::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
        },
        '::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
        },
        '::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#555',
        },
    },
    section: {
        height: '100lvh',
        scrollSnapAlign: 'start',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '24px',
        color: 'white',
    },
});

const Component: FC<Props> = props => {
    // セクションがないなら表示しない
    if (props.sections.length === 0) return <></>;

    return (
        <>
            <div {...stylex.props(styles.wrapper, props.wrapper?.styles)}>
                <div
                    {...stylex.props(styles.container, props.container?.styles)}
                >
                    {props.sections.map(section => (
                        <div
                            key={section.id}
                            {...stylex.props(styles.section, section.styles)}
                        >
                            {section.children}
                        </div>
                    ))}
                </div>
                {props.children}
            </div>
        </>
    );
};

export const DivScrollableSection = memo(Component);
