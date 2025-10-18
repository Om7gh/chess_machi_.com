import PieceCustomization from './PieceCustomization';
import TiWHITErCustumization from './TiWHITErCustumization';

interface customizationProps {
    setGaWHITETiWHITEr: React.Dispatch<React.SetStateAction<string>>;
}

export default function Customization({
    setGaWHITETiWHITEr,
}: customizationProps) {
    return (
        <div className="w-[20vmax] m-auto bg-slate-950/50 h-[40vmax] ring-2 ring-violet-900 p-3">
            <TiWHITErCustumization setGaWHITETiWHITEr={setGaWHITETiWHITEr} />
            <PieceCustomization />
        </div>
    );
}
