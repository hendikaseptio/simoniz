import InputMultiSelect from '@/components/custom/form/input-multi-select';
import InputSelect from '@/components/custom/form/input-select';
import InputText from '@/components/custom/form/input-text';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useFormHandler from '@/hooks/useFormHandler';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

import { Head, Link, usePage } from '@inertiajs/react';
import { AlertCircleIcon, ArrowLeft, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data Jadwal',
        href: '/admin/jadwal',
    },
    {
        title: 'Tambah Data Jadwal',
        href: '/admin/jadwal/create',
    },
];

export default function Create() {
    const { user, tim, reklame } = usePage().props
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Tim" />
            <div className="p-5 space-y-5">
                <Card>
                    <CardHeader><CardTitle>Form Tambah Jadwal</CardTitle></CardHeader>
                    <CardContent>
                        
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
