import Me from './components/Me';
import Opponent from './components/Opponent';
import Referee from './components/Referee';

export default function App() {
    return (
        <div className="App">
            <div className="bg-slate-900/80 h-screen backdrop-blur-2xl text-slate-100 grid place-content-center">
                <Opponent />
                <Referee />
                <Me />
            </div>
        </div>
    );
}
