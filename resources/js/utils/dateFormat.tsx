export const TanggalIndo = (tanggal: string | Date, withTime: boolean = false): string => {
    if (!tanggal) return '-';

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        ...(withTime && { hour: '2-digit', minute: '2-digit' }),
    };

    return new Intl.DateTimeFormat('id-ID', options).format(new Date(tanggal));
};