import { useCallback, useState } from "react";
import { useDidUpdate } from '@mantine/hooks';
export default function useDebounceFn(func: Function, delay: number): Function {
    const [refresh, setRefresh] = useState(false);
    const [args, setArgs] = useState<any[]>([]);
    let timer: number;

    useDidUpdate(() => {
        func(...args);
    }, [refresh]);

    return useCallback((...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setRefresh(!refresh);
            setArgs([...args]);
        }, delay);
    }, [refresh]);
}