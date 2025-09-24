export default function Files({ files }: { files: string[] }) {
  return (
    <div className="file">
      {files.map((file: string) => (
        <span key={file}>{file}</span>
      ))}
    </div>
  );
}
