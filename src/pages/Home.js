import ButtonAppBar from '../components/ButtonAppBar';
import CarouselComponent  from '../components/CarouselComponent';
import TabComponent from '../components/TabComponent';
import SectionRegEmail from '../components/SectionRegEmail';
import SectionCompanies from '../components/SectionCompanies';
import Footer from '../partials/Footer'

export default function Home() {
  return (
    <>
        <header>
            <ButtonAppBar />
        </header>
     
          <main>
              <section>
                  <CarouselComponent />
                  
              </section>
              <section className="job-tab-wrapper">
                 <h2>Nhà tuyển dụng hàng đầu</h2>

                <TabComponent />
              </section>
              <section className="reg-email">
                <SectionRegEmail />
              </section>
              <SectionCompanies/>
          </main>
          <Footer/>
     
    </>
  );
}
