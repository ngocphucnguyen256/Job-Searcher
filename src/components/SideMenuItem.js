import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';





 const SideMenuItem =(props)=>{


    return(
        <Link to={props.link} className="deco-none black">
        <ListItemButton>
            <ListItemIcon>
              {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.name} />
        </ListItemButton>
      </Link>
    )
}


export default SideMenuItem