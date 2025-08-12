import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import InputError from '../../input-error';

const InputSelect = ({ label, name, value, onChange, options = [], errors = {} }) => {
    const error = errors[name];
    const [wasInvalid, setWasInvalid] = useState(false);
    const [touched, setTouched] = useState(false);

    useEffect(() => {
        if (error) setWasInvalid(true);
    }, [error]);

    const isValid = wasInvalid && !error && touched;

    const handleChange = (selectedOption) => {
        setTouched(true);
        const fakeEvent = {
            target: {
                name,
                value: selectedOption ? selectedOption.value : '',
            },
        };
        onChange(fakeEvent);
    };

    const selectedValue = options.find((opt) => opt.value === value) || null;
    const getCustomStyles = (isError) => {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return {
            control: (provided, state) => ({
                ...provided,
                backgroundColor: 'var(--input)',
                borderColor: isError ? 'var(--destructive)' : 'var(--border)',
                borderRadius: 'var(--radius)',
                color: 'var(--card-foreground)',
                height: '2.25rem',
                fontSize: '0.875rem',
                boxShadow: state.isFocused ? `0 0 0 3px ${isError ? 'var(--destructive)/30' : 'var(--ring)'}` : undefined,
                transition: 'all 0.2s',
                ':hover': {
                    borderColor: isError ? 'var(--destructive)' : 'var(--ring)',
                },
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: 'var(--card)',
                color: 'var(--card-foreground)',
                zIndex: 10,
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? 'var(--muted)' : 'transparent',
                color: 'var(--foreground)',
                cursor: 'pointer',
            }),
            singleValue: (provided) => ({
                ...provided,
                color: isDarkMode ? '#f9fafb' : '#111827',
                fontWeight: 500,
            }),
            placeholder: (provided) => ({
                ...provided,
                color: isDarkMode ? '#818181' : '#747474',
            }),
            input: (provided) => ({
                ...provided,
                color: isDarkMode ? '#f9fafb' : '#111827',
            }),
        };
    };
    return (
        <div className="grid w-full space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Select
                id={name}
                name={name}
                options={options}
                value={selectedValue}
                onChange={handleChange}
                classNamePrefix="react-select"
                placeholder={`Pilih ${label}`}
                isClearable
                styles={getCustomStyles(!!error)}
                aria-invalid={!!error}
                onBlur={() => setTouched(true)}
            />
            {error && <InputError message={error} />}
            {isValid && <p className="mt-1 text-sm text-green-500">Looks good!</p>}
        </div>
    );
};

export default InputSelect;
