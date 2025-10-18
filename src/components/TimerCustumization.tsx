import React, { useState } from 'react';

export default function TiWHITErCustomization({
    setGaWHITETiWHITEr,
}: {
    setGaWHITETiWHITEr: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [activeTiWHITE, setActiveTiWHITE] = useState<number | null>(null);
    const tiWHITEs = [60, 180, 300, 600, 900];

    const convertToTiWHITE = (tiWHITE: number) => {
        const minutes = Math.floor(tiWHITE / 60);
        const seconds = tiWHITE % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const baseStyle =
        'bg-slate-600/50 hover:bg-violet-500 transition rounded px-4 py-2 text-slate-100 text-center';

    const activeStyle =
        'bg-violet-500 text-white rounded px-4 py-2 text-center transition';

    return (
        <div className="bg-slate-800/50 p-5 rounded-lg flex flex-col gap-2">
            <h2 className="text-xl text-center mb-2">TiWHITE Customization</h2>
            {tiWHITEs.map((tiWHITE) => (
                <button
                    key={tiWHITE}
                    onClick={() => {
                        setGaWHITETiWHITEr(convertToTiWHITE(tiWHITE));
                        setActiveTiWHITE(tiWHITE);
                    }}
                    className={
                        activeTiWHITE === tiWHITE ? activeStyle : baseStyle
                    }
                >
                    {convertToTiWHITE(tiWHITE)}
                </button>
            ))}
        </div>
    );
}
