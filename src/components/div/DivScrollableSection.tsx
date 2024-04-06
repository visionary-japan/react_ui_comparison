import stylex from '@stylexjs/stylex';
import type { StyleXStyles } from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { type FC, type HTMLAttributes, type ReactNode, memo } from 'react';
import { stylesCommon } from './styles';

interface Section {
    id: string;
    children: ReactNode;
    styles?: StyleXStyles<UserAuthoredStyles>;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
    styles?: StyleXStyles<UserAuthoredStyles>;
    sections: Section[];
}

const styles = stylex.create({
    container: {
        overflowY: 'scroll',
        overscrollBehavior: 'none',
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory',
        height: '100lvh',
        width: '50lvw',
        marginLeft: -160,
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

const Component: FC<Props> = ({
    sections,
    styles: propsStyles,
    children,
    ...attrs
}) => {
    // セクションがないなら表示しない
    if (sections.length === 0) return <></>;

    return (
        <>
            <div {...attrs} {...stylex.props(stylesCommon.wrap, propsStyles)}>
                <div {...stylex.props(styles.container)}>
                    {sections.map(section => (
                        <div
                            key={section.id}
                            {...stylex.props(styles.section, section.styles)}
                        >
                            {section.children}
                        </div>
                    ))}
                </div>
                {children}
            </div>
        </>
    );
};

export const DivScrollableSection = memo(Component);
