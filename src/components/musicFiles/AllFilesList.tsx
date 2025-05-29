import { useEffect, useState } from 'react';
import { MusicFile } from '../../models/MusicFile';
import { useDispatch, useSelector } from 'react-redux';
import FileCard from './FileCard';
import { Container, TextField } from '@mui/material';
import { GetFiles } from '../../services/FilesFetch';
import { AppDispatch } from '../../store/store';
import { fetchCurrency } from '../../services/fetchCurrency';

const AllFilesList = () => {
    const songs = useSelector((state: any) => state.musicFiles.musicFiles);
    console.log(songs);

    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: any) => state.user.user) || {};
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(GetFiles());
        dispatch(fetchCurrency(user.id));
    }, [dispatch]);

    console.log(songs);


    const filteredSongs = songs.filter((song: MusicFile) => {
        console.log(song.fileName);

        return song.fileName.toLowerCase().includes(searchTerm.toLowerCase());
    });

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
                <FileCard key={song.id} song={song} IsMine={false} user={user} />
            ))}
        </Container>
    );
}

export default AllFilesList;
