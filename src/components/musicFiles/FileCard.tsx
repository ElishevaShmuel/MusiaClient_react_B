import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { PlayArrow, Download } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { MusicFile } from '../../models/MusicFile';
import { User } from '../../models/User';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { DownloadFile } from '../../services/FilesFetch';

const FileCard = ({ song, IsMine ,user }: { song: MusicFile , IsMine: boolean ,user:User }) => {
  const dispatch = useDispatch<AppDispatch>();

  const Down=()=>{
    if((user.Currency?.sum ?? 0) < song.Cost)
      alert("...יקר מידי!! שטף אותנן בתכנך ותחזור אלי😜")
    else
    dispatch(DownloadFile(song.Id.toString()));
  }


  return (<>
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{ marginBottom: '8px' }}
    >
      <Card sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        height: '60px',
        padding: '0 16px',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="play" sx={{ color: '#fff' }}>
            <PlayArrow />
          </IconButton>
         {IsMine && <IconButton aria-label="download" sx={{ color: '#fff' }}>
            <Download onClick={()=>Down}/>
          </IconButton>}
        </Box>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '8px' }}>
          <Typography component="div" variant="subtitle1">
            {song.FileName}//
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {song.Cost}///
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  </>
  );
};

export default FileCard;
