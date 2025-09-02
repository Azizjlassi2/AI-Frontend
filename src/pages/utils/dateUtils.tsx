export const formatDate = (iso?: string): string => {
    if (!iso) return '—';

    const d = new Date(iso);

    // Handle invalid date
    if (isNaN(d.getTime())) return '—';

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
};