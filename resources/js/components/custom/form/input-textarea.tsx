import { useEffect, useState } from 'react';
import InputError from '../../input-error';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const InputTextarea = ({ label, name, value, onChange, placeholder, errors = {} }) => {
    const error = errors[name];
    const [touched, setTouched] = useState(false);
    const [wasInvalid, setWasInvalid] = useState(false);

    useEffect(() => {
        if (error) {
            setWasInvalid(true);
        }
    }, [error]);

    const isValid = wasInvalid && !error && touched;

    return (
        <div className="grid w-full space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <textarea
                id={name}
                name={name}
                value={value}
                onChange={(e) => {
                    setTouched(true);
                    onChange(e);
                }}
                placeholder={placeholder}
                aria-invalid={!!error}
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input border-input flex min-h-[100px] w-full min-w-0 rounded-md border bg-input px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-input file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                )}
            />
            {error && <InputError message={error} />}
            {isValid && <p className="mt-1 text-sm text-green-500">Looks good!</p>}
        </div>
    );
};

export default InputTextarea;
