import Pieces from '../Piece/Pieces';
import Files from './Files';
import Ranks from './Ranks';

export default function Board() {
  const boardRank = new Array(8).fill(0).map((_, i) => 8 - i);
  const files = new Array(8).fill(0).map((_, i) => String.fromCharCode(i + 97));

  return (
    <div className="board relative">
      <Ranks ranks={boardRank} />
      <div className="tile">
        {boardRank.map((rank, i) =>
          files.map((file, j) => (
            <div
              key={`${file}${rank}`}
              className={`${
                (i + j) % 2 === 0 ? 'bg-orange-300/50' : 'bg-slate-800/50'
              } text-xs text-slate-200 flex items-center justify-center`}
            ></div>
          ))
        )}
      </div>
      <Pieces />
      <Files files={files} />
    </div>
  );
}
