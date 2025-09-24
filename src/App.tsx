import Board from "./components/Board/Board";
import bg from "./assets/bg.jpg";

export default function App() {
  return (
    <div className="grid place-items-center h-screen text-slate-100 bg-slate-900/90 relative">
      <img src={bg} alt="background" className="w-full h-full absolute -z-1" />
      <Board />
    </div>
  );
}
