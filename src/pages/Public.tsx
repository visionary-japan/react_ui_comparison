import { type FC, memo, useEffect, useState } from 'react';
import type { JsonConfigs } from '../@types';
import { H1 } from '../components/heading/H1';

const Component: FC = () => {
    const windowConfigs = window.configs;
    const [json, setJson] = useState<JsonConfigs | null>(null);

    useEffect(() => {
        fetch('./json/config.json')
            .then(response => response.json())
            .then((val: JsonConfigs) => setJson(val))
            .catch(error => console.error('フェッチ失敗', error));
    }, []);

    return (
        <>
            <H1>JS: window.configs</H1>
            {windowConfigs &&
                Object.keys(windowConfigs).map(key => (
                    <div key={key}>{windowConfigs?.[key]?.keyString}</div>
                ))}
            <H1>JSON: FETCH</H1>
            {json &&
                Object.keys(json).map(key =>
                    json?.[key]?.map(val => (
                        <div key={`${key}-${val.keyString}`}>
                            {val.keyString}
                        </div>
                    )),
                )}
        </>
    );
};

export const Public = memo(Component);
