
import { MusicFile } from '../../models/MusicFile';
import { useSelector } from 'react-redux';
import FileCard from './FileCard';
import { Container } from '@mui/material';

const AllFilesList = ( ) => {
    const songs = useSelector((state:any) => state.MusicFiles)||[];
    const user = useSelector((state:any) => state.user)||{};



    return(
         <Container sx={{ paddingTop: '16px' }}>
      {songs.map((song:MusicFile) => (
        <FileCard song={song} IsMine={false}  user={user}/>
      ))}
    </Container>
  
    )
}
export default AllFilesList
