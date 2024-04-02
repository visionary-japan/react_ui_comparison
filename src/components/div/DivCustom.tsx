import type { StyleXStyles } from '@stylexjs/stylex';
import stylex from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import { type FC, type HTMLAttributes, memo } from 'react';

type TypedStylesKeys = 'center' | 'flexCenter' | 'margin' | 'margin2';

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
    margin: {
        margin: '1em',
    },
    margin2: {
        margin: '2em',
    },
});

const getTypedStyles = (
    styleTypes?: TypedStylesKeys[],
): StyleXStyles<UserAuthoredStyles> | undefined => {
    return styleTypes?.reduce((accStyles, currentType) => {
        const styleToAdd = typedStyles[currentType];
        if (styleToAdd) {
            // Avoid the use of spread (`...`) syntax on accumulators.
            Object.assign(accStyles, styleToAdd);
        }
        return accStyles;
    }, {});
};

const Component: FC<Props> = ({ styles, styleTypes, children, ...attrs }) => (
    <div {...attrs} {...stylex.props(getTypedStyles(styleTypes), styles)}>
        {children}
    </div>
);

export const DivCustom = memo(Component);
