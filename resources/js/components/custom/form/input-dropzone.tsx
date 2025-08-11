import { useDropzone } from 'react-dropzone';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

const Dropzone = ({
    name,
    label,
    onDrop,
    accept,
    multiple = false,
    errors = {},
    className = '',
    helperText = '',
    initialFile = null,
}) => {
    const error = errors?.[name];
    const [previewUrl, setPreviewUrl] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [touched, setTouched] = useState(false);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop: (files) => {
            setTouched(true);

            const file = files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
                setFileType(file.type);
            }

            onDrop?.(files);
        },
        accept,
        multiple,
    });

    useEffect(() => {
        if (initialFile && typeof initialFile === 'string') {
            setPreviewUrl(initialFile);
            const ext = initialFile.split('.').pop()?.toLowerCase();
            const typeMap = {
                pdf: 'application/pdf',
                doc: 'application/msword',
                docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
            };
            setFileType(typeMap[ext] || '');
        }
    }, [initialFile]);

    return (
        <div className="space-y-2">
            {label && <Label htmlFor={name}>{label}</Label>}

            <div
                {...getRootProps()}
                className={cn(
                    "border-2 border-dashed p-6 text-center rounded-md transition cursor-pointer bg-background",
                    isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300",
                    className,
                    error && "border-red-500 bg-red-50"
                )}
            >
                <input {...getInputProps()} id={name} name={name} />
                {isDragActive ? (
                    <p className="text-sm">Lepaskan file untuk mengunggah</p>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        Drag & drop file di sini, atau klik untuk memilih
                    </p>
                )}
                {helperText && <p className="text-xs text-muted-foreground mt-1">{helperText}</p>}
            </div>

            {error && <InputError message={error} />}

            {previewUrl && (
                <div className="mt-3">
                    {fileType?.startsWith('image/') && (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-60 rounded border"
                        />
                    )}
                    {fileType === 'application/pdf' && (
                        <embed
                            src={previewUrl}
                            type="application/pdf"
                            width="100%"
                            height="500px"
                            className="rounded border"
                        />
                    )}
                    {(fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                        fileType === 'application/msword') && (
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-blue-600"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 12h1.5l1 4 1-4H13l1 4 1-4H16v6h-1v-3l-1 3h-1l-1-3-1 3h-1l-1-3v3H8v-6z" />
                                </svg>
                                <span>Word document selected (preview not available)</span>
                            </div>
                        )}
                    {!fileType?.startsWith('image/') &&
                        fileType !== 'application/pdf' &&
                        fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
                        fileType !== 'application/msword' && (
                            <p className="text-sm text-gray-500">Preview not available for this file type.</p>
                        )}
                </div>
            )}
        </div>
    );
};

export default Dropzone;
