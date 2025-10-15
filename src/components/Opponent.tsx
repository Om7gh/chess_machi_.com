export default function Opponent({ gameTimer }: { gameTimer: string }) {
  console.log(gameTimer);
  return (
    <div className="w-full bg-slate-800 text-[1vmax] px-6 py-3 flex items-center gap-5 justify-between">
      <div className="flex items-center gap-5">
        <img
          src="https://avatar.iran.liara.run/public/29"
          alt="opponent"
          className="w-[3vmax] bg-slate-900 p-3 rounded-full"
        />
        <span>Opponent </span>
      </div>
      <div>
        <span className="text-[1.5vmax]">{gameTimer}</span>
      </div>
    </div>
  );
}
