import stylex from '@stylexjs/stylex';
import type {
    StyleXStyles,
    UserAuthoredStyles,
} from '@stylexjs/stylex/lib/StyleXTypes';
import { type FC, memo } from 'react';

interface Props {
    url: string;
    src: string;
    alt: string;
    isSpin: boolean;
    styles?: StyleXStyles<UserAuthoredStyles>;
}

const spin = stylex.keyframes({
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
});

const styles = stylex.create({
    wrap: {
        position: 'relative',
    },
    a: {
        fontWeight: 500,
        color: {
            default: '#646cff',
            ':hover': '#535bf2',
        },
        textDecoration: 'inherit',
    },
    img: {
        height: '8em',
        padding: '2em',
        transition: 'filter 300ms',
        willChange: 'filter',
    },
    spin: {
        animationName: spin,
        animationDuration: '20s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'linear',
    },
});

const Component: FC<Props> = props => {
    return (
        <div {...stylex.props(styles.wrap)}>
            <a
                {...stylex.props(styles.a)}
                href={props.url}
                target='_blank'
                rel='noreferrer'
            >
                <img
                    {...stylex.props(
                        styles.img,
                        props.isSpin && styles.spin,
                        props.styles,
                    )}
                    src={props.src}
                    alt={props.alt}
                />
            </a>
        </div>
    );
};

export const Logo = memo(Component);
