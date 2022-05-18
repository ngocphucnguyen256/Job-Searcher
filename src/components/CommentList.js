
import CommentItem from './CommentItem'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// const numrows = 10;


// const data={
//     'image' :"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//     'name':"Ngoc Phuc",
//     "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aeneanluctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.Suspendisse congue vulputate lobortis. Pellentesque at interdumtortor. Quisque arcu quam, malesuada vel mauris et, posueresagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elitmetus, efficitur lobortis nisi quis, molestie porttitor metus.",
//     "time":"2022-04-10T02:48:46.611Z"
// }




const CommentList=(props)=> {




  return (
    <div  className="comment-list">
   
      <Typography variant="h2" textAlign="left" component="h2" >
      Bình luận
    </Typography>
        <div className="fl">
            <Box
            sx={{
                    width: '90%',
            }}
            >
            <TextField fullWidth label="Write a comment"
            onChange={(e)=>{
              props.setComment(e.target.value)
            }}
            value={props.comment} id="fullWidth" />
            </Box>
            <Button size="large" variant="contained" onClick={props.handlePostComment} endIcon={<SendIcon />}>
                Send
            </Button>
        </div>
        
            {props.data.map((item, index) =>
                  <CommentItem key={index} data={item} getComments={props.getComments}/>
              )}

    
    
    </div>
  );
}

export default CommentList
