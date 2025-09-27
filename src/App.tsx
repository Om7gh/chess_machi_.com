import Board from './components/Board';

export default function App() {
  return (
    <div className="App">
      <div className="bg-slate-950/80 h-screen backdrop-blur-2xl text-slate-100 grid place-content-center">
        <Board />
      </div>
    </div>
  );
}
