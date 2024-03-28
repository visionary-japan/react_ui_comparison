import { type FC, memo } from 'react';
import { EXPORT_CONFIGS } from '/public/js/configs.js';

const Component: FC = () => {
    const windowConfigs = window.configs;

    return (
        <>
            {windowConfigs &&
                Object.keys(windowConfigs).map(key => (
                    <div key={key}>{windowConfigs?.[key]?.keyString}</div>
                ))}
            {EXPORT_CONFIGS &&
                Object.keys(EXPORT_CONFIGS).map(key => (
                    <div key={key}>{EXPORT_CONFIGS?.[key]?.keyString}</div>
                ))}
        </>
    );
};

export const Js = memo(Component);
