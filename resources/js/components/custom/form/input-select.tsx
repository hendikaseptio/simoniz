import Select from 'react-select';
import InputError from '../../input-error';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

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
            singleValue: (provided) => ({
                ...provided,
                color: isDarkMode ? '#f9fafb' : '#111827',
            }),
            placeholder: (provided) => ({
                ...provided,
                color: isDarkMode ? '#9ca3af' : '#6b7280',
            }),
            input: (provided) => ({
                ...provided,
                color: isDarkMode ? '#f9fafb' : '#111827',
            }),
        }
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
                // className={error ? 'border-red-500' : isValid ? 'border-green-500' : ''}
                // className={cn(
                //     "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                //     "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                //     "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                // )}
                onBlur={() => setTouched(true)}
            />
            {error && <InputError message={error} />}
            {isValid && <p className="mt-1 text-sm text-green-500">Looks good!</p>}
        </div>
    );
};

export default InputSelect;
