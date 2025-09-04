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

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | { target: { name: string; value: File | File[] } },
    ) {
        const key =
            (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)?.target?.id ||
            (e as { target: { name: string } })?.target?.name;
        let value: any;

        if ((e as React.ChangeEvent<HTMLInputElement>)?.target?.type === 'file') {
            value =
                (e as React.ChangeEvent<HTMLInputElement>)?.target?.files?.length === 1
                    ? (e as React.ChangeEvent<HTMLInputElement>)?.target?.files[0]
                    : (e as React.ChangeEvent<HTMLInputElement>)?.target?.files;
        } else if ((e as React.ChangeEvent<HTMLInputElement>)?.target?.type === 'checkbox') {
            value = (e as React.ChangeEvent<HTMLInputElement>)?.target?.checked;
        } else if ((e as { target: { value: File | File[] } })?.target?.value !== undefined && key === 'gambar') {
            value = (e as { target: { value: File | File[] } }).target.value;
        } else {
            value = (e as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)?.target?.value;
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

        const dataToSend = { ...values };
        if (!dataToSend.foto || dataToSend.foto.length === 0) {
            delete dataToSend.foto;
        }
        if (method !== 'post') {
            dataToSend._method = method;
        }
        router.post(postUrl, dataToSend, { 
            onFinish: () => setProcessing(false),
            forceFormData: true,
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
            },
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