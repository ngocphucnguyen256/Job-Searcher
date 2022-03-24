import InputEmail from '../components/InputEmail'
import Button from '@mui/material/Button';

export default function SectionRegEmail() {

    return(
        <section className="reg-email">
            <div>
                <h2>Đăng ký theo dõi để nhận cập nhật về cơ hội việc làm mới và phù hợp nhất</h2>
                <div className='center-div'>
                <InputEmail/>
                <Button variant="contained">Đăng kí ngay</Button>
                </div>
            </div>
        </section>
    )

}
