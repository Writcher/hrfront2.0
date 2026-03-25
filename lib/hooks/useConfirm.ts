import { useState } from "react"

export const useConfirm = () => {
    const [confirm, setConfirm] = useState<boolean>(false);

    const handleConfirm = (bool?: boolean) => {
        if (typeof bool === 'boolean') {
            setConfirm(bool)
        } else {
            setConfirm(!confirm)
        };
    };

    return {
        confirm,
        handleConfirm
    };
};