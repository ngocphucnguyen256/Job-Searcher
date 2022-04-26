
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CkeditorComponent=({setDataCkeditor}) =>{
    


 
        return (
            <div >
      
                <CKEditor className="ckeditor"
                    editor={ ClassicEditor }
                    data=""
              
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        // console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={( event, editor)=>{
                        const data = editor.getData();
                        setDataCkeditor(data)
                    }}
                    onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', editor );
                    } }
                />
            </div>
        );
 
}

export default CkeditorComponent;
