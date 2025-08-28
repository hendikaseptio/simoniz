import { useEffect, useState } from 'react';
import InputError from '../../input-error';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const InputRadioInline = ({ label, name, value, onChange, options = [], errors = {} }) => {
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
            <div className="grid grid-cols-2 gap-4">
                {options.map((opt) => (
                    <Label key={opt.value} className="inline-flex items-center space-x-2 cursor-pointer p-3 border rounded-lg">
                        <div className="relative flex items-center">
                            <input
                                type="radio"
                                name={name}
                                value={opt.value}
                                checked={value === opt.value}
                                onChange={handleChange}
                                className="sr-only"
                            />
                        </div>
                        <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${value === opt.value ? 'border-primary' : 'border-secondary'}`}
                        >
                            {value === opt.value && (
                                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                            )}
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

export default InputRadioInline;
