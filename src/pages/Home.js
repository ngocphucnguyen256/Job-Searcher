import ButtonAppBar from '../components/ButtonAppBar';
import CarouselComponent  from '../components/CarouselComponent';

export default function Home() {
  return (
    <>
        <header>
            <ButtonAppBar />
        </header>
        <body> 
            <main>
                <CarouselComponent />
            </main>
        </body>
    </>
  );
}
