import clsx from 'clsx';
import {
    type ComponentPropsWithRef,
    type ReactElement,
    cloneElement,
    forwardRef,
    isValidElement,
    memo,
} from 'react';

// https://zenn.dev/kiyoshiro9446/scraps/46b4e4be23bcde
type Props = {
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    leftIcon?: ReactElement;
    rightIcon?: ReactElement;
} & (
    | { asChild: true; children: ReactElement }
    | ({ asChild?: false } & ComponentPropsWithRef<'button'>)
);

const Component = forwardRef<HTMLButtonElement, Props>(
    (
        {
            variant = 'priamry',
            disabled,
            leftIcon,
            rightIcon,
            asChild = false,
            children,
            ...buttonProps
        },
        ref,
    ) => {
        const shouldActAsChild = asChild && isValidElement(children);
        return cloneElement(
            shouldActAsChild ? (
                disabled ? (
                    <div />
                ) : (
                    children
                )
            ) : (
                <button
                    ref={ref}
                    type='button'
                    disabled={disabled}
                    {...buttonProps}
                />
            ),
            {
                'data-variant': variant,
                className: clsx(
                    shouldActAsChild && children.props.className,
                    'className' in buttonProps && buttonProps.className,
                ),
                ...(disabled && { 'aria-disabled': true }),
            },
            leftIcon ? <span>{rightIcon}</span> : null,
            shouldActAsChild ? children.props.children : children,
            rightIcon ? <span>{rightIcon}</span> : null,
        );
    },
);

export const ButtonZenn = memo(Component);
