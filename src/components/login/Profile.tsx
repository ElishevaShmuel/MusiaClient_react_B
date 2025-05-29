import React, { useEffect, useState } from 'react';
import Upload from '../musicFiles/Upload';

import UserFilesList from '../musicFiles/UserFilesList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../../services/fetchCurrency';
import { AppDispatch } from '../../store/store';

const Profile: React.FC = () => {
    const user = useSelector((state:any) => state.user.user) ;
  const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchCurrency(user.id));
      }, [dispatch]);
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
                <p>MyCredits: {user.currency?.sum}</p>
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