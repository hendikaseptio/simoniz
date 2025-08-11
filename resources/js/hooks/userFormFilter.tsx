import { router } from '@inertiajs/react';
import { useState } from 'react';

export type FilterParams = Record<string, string | undefined>;

export function useFilterForm<T extends FilterParams>(
    initialValues: T,
    options?: {
        baseRoute?: string;
    },
) {
    const baseRoute = options?.baseRoute ?? window.location.pathname;

    const getInitialFromURL = () => {
        const params = new URLSearchParams(window.location.search);
        const entries = Object.fromEntries(params.entries());
        return {
            ...initialValues,
            ...entries,
        } as T;
    };

    const [data, setData] = useState<T>(getInitialFromURL());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submit = () => {
        const cleanData = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined && v !== ''));
        router.get(baseRoute, cleanData, {
            preserveScroll: true,
            preserveState: false,
            replace: true,
        });
    };

    const reset = () => {
        setData(initialValues);
        router.get(
            baseRoute,
            {},
            {
                preserveScroll: true,
                preserveState: false,
                replace: true,
            },
        );
    };

    return {
        data,
        setData,
        handleChange,
        submit,
        reset,
    };
}
