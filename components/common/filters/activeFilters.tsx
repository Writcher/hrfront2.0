import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from "@mui/material";

export function ActiveFilters({
    filters,
    activeFilters,
    handleCleanFilter
}: {
    filters: { key: string, variant: 'text' | 'select', util?: (id: number) => string }[],
    activeFilters: { [key: string]: string | number },
    handleCleanFilter: (key: string) => void
}) {
    return (
        <div className='shrink-0 w-full'>
            <div className='flex flex-row flex-wrap gap-2'>
                {Object.entries(activeFilters).map(([key, value]) => (
                    value !== 0 && value !== '' && value !== null && (
                        <div key={key} className='flex items-center gap-2 border-2 border-gray-700 pl-2 pr-1 py-1 rounded'>
                            <span className='text-gray-800 text-xs sm:text-sm'>
                                {(() => {
                                    const filter = filters.find(f => f.key === key);
                                    if (!filter) return null;
                                    if (filter.variant === 'text') return `${value}`;
                                    if (filter.variant === 'select') return `${filter.util!(Number(value))}`;
                                })()}
                            </span>
                            <IconButton
                                onClick={() => handleCleanFilter(key)}
                                className='!text-gray-700 hover:!text-red-600'
                                size='small'
                            >
                                <CloseRoundedIcon className='!text-sm' />
                            </IconButton>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};