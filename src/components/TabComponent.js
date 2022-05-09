import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import JobItem from './JobItem'
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import CenterDiv from './CenterDiv';
import Api, { endpoints } from '../config/Api';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


function TabItem(props) {
    const { children, value, index, ...other } = props;
    return (
      <div className="tab-item">
          <JobItem data={props.data}/>
      </div>
    );
  }
  

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TabComponent() {
  const [value, setValue] = React.useState(0);
  const [posts, setPosts] = React.useState([])

  React.useEffect(() => {
      let loadPosts = async () => {
          let res = await Api.get(endpoints['posts'])
          setPosts(res.data.results)
      }
      
      loadPosts()
  
  }, [])


  console.log(posts)

  const formatDateList =  posts.map(post=>{
    let localdate = new Date(post.created_date);
    const copy ={date: localdate, ...post}
    return copy
  })

  let sortedDateList= formatDateList.sort((a,b) =>b.date.getTime() -  a.date.getTime())


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const numrows = 10;

  return (
    <Container maxWidth="">
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Việc làm nổi bật" {...a11yProps(0)} />
            <Tab label="Việc làm mới đăng" {...a11yProps(1)} />
            <Tab label="Việc làm dành cho bạn" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ width:'100%' }}>
            <Grid container spacing={1} >
                  {posts.map((item, index) =>
                  <Grid item xs={6} key={index} >
                      <TabItem data={item}/>
                  </Grid>
              )}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
        <Box sx={{ width:'100%' }}>
        <Grid container spacing={1} >
                  {sortedDateList.map((item, index) =>
                  <Grid item xs={6} key={index} >
                      <TabItem data={item}/>
                  </Grid>
              )}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <Box sx={{ width:'100%' }}>
          <Grid container spacing={1} >
                    {posts.map((item, index) =>
                    <Grid item xs={6} key={index} >
                        <TabItem data={item}/>
                    </Grid>
                )}
            </Grid>
          </Box>
        </TabPanel>
        
      </Box>
      <CenterDiv ><Pagination count={10} /></CenterDiv>
    </Container>
  );
}
