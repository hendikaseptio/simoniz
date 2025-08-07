import { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import InputError from '../../input-error';
import { Label } from '../../ui/label';

const InputEditor = ({ label, name, value, onChange, errors = {} }) => {
    const error = errors[name];
    const [touched, setTouched] = useState(false);
    const [wasInvalid, setWasInvalid] = useState(false);

    useEffect(() => {
        if (error) {
            setWasInvalid(true);
        }
    }, [error]);

    const isValid = wasInvalid && !error && touched;

    const handleEditorChange = (content) => {
        onChange({
            target: {
                name,
                value: content,
            },
        });
    };

    return (
        <div className="grid w-full space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <Editor
                apiKey="85fwartdzb1oj77nangt6lw8svcseapw8rjg44b8f43z9cf4"
                value={value}
                init={{
                    height: 500,
                    menubar: false,
                    plugins: ['advlist autolink lists link image charmap print preview anchor'],
                    toolbar:
                        'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={handleEditorChange}
                onFocus={() => setTouched(true)}
            />
            {error && <InputError message={error} />}
            {isValid && <p className="mt-1 text-sm text-green-500">Looks good!</p>}
        </div>
    );
};

export default InputEditor;
