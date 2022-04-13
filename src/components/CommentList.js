
import CommentItem from './CommentItem'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';

const numrows = 10;


const data={
    'image' :"https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    'name':"Ngoc Phuc",
    "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aeneanluctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.Suspendisse congue vulputate lobortis. Pellentesque at interdumtortor. Quisque arcu quam, malesuada vel mauris et, posueresagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elitmetus, efficitur lobortis nisi quis, molestie porttitor metus.",
    "time":"2022-04-10T02:48:46.611Z"
}




const CommentList=()=> {
  return (
    <div  className="comment-list">
      <h2>COMMENTS</h2>
        <div className="fl">
            <Box
            sx={{
                    width: '90%',
            }}
            >
            <TextField fullWidth label="Write a comment" id="fullWidth" />
            </Box>
            <Button size="large" variant="contained" endIcon={<SendIcon />}>
                Send
            </Button>
        </div>
        
      {[...Array(numrows)].map((x, i) =>
                      <CommentItem key={i} data={data} />
              )}

    
    
    </div>
  );
}

export default CommentList
