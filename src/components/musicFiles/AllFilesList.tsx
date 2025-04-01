import { useState } from 'react';
import { MusicFile } from '../../models/MusicFile';
import { useSelector } from 'react-redux';
import FileCard from './FileCard';
import { Container, TextField } from '@mui/material';

const AllFilesList = () => {
    const songs = useSelector((state: any) => state.MusicFiles) || [];
    const user = useSelector((state: any) => state.user) || {};
    const [searchTerm, setSearchTerm] = useState('');

    const filteredSongs = songs.filter((song: MusicFile) => 
        song.FileName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{ paddingTop: '36px' }}>
            <TextField 
                label="חפש שיר" 
                variant="outlined" 
                fullWidth 
                margin="normal" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ input: { color: '#ffffff' }, label: { color: '#cccccc' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#cccccc' } } }}
            />
            {filteredSongs.map((song: MusicFile) => (
                <FileCard key={song.Id} song={song} IsMine={false} user={user} />
            ))}
        </Container>
    );
}

export default AllFilesList;
