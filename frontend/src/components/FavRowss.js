import React, {useState} from 'react';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

function FavRows({title, runTime, image, action}) {

    const [anchor, setAnchor] = useState(null)

    const openPop = (event) => {
        setAnchor(event.currentTarget);
    };

    const closePop = () => {
        setAnchor(null);
    };

    const open = Boolean(anchor);

    return (
        <>
            <td>
                <Typography aria-owns={open ? 'mouse-over-popover' : undefined} onMouseEnter={openPop}
                    onMouseLeave={closePop} aria-haspopup="true">{title}
                </Typography>
                <Popover id='mouse-over-popover' open={open} anchorEl={anchor}
                         anchorOrigin={{
                             vertical: 'bottom',
                             horizontal: 'center',
                         }}
                         transformOrigin={{
                             vertical: 'top',
                             horizontal: 'center',
                         }}
                         onClose={closePop}
                         disableRestoreFocus
                >
                    <h4>Pop ober</h4>
                </Popover>
            </td>
            <td>{runTime}</td>
            <td>
                <IconButton style={{color: 'red', float: 'center', size:'large'}} onClick={action}>
                    <HighlightOffOutlinedIcon/>
                </IconButton>
            </td>
        </>
    );
}

export default FavRows;
