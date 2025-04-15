export function formatDateTime(date: Date): string {
    if(date === null || date === undefined) {
        return '';
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const HH = pad(date.getHours());
    const mm = pad(date.getMinutes());
    const ss = pad(date.getSeconds());

    return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
}

export function formatDate(date: Date): string {
    if(date === null || date === undefined) {
        return '';
    }
    if (typeof date === 'string') {
        date = new Date(date);
    }

    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());

    return `${yyyy}-${MM}-${dd}`;
}

const pad = (n: number) => n.toString().padStart(2, '0');