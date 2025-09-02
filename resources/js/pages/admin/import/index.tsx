import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { CheckCircle2, Database, FileDown } from 'lucide-react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Reklame',
        href: '/admin/reklame',
    },
    {
        title: 'Import Data Reklame',
        href: '/admin/import',
    },
];

export default function Index() {
    const { preview, flash } = usePage().props;

    const handleDrop = async (acceptedFiles) => {
        const formData = new FormData();
        formData.append('file', acceptedFiles[0]);

        router.post(route('admin.import.preview'), formData);
    };

    const handleImport = () => {
        if (!preview?.rows) return;

        router.post(route('admin.import.confirm'), {
            data: preview.rows,
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Reklame" />
            <div className="snap-x p-5 space-y-5">
                {flash.success && (
                    <Alert className="border-teal-500 bg-teal-100 dark:bg-teal-950">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertTitle className="text-teal-600 dark:text-teal-400">Berhasil!</AlertTitle>
                        <AlertDescription>{flash.success}</AlertDescription>
                    </Alert>
                )}
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className="border-dashed border-2 p-10 text-center cursor-pointer mb-6">
                            <input {...getInputProps()} />
                            <p>Drag & drop file Excel di sini, atau klik untuk memilih</p>
                        </div>
                    )}
                </Dropzone>
                
                    <div className='flex justify-between'>
                        <p>Unduh contoh format Excel untuk diisi:</p>
                        <Link href="/docs/Contoh%20file%20import.xlsx" download><Button variant={'secondary'}><FileDown/> Download Contoh file excel</Button></Link>
                    </div>
                
                

                {preview && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Ringkasan File Import</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Total Baris: <strong>{preview.total}</strong></p>
                            <p>Kategori Billboard :
                                <div className="inline-flex gap-2">
                                    {preview.kategori.map((kat, idx) => (
                                        <Badge key={idx} variant={'secondary'} >{kat}</Badge>
                                    ))}
                                </div>
                            </p>
                            <div className="mt-3 space-y-3">
                                <div className="overflow-auto max-h-[400px] border rounded mt-4">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr>
                                                {preview.header.map((col) => (
                                                    <th key={col} className="border p-2">{col}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {preview.rows.slice(0, 10).map((row, idx) => (
                                                <tr key={idx}>
                                                    {preview.header.map((col) => (
                                                        <td key={col} className="border p-2">{row[col]}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <Button onClick={handleImport}>
                                    <Database /> Masukkan ke Database
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
