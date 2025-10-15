import { useState } from 'react';
import Me from './components/Me';
import Opponent from './components/Opponent';
import Referee from './components/Referee';
import Customization from './components/Customization';

export default function App() {
    const [gameTimer, setGameTimer] = useState('3:00');
    return (
        <div className="App">
            <div className="bg-slate-900/80 h-screen backdrop-blur-2xl text-slate-100 grid place-content-center grid-cols-3">
                <Customization setGameTimer={setGameTimer} />
                <div className="w-[40vmax] col-span-2">
                    <Opponent gameTimer={gameTimer} />
                    <Referee />
                    <Me gameTimer={gameTimer} />
                </div>
            </div>
        </div>
    );
}
