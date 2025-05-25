import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { CloudUploadIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { GetFiles, MusicFilesSlice, UploadFile } from '../../services/FilesFetch';
import { MusicFile } from '../../models/MusicFile';
import { User } from '../../models/User';

const Upload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state:any) => state.user.user) as User;
    let count=0 ;
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    // const handleSubmit = (event: React.FormEvent) => {
    //     event.preventDefault();
    //     if (!file) {
    //         setMessage('אנא בחר קובץ להעלאה.');
    //         return;
    //     }
    //     if(file.type !== "audio/mpeg"){
    //         setMessage("הקובץ לא תואם לפורמט mp3");
    //         return;
    //     }
    //     let f={Id:count++,FileName:file.name, MimeType:file.type, Size:file.size, FilePath:"", UserId:user.id.toString(),Cost:10} as MusicFile;
    //     dispatch(UploadFile(f))
    //    // setMessage(`הקובץ "${file.name}" הועלה בהצלחה!`);
    //     setFile(null);
    // };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            setMessage('אנא בחר קובץ להעלאה.');
            return;
        }
        if(file.type !== "audio/mpeg"){
            setMessage("הקובץ לא תואם לפורמט mp3");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = async (event) => {
            if (event.target && event.target.result) {
                const fileData = event.target.result as ArrayBuffer;
                let f = {Id:count++,FileName:file.name, MimeType:file.type, Size:file.size, FilePath:"", UserId:user.id,Cost:10} as MusicFile;
                dispatch(UploadFile({ file: fileData, metadata: f }));
                dispatch(GetFiles());
                setFile(null);
            }
        };
        reader.readAsArrayBuffer(file); // קריאת תוכן הקובץ
    };
    return (
        <div className="upload-container">
            <h2 className="upload-title">העלה שיר</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <div  className="form-group" style={{paddingBottom:'15px'}}>
                    <Button style={{backgroundColor:'rgba(74, 51, 77, 0.66)' }}
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                       
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange}
                            multiple
                        />
                    </Button>


                </div>
                <button type="submit" className="upload-button">
                    העלה
                </button>
            </form>
            {<p className="upload-message">{message}</p>}
        </div>
    );
};

export default Upload;
