// hooks/useFormHandler.js (atau .ts kalo TypeScript)
import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';

export default function useFormHandler<T extends Record<string, any>>(
    initialValues: T,
    postUrl: string,
    method: 'post' | 'put' | 'patch' | 'delete' = 'post'
) {
    const { errors } = usePage().props;
    const [values, setValues] = useState<T>(initialValues);
    const [processing, setProcessing] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const key = e.target.id || e.target.name;
        let value: any;

        if (e.target.type === 'file') {
            value = e.target.files?.length === 1 ? e.target.files[0] : e.target.files;
        } else if (e.target.type === 'checkbox') {
            value = e.target.checked;
        } else if (e.target.type === 'radio') {
            value = e.target.value;
        } else {
            value = e.target.value;
        }

        setValues((prev) => ({
            ...prev,
            [key]: value,
        }));
    }

    function setValue<K extends keyof T>(key: K, val: T[K]) {
        setValues((prev) => ({
            ...prev,
            [key]: val,
        }));
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setProcessing(true);
        router[method](postUrl, values, {
            onFinish: () => setProcessing(false),
            transform: (data) => {
                const formData = new FormData();
                Object.entries(data).forEach(([key, value]) => {
                    if (value instanceof File || value instanceof Blob) {
                        formData.append(key, value);
                    } else if (Array.isArray(value)) {
                        value.forEach((val, idx) => {
                            formData.append(`${key}[${idx}]`, val);
                        });
                    } else {
                        formData.append(key, value);
                    }
                });
                return formData;
            }
        });
    }

    return {
        values,
        errors,
        processing,
        handleChange,
        setValue,
        setValues,
        handleSubmit,
    };
}