import { useQuery } from '../../hooks/useQuery';

export function Query() {
    const { str, num, onChangeParams } = useQuery();

    return (
        <>
            <ul>
                <li>str: &quot;{str}&quot;</li>
                <li>num: {num}</li>
            </ul>
            <div style={{ display: 'flex' }}>
                <button
                    onClick={() => {
                        onChangeParams(str + 1, num);
                    }}
                >
                    str + 1
                </button>
                <button
                    onClick={() => {
                        onChangeParams(str.replace(/1(?!.*1)/, ''), num);
                    }}
                >
                    str - 1
                </button>
            </div>
            <div style={{ display: 'flex' }}>
                <button
                    onClick={() => {
                        onChangeParams(str, num + 1);
                    }}
                >
                    num + 1
                </button>
                <button
                    onClick={() => {
                        onChangeParams(str, num - 1);
                    }}
                >
                    num - 1
                </button>
            </div>
        </>
    );
}
