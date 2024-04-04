import type { StyleXStyles } from '@stylexjs/stylex';
import type { UserAuthoredStyles } from '@stylexjs/stylex/lib/StyleXTypes';
import type { HTMLAttributes } from 'react';

export interface Props extends HTMLAttributes<HTMLHeadingElement> {
    isLeft?: boolean;
    propsStyles?: StyleXStyles<UserAuthoredStyles>;
}
