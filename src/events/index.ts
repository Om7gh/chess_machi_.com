function draggableEvent (e : React.MouseEvent<HTMLDivElement>, boardRef : React.RefObject<HTMLDivElement | null>, setDraggablePiece: React.Dispatch<React.SetStateAction<HTMLElement | null>>, setActivePieceCoords: React.Dispatch<React.SetStateAction<{
    x: number;
    y: number;
} | null>>)
{
        const target = e.target as HTMLElement;
        const rect = boardRef.current?.getBoundingClientRect();

        if (target.classList.contains('piece') && rect) {
            const tileSize = rect.width / 8;
            const x = 7 - Math.floor((e.clientY - rect.top) / tileSize);
            const y = Math.floor((e.clientX - rect.left) / tileSize);

            setDraggablePiece(target);
            setActivePieceCoords({ x, y });

            target.style.position = 'absolute';
            target.style.width = '4vmax';
            target.style.height = '4vmax';
            target.style.pointerEvents = 'none';
            target.style.zIndex = '1000';

            const boardX = e.clientX - rect.left - target.offsetHeight / 2;
            const boardY = e.clientY - rect.top - target.offsetWidth / 2;

            target.style.left = `${boardX}px`;
            target.style.top = `${boardY}px`;
        }
}

export {draggableEvent}