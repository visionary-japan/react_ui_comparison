import type { StyleXStyles } from '@stylexjs/stylex';
import stylex from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { type HTMLAttributes, forwardRef, memo } from 'react';

type TypedStylesKeys =
    | 'center'
    | 'flexCenter'
    | 'flexStart'
    | 'flexColumn'
    | 'gap'
    | 'margin'
    | 'margin2';

interface Props extends HTMLAttributes<HTMLDivElement> {
    styles?: StyleXStyles<UserAuthoredStyles>;
    styleTypes?: TypedStylesKeys[];
}

const typedStyles: Record<
    TypedStylesKeys,
    StyleXStyles<UserAuthoredStyles>
> = stylex.create({
    center: {
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexStart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
    },
    flexColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    gap: {
        gap: '1em',
    },
    margin: {
        margin: '1em',
    },
    margin2: {
        margin: '2em',
    },
});

const getTypedStyles = (
    styleTypes?: TypedStylesKeys[],
): StyleXStyles<UserAuthoredStyles> | undefined =>
    styleTypes?.reduce((accStyles, currentType) => {
        const styleToAdd = typedStyles[currentType];
        if (styleToAdd) {
            // Avoid the use of spread (`...`) syntax on accumulators.
            Object.assign(accStyles, styleToAdd);
        }
        return accStyles;
    }, {});

const Component = forwardRef<HTMLDivElement, Props>(
    ({ styles, styleTypes, children, ...attrs }, ref) => (
        <div
            ref={ref}
            {...attrs}
            {...stylex.props(getTypedStyles(styleTypes), styles)}
        >
            {children}
        </div>
    ),
);

export const DivCustom = memo(Component);
