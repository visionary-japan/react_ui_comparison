import stylex from '@stylexjs/stylex';
import { type FC, memo } from 'react';

const styles = stylex.create({
    base: {
        // display: 'flex',
        // flexDirection: 'column',
        position: 'relative',
        textAlign: 'center',
    },
    absolute: {
        position: 'absolute',
        width: 80,
        height: 80,
        backgroundColor: 'red',
        lineHeight: '80px',
        color: 'white',
        top: -50,
        '::before': {
            content: '"before"',
            position: 'absolute',
            width: 40,
            height: 40,
            backgroundColor: 'yellow',
            top: -20,
            left: -20,
            lineHeight: '40px',
            color: 'black',
        },
        '::after': {
            content: '"after"',
            position: 'absolute',
            width: 40,
            height: 40,
            backgroundColor: 'yellow',
            top: -20,
            right: -20,
            lineHeight: '40px',
            color: 'black',
        },
    },
});

const Component: FC = () => {
    return (
        <div {...stylex.props(styles.base)}>
            {/* 1 */}
            <div
                style={{
                    position: 'relative',
                    width: 200,
                    height: 200,
                    backgroundColor: 'gray',
                }}
            >
                relative
            </div>

            {/* 2 */}
            <div
                style={{
                    position: 'relative',
                    width: 200,
                    height: 200,
                    backgroundColor: 'white',
                    color: 'black',
                }}
            >
                {/* inline-text */}
                relative
                {/* fixed */}
                <div
                    style={{
                        position: 'fixed',
                        width: 100,
                        height: 100,
                        backgroundColor: 'green',
                        right: 0,
                        top: 0,
                        lineHeight: '100px',
                        color: 'white',
                    }}
                >
                    fixed
                </div>
                {/* relative */}
                <div
                    style={{
                        position: 'relative',
                        width: 250,
                        height: 60,
                        backgroundColor: 'blue',
                        lineHeight: '60px',
                        color: 'white',
                    }}
                >
                    relative
                </div>
                {/* absolute */}
                <div {...stylex.props(styles.absolute)}>absolute</div>
            </div>
        </div>
    );
};

export const Test = memo(Component);
