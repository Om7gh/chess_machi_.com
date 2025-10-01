import { HORIZONTAL_AXIS } from '../utils';

export default function Ranks() {
    return (
        <div className="flex justify-around w-[40vmax]">
            {HORIZONTAL_AXIS.map((row, i) => {
                return (
                    <div key={i} className="text-lg text-center my-2">
                        {row}
                    </div>
                );
            })}
        </div>
    );
}
