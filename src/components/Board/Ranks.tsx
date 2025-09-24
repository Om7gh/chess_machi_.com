export default function Ranks({ ranks }: { ranks: number[] }) {
  return (
    <div className="flex flex-col justify-around">
      {ranks.map((rank) => (
        <span key={rank}>{rank}</span>
      ))}
    </div>
  );
}
