import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import { ButtonViteAnchor } from '../../components/button/ButtonViteAnchor';
import { H1 } from '../../components/heading/H1';
import { stylesCommon } from './styles';

const styles = stylex.create({
    container: {
        overflowY: 'scroll',
        overscrollBehavior: 'none',
        scrollBehavior: 'smooth',
        scrollSnapType: 'y mandatory',
        height: '100lvh',
        width: '50svw',
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
    section1: {
        backgroundColor: '#ff6b6b',
    },
    section2: {
        backgroundColor: '#4ecdc4',
    },
    section3: {
        backgroundColor: '#ffe66d',
    },
    section4: {
        backgroundColor: '#ff9f43',
    },
    btnWrap: {
        position: 'sticky',
        right: 0,
        marginLeft: -160,
        top: 0,
        width: 0,
        height: '100lvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    btn: {
        textDecoration: 'none',
        marginBottom: 8,
    },
});

const Component: FC = () => {
    return (
        <>
            <div {...stylex.props(stylesCommon.wrap)}>
                <H1 propsStyles={stylesCommon.h1}>Scroll CSS</H1>
                <div {...stylex.props(styles.container)}>
                    <div {...stylex.props(styles.section, styles.section1)}>
                        <h1 id='section1'>Section 1</h1>
                    </div>
                    <div {...stylex.props(styles.section, styles.section2)}>
                        <h1 id='section2'>Section 2</h1>
                    </div>
                    <div {...stylex.props(styles.section, styles.section3)}>
                        <h1 id='section3'>Section 3</h1>
                    </div>
                    <div {...stylex.props(styles.section, styles.section4)}>
                        <h1 id='section4'>Section 4</h1>
                    </div>
                </div>
                <div {...stylex.props(styles.btnWrap)}>
                    <ButtonViteAnchor
                        href='#section1'
                        styles={{ ...styles.btn }}
                    >
                        To Section 1
                    </ButtonViteAnchor>
                    <ButtonViteAnchor
                        href='#section2'
                        styles={{ ...styles.btn }}
                    >
                        To Section 2
                    </ButtonViteAnchor>
                    <ButtonViteAnchor
                        href='#section3'
                        styles={{ ...styles.btn }}
                    >
                        To Section 3
                    </ButtonViteAnchor>
                    <ButtonViteAnchor
                        href='#section4'
                        styles={{ ...styles.btn }}
                    >
                        To Section 4
                    </ButtonViteAnchor>
                </div>
            </div>
        </>
    );
};

export const ScrollCss = memo(Component);
