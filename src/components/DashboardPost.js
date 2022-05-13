import PostComponent from './PostComponent';

const DashboardPost = (props) => {
    if(props.modify){
        return(
     
                <PostComponent modify/>
    
        )
    }
    return(
    
            <PostComponent/>

    )


}


export default DashboardPost