
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CkeditorHtml from '../components/CkeditorHtml';
import Item from '../components/Item';
import Tags from '../components/Tags'
import CommentList from '../components/CommentList';


export default function JobDetails(props) {
  return (
    <>
        <Header/>
            <main className="job-detail">
                <section className="header">
                    <h1>Nhân viên quản trị website</h1>
                    <h2>Cong ty ROUTINE VN - FASHION DESIGN & RETAILER</h2>
                    <Button variant="contained">Nộp đơn ứng tuyển ngay</Button>
                </section>
                <section className="body">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {Array.from(Array(6)).map((_, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Item><p className="heading">Kinh nghiem</p><p>2-4 Nam</p></Item>
                            </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <CkeditorHtml>
                    <h2>MÔ TẢ CÔNG VIỆC</h2>
                        <p>           
                        Responsible for updating information about products and images on the company's internal e-commerce website (Magento, Wordpress…) quickly and completely
                        Responsible for coordinating with the team, partners to provide the platform to set up promotions, landing pages...
                        Regularly control the information set up on the website, ensuring that the promotions take place stably
                        Collaborate with the Operation team to support the handling of customer and order issues
                        Collaborate with Content and SEO teams to optimize website systems and other platforms (Social, Growth Marketing Platform...)
                        Periodically report work performance to direct manager
                        YÊU CẦU CÔNG VIỆC
                        Bachelor or Degree in eCommerce/Business/Digital Marketing/IT
                        Minimum 2 years experience in similar position
                        Good English
                        Knowledge of e-Commerce, digital and SEO
                        Proficient in relevant software (MS Office Suite, Adobe…)
                        THÔNG TIN KHÁC
                        Bằng cấp: Cao đẳng
                        Độ tuổi: Không giới hạn tuổi
                        </p>
                    </CkeditorHtml>
                    <h2>JOB TAGS / SKILLS</h2>
                    <Tags/>
                    <CommentList/>
                </section>
            </main>
          <Footer/>
     
    </>
  );
}


