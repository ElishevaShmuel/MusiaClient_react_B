
import { MusicFile } from '../../models/MusicFile';
import { useSelector } from 'react-redux';
import FileCard from './FileCard';
import { Container } from '@mui/material';

const UserFilesList = ( ) => {
    const user = useSelector((state:any) => state.user.user);
    const songs=user.files || [];

    console.log(songs);
    

    return(
         <Container sx={{ paddingTop: '16px' }}>
      {songs.map((song:MusicFile) => (
        <FileCard song ={song} IsMine={true} user={user}/>
      ))}
    </Container>
  
    )
}
export default UserFilesList
