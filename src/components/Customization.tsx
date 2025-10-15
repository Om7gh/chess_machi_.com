import PieceCustomization from './PieceCustomization';
import TimerCustumization from './TimerCustumization';

interface customizationProps {
    setGameTimer: React.Dispatch<React.SetStateAction<string>>;
}

export default function Customization({ setGameTimer }: customizationProps) {
    return (
        <div className="w-[20vmax] m-auto bg-slate-950/50 h-[40vmax] ring-2 ring-violet-900 p-3">
            <TimerCustumization setGameTimer={setGameTimer} />
            <PieceCustomization />
        </div>
    );
}
