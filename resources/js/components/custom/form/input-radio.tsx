import { useEffect, useState } from 'react';
import InputError from '../../input-error';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const InputRadioGroup = ({ label, name, value, onChange, options = [], errors = {} }) => {
    const error = errors[name];
    const [touched, setTouched] = useState(false);
    const [wasInvalid, setWasInvalid] = useState(false);

    useEffect(() => {
        if (error) {
            setWasInvalid(true);
        }
    }, [error]);

    const isValid = wasInvalid && !error && touched;

    const handleChange = (e) => {
        setTouched(true);
        onChange(e);
    };

    return (
        <div className="grid w-full space-y-2">
            <Label >{label}</Label>
            <div className="flex flex-col space-y-2">
                {options.map((opt) => (
                    <Label key={opt.value} className="inline-flex items-center space-x-2 cursor-pointer">
                        <div className="relative flex items-center">
                            <input
                                type="radio"
                                name={name}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={handleChange}
                                className="peer hidden"
                            />
                            <div
                                className={cn(
                                    "h-5 w-5 rounded-full border-2 flex items-center justify-center",
                                    error
                                        ? "border-red-500"
                                        : isValid
                                            ? "border-green-500"
                                            : "border-gray-300"
                                )}
                            >
                                {/* Inner dot */}
                                <div className="h-2.5 w-2.5 rounded-full bg-blue-600 scale-0 peer-checked:scale-100 transition-transform duration-200" />
                            </div>
                        </div>
                        <span className="text-sm">{opt.label}</span>
                    </Label>
                ))}
            </div>
            {error && <InputError message={error} />}
            {isValid && <p className="mt-1 text-sm text-green-500">Looks good!</p>}
        </div>
    );
};

export default InputRadioGroup;
