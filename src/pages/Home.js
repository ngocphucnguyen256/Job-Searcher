import ButtonAppBar from '../components/ButtonAppBar';
import CarouselComponent  from '../components/CarouselComponent';
import TabComponent from '../components/TabComponent';

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
          </main>
     
    </>
  );
}
