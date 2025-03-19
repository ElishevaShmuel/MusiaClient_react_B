import React, { useState } from 'react';
import './upload.css';
import { Button } from '@mui/material';
import { CloudUploadIcon } from 'lucide-react';

const Upload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!file) {
            setMessage('אנא בחר קובץ להעלאה.');
            return;
        }
        // כאן ניתן להוסיף את הלוגיקה להעלאת הקובץ לשרת
        setMessage(`הקובץ "${file.name}" הועלה בהצלחה!`);
        setFile(null);
    };

    return (
        <div className="upload-container">
            <h2 className="upload-title">העלה שיר</h2>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                    </Button>
                  
                </div>
                <button type="submit" className="upload-button">
                    העלה
                </button>
            </form>
            {message && <p className="upload-message">{message}</p>}
        </div>
    );
};

export default Upload;
