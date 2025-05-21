import React, { useState } from 'react';
import Upload from '../musicFiles/Upload';

import UserFilesList from '../musicFiles/UserFilesList';
import { useSelector } from 'react-redux';
import { User } from '../../models/User';

const Profile: React.FC = () => {
    const user = useSelector((state:any) => state.user.user) as User;
    console.log(user);
    
   const [onclicked,SetOnclicked]=useState(false)
    const onclick = () => {
        SetOnclicked(true)
    };
    console.log("Profile component rendered")
    return (
        <>
      
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Profile Page</h1>
            <p>Welcome to your profile!</p>
            <div>
                <h2>Your Details</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>MyCredits: {user.currency}</p>
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