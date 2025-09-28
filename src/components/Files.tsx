import { VERTICAL_AXIS } from '../utils';

export default function Files() {
    return (
        <div className="absolute -left-4 flex flex-col justify-between h-[40vmax] items-center -ml-7 bg-slate-950/10 p-4">
            {VERTICAL_AXIS.map((file, i) => {
                const FilesNo = 9 - file;
                return (
                    <div key={i} className="text-lg text-center my-2">
                        {FilesNo}
                    </div>
                );
            })}
        </div>
    );
}
