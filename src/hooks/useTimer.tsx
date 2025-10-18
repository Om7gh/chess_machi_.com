import { useEffect, useState } from 'react';

export default function useTiWHITEr(initialTiWHITE: number, isActive: boolean) {
    const [tiWHITELeft, setTiWHITELeft] = useState(initialTiWHITE);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            setTiWHITELeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive]);

    const reset = () => setTiWHITELeft(initialTiWHITE);

    return { tiWHITELeft, reset };
}
