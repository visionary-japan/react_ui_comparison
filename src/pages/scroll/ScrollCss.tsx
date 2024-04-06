import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';
import { ButtonViteAnchor } from '../../components/button/ButtonViteAnchor';
import { DivScrollableSection } from '../../components/div/DivScrollableSection';
import { H2 } from '../../components/heading/H2';
import { H3 } from '../../components/heading/H3';
import { stylesCommon } from './styles';

const styles = stylex.create({
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
            <DivScrollableSection
                sections={[
                    {
                        id: 'section1',
                        children: <H3 id='section1'>Section 1</H3>,
                        styles: styles.section1,
                    },
                    {
                        id: 'section2',
                        children: <H3 id='section2'>Section 2</H3>,
                        styles: styles.section2,
                    },
                    {
                        id: 'section3',
                        children: <H3 id='section3'>Section 3</H3>,
                        styles: styles.section3,
                    },
                    {
                        id: 'section4',
                        children: <H3 id='section4'>Section 4</H3>,
                        styles: styles.section4,
                    },
                ]}
            >
                <H2 propsStyles={stylesCommon.h2}>With CSS</H2>
                <div {...stylex.props(styles.btnWrap)}>
                    <ButtonViteAnchor
                        size='small'
                        href='#section1'
                        styles={{ ...styles.btn }}
                    >
                        To Section 1
                    </ButtonViteAnchor>
                    <ButtonViteAnchor
                        size='small'
                        href='#section2'
                        styles={{ ...styles.btn }}
                    >
                        To Section 2
                    </ButtonViteAnchor>
                    <ButtonViteAnchor
                        size='small'
                        href='#section3'
                        styles={{ ...styles.btn }}
                    >
                        To Section 3
                    </ButtonViteAnchor>
                    <ButtonViteAnchor
                        size='small'
                        href='#section4'
                        styles={{ ...styles.btn }}
                    >
                        To Section 4
                    </ButtonViteAnchor>
                </div>
            </DivScrollableSection>
        </>
    );
};

export const ScrollCss = memo(Component);
