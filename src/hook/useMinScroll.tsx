import { useState, useEffect } from 'react';

export default function useMinScroll(threshold: number): boolean {
    const [isPastThreshold, setIsPastThreshold] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.pageYOffset || document.documentElement.scrollTop;
            setIsPastThreshold(currentPosition > threshold);
        };
        window.addEventListener('scroll', handleScroll);
        return () => { window.removeEventListener('scroll', handleScroll); };
    }, [threshold]);
    return isPastThreshold;
};

