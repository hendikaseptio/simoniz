import { useEffect, useState } from 'react';
import imageCompression from 'browser-image-compression';
import InputError from '../../input-error';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

const InputFile = ({
    label,
    name,
    onChange,
    errors = {},
    accept,
    multiple = false,
    initialFile = null,
}) => {
    const error = errors[name];
    const [touched, setTouched] = useState(false);
    const [wasInvalid, setWasInvalid] = useState(false);
    const [previewUrls, setPreviewUrls] = useState([]);
    const [fileTypes, setFileTypes] = useState([]);

    useEffect(() => {
        if (error) {
            setWasInvalid(true);
        }
    }, [error]);

    useEffect(() => {
        if (initialFile && typeof initialFile === 'string') {
            setPreviewUrls([initialFile]);
            const ext = initialFile.split('.').pop()?.toLowerCase();
            const typeMap = {
                pdf: 'application/pdf',
                doc: 'application/msword',
                docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                jpg: 'image/jpeg',
                jpeg: 'image/jpeg',
                png: 'image/png',
            };
            setFileTypes([typeMap[ext] || '']);
        }
    }, [initialFile]);

    const handleFileChange = async (e) => {
        setTouched(true);
        const selectedFiles = multiple
            ? Array.from(e.target.files || [])
            : [e.target.files?.[0]].filter(Boolean);

        const compressedFiles = await Promise.all(
            selectedFiles.map(async (file) => {
                if (!file || !(file instanceof File)) return null;

                if (file.type.startsWith('image/') && file.size > 1024 * 1024) {
                    const options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1024,
                        useWebWorker: true,
                    };
                    try {
                        const compressed = await imageCompression(file, options);
                        return compressed;
                    } catch (err) {
                        console.error('Compress failed', err);
                        return file;
                    }
                }

                return file;
            })
        );

        const validFiles = compressedFiles.filter(Boolean);
        const urls = validFiles.map((file) => URL.createObjectURL(file));
        const types = validFiles.map((file) => file.type);

        // Revoke old previews
        previewUrls.forEach((url) => URL.revokeObjectURL(url));

        setPreviewUrls(urls);
        setFileTypes(types);

        // Forward to parent
        const finalValue = multiple ? validFiles : validFiles[0] || null;
        onChange({
            target: {
                name,
                value: finalValue,
            },
        });
    };

    const isValid = wasInvalid && !error && touched;

    return (
        <div className="grid w-full space-y-2">
            <Label htmlFor={name}>{label}</Label>
            <input
                type="file"
                id={name}
                name={name}
                onChange={handleFileChange}
                accept={accept}
                multiple={multiple}
                aria-invalid={!!error}
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input border-input flex h-9 w-full min-w-0 rounded-md border bg-input px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-input file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                )}
            />
            {error && <InputError message={error} />}
            {isValid && <p className="mt-1 text-sm text-green-500">Looks good!</p>}

            {previewUrls.length > 0 && (
                <div className="mt-3 space-y-4">
                    {previewUrls.map((url, idx) => {
                        const type = fileTypes[idx];

                        if (type?.startsWith('image/')) {
                            return (
                                <img
                                    key={idx}
                                    src={url}
                                    alt="Preview"
                                    className="max-h-60 rounded border"
                                />
                            );
                        }

                        if (type === 'application/pdf') {
                            return (
                                <embed
                                    key={idx}
                                    src={url}
                                    type="application/pdf"
                                    width="100%"
                                    height="500px"
                                    className="rounded border"
                                />
                            );
                        }

                        if (
                            type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
                            type === 'application/msword'
                        ) {
                            return (
                                <div
                                    key={idx}
                                    className="flex items-center space-x-2 text-sm text-gray-600"
                                >
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
                            );
                        }

                        return (
                            <p key={idx} className="text-sm text-gray-500">
                                Preview not available for this file type.
                            </p>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default InputFile;
