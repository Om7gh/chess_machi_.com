import React, { useState } from 'react';

export default function TimerCustomization({
    setGameTimer,
}: {
    setGameTimer: React.Dispatch<React.SetStateAction<string>>;
}) {
    const [activeTime, setActiveTime] = useState<number | null>(null);
    const times = [60, 180, 300, 600, 900];

    const convertToTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const baseStyle =
        'bg-slate-600/50 hover:bg-violet-500 transition rounded px-4 py-2 text-slate-100 text-center';

    const activeStyle =
        'bg-violet-500 text-white rounded px-4 py-2 text-center transition';

    return (
        <div className="bg-slate-800/50 p-5 rounded-lg flex flex-col gap-2">
            <h2 className="text-xl text-center mb-2">Time Customization</h2>
            {times.map((time) => (
                <button
                    key={time}
                    onClick={() => {
                        setGameTimer(convertToTime(time));
                        setActiveTime(time);
                    }}
                    className={activeTime === time ? activeStyle : baseStyle}
                >
                    {convertToTime(time)}
                </button>
            ))}
        </div>
    );
}
