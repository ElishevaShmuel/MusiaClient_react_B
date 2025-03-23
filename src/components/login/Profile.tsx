import React, { useState } from 'react';
import Upload from '../musicFiles/Upload';

import UserFilesList from '../musicFiles/UserFilesList';

const Profile: React.FC = () => {
   const [onclicked,SetOnclicked]=useState(false)
    const onclick = () => {
        SetOnclicked(true)
    };
    return (
        <>
      
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Profile Page</h1>
            <p>Welcome to your profile!</p>
            <div>
                <h2>Your Details</h2>
                <p>Name: John Doe</p>
                <p>Email: john.doe@example.com</p>
            </div>
            <div>
           {(!onclicked && <button onClick={onclick}>
                upload
            </button>)||
            (onclicked &&
                <Upload></Upload>
            )} 
            </div>
        </div>
        <div>
            <UserFilesList></UserFilesList>
        </div>
        </>
    );
};

export default Profile;