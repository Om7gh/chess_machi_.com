export default function Piece({
  i,
  j,
  piece,
}: {
  i: number;
  j: number;
  piece: string;
}) {
  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `${piece},${i},${j}`);
    setTimeout(() => {
      e.target.style.display = 'none';
    }, 0);
  };

  return (
    <div
      className={`piece ${piece} p-${i}${j}`}
      draggable={true}
      onDragStart={onDragStart}
    ></div>
  );
}
