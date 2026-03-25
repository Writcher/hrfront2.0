import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#FFFF',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 11,
        maxWidth: 'none',
        borderRadius: '5px',
        padding: '0.5vw',
        border: '2px solid #ED6C02'
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: '#ED6C02',
      fontSize: '1.2rem'
    }
}));

export default LightTooltip;