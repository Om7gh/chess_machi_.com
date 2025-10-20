import { useState } from 'react';

export default function StartGame({
    setIsGameStarted,
}: {
    setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [roomId, setRoomId] = useState<string>('');

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    return (
        <div>
            <form onSubmit={submitForm}>
                <input type="text" placeholder="room id ..." />
            </form>
        </div>
    );
}
