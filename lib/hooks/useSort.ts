import { useState } from "react";

export const useSort = ({ col }: { col: string }) => {
    const [direction, setDirection] = useState<'ASC' | 'DESC'>('DESC');
    const [column, setColumn] = useState<string>(col);

    const handleSort = (newColumn: string) => {
        const newDirection = column === newColumn && direction === 'ASC' ? 'DESC' : 'ASC';
        setColumn(newColumn);
        setDirection(newDirection);
    };

    return {
        direction,
        column,
        handleSort
    };
};