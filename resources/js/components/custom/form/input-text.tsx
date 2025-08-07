import { useEffect, useState } from 'react';
import InputError from '../../input-error';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const InputText = ({ label, name, type = 'text', value, onChange, placeholder, errors = {}, minLength,
    maxLength,
    pattern,
    max,
    min }) => {
    const error = errors[name];
    const [touched, setTouched] = useState(false);
    const [wasInvalid, setWasInvalid] = useState(false);


    // Track kalau field ini pernah error
    useEffect(() => {
        if (error) {
            setWasInvalid(true);
        }
    }, [error]);
    // Validasi Regex untuk input
    const validateRegex = () => {
        if (pattern && value && !new RegExp(pattern).test(value)) {
            return `Input does not match the pattern`;
        }
        return null;
    };

    // Validasi min/max length atau value
    const validateMinMax = () => {
        if (minLength && value.length < minLength) {
            return `Minimum length is ${minLength}`;
        }
        if (maxLength && value.length > maxLength) {
            return `Maximum length is ${maxLength}`;
        }
        if (min && parseFloat(value) < min) {
            return `Value must be at least ${min}`;
        }
        if (max && parseFloat(value) > max) {
            return `Value cannot be more than ${max}`;
        }
        return null;
    };
    // Gabungkan semua pesan error
    const validationErrors = [validateRegex(), validateMinMax()].filter(Boolean);
    // Cek valid status
    const isValid = wasInvalid && !error && touched;

    return (
        <div className="grid w-full space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                onBlur={() => setTouched(true)} // Menandakan bahwa input telah disentuh
                aria-invalid={!!error || validationErrors.length > 0}
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input border-input flex h-9 w-full min-w-0 rounded-md border bg-input px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-input file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                )}
            />
            {error && <InputError message={error}></InputError>}
            {validationErrors.length > 0 && validationErrors.map((msg, index) => (
                <InputError key={index} message={msg} />
            ))}
            {isValid && <p className="mt-1 text-sm text-green-500">Looks good!</p>}
        </div>
    );
};

export default InputText;
