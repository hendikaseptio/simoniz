import Select from 'react-select';
import { useEffect, useState } from 'react';
import InputError from '../../input-error';
import { multiValueCSS } from 'node_modules/react-select/dist/declarations/src/components/MultiValue';
import { Label } from '@/components/ui/label';

const InputMultiSelect = ({ label, name, value, onChange, options = [], errors = {} }) => {
    const error = errors[name];
    const [touched, setTouched] = useState(false);
    const [wasInvalid, setWasInvalid] = useState(false);

    useEffect(() => {
        if (error) setWasInvalid(true);
    }, [error]);

    const isValid = wasInvalid && !error && touched;

    const handleChange = (selectedOptions) => {
        setTouched(true);
        const selectedValues = selectedOptions ? selectedOptions.map((opt) => opt.value) : [];

        const fakeEvent = {
            target: {
                name,
                value: selectedValues,
            },
        };
        onChange(fakeEvent);
    };

    const selectedValues = options.filter((opt) => value?.includes(opt.value));
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
                boxShadow: state.isFocused
                    ? `0 0 0 3px ${isError ? 'var(--destructive)/30' : 'var(--ring)'}`
                    : undefined,
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
            multiValue: (provided) => ({
                ...provided,
                color: isDarkMode ? '#f9fafb' : '#111827',
                backgroundColor: 'var(--card)',
            }),
            placeholder: (provided) => ({
                ...provided,
                color: isDarkMode ? '#9ca3af' : '#6b7280',
            }),
            input: (provided) => ({
                ...provided,
                color: isDarkMode ? '#f9fafb' : '#111827',
            }),
            multiValueLabel: (provided) => ({
                ...provided,
                backgroundColor: 'var(--card)',
                color: 'var(--foreground)',
            }),
            multiValueRemove: (provided) => ({
                ...provided,
                backgroundColor: 'var(--card)',
                color: 'var(--muted-foreground)',
                ':hover': {
                    backgroundColor: isDarkMode ? 'var(--destructive)' : 'var(--card)',
                    color: isDarkMode ? 'var(--foreground)' : 'var(--secondary-foreground)',
                },
            }),
        }
    };
    return (
        <div className="grid w-full space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Select
                isMulti
                isClearable
                name={name}
                options={options}
                value={selectedValues}
                onChange={handleChange}
                styles={getCustomStyles(!!error)}
                aria-invalid={!!error}
                placeholder={`Pilih ${label}`}
                onBlur={() => setTouched(true)}
            />
            {error && <InputError message={error} />}
            {isValid && <p className="mt-1 text-sm text-green-500">Looks good!</p>}
        </div>
    );
};

export default InputMultiSelect;
