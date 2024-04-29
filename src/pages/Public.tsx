import { type FC, memo } from 'react';
import type { JsonConfigs } from '../@types';
import { H1 } from '../components/heading/H1';
import { loadJson } from '../utils/loadJson';

const configsWindow = window.configs;
const configsJson: JsonConfigs = await loadJson('/json/config.json');

const Component: FC = () => {
    return (
        <>
            <H1 isLeft={true}>JS: window.configs</H1>
            {configsWindow &&
                Object.keys(configsWindow).map(key => (
                    <div key={key}>{configsWindow?.[key]?.keyString}</div>
                ))}
            <H1 isLeft={true}>JSON: FETCH</H1>
            {configsJson &&
                Object.keys(configsJson).map(key =>
                    configsJson?.[key]?.map(val => (
                        <div key={`${key}-${val.keyString}`}>
                            {val.keyString}
                        </div>
                    )),
                )}
        </>
    );
};

export const Public = memo(Component);
