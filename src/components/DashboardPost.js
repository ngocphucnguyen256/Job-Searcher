import Dashboard from '../pages/Dashboard';
import PostComponent from './PostComponent';

const DashboardPost = (props) => {
    if(props.modify){
        return(
            <Dashboard>
                <PostComponent modify/>
            </Dashboard>
        )
    }
    return(
        <Dashboard>
            <PostComponent/>
        </Dashboard>
    )


}


export default DashboardPost