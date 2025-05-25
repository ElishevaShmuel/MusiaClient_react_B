import { useState, useRef } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { PlayArrow, Pause, Download } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { MusicFile } from '../../models/MusicFile';
import { User } from '../../models/User';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { DownloadFile } from '../../services/FilesFetch';

const FileCard = ({ song, user }: { song: MusicFile, IsMine: boolean, user: User }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const play = async () => {
    if (!audioRef.current) {
      try {
        const res = await fetch(`https://localhost:7264/api/AudioFile/Download?fileName=${song.fileName}`);
        const data = await res.json();
        const url = data.url;
        audioRef.current = new Audio(url);
        audioRef.current.addEventListener('ended', () => setIsPlaying(false));
      } catch (err) {
        console.error("שגיאה בהשמעה", err);
        return;
      }
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const Down = () => {
    if ((user.currency?.sum ?? 0) < song.Cost) {
      alert("יקר מידי! שטף אותנו בתוכן ותחזור 😉");
    } else {
      dispatch(DownloadFile(song));

    }
  };
  

  return (
    <motion.div whileHover={{ scale: 1.02 }} style={{ marginBottom: '8px' }}>
      <Card sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#1e1e1e',
        color: '#fff',
        height: '60px',
        padding: '0 16px',
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="play" sx={{ color: '#fff' }} onClick={play}>
            {isPlaying ? (
              <Box sx={{ display: 'flex', gap: '2px' }}>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: ['10px', '20px', '10px'] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                    style={{
                      width: '4px',
                      background: 'white',
                      borderRadius: '2px',
                    }}
                  />
                ))}
              </Box>
            ) : (
              <PlayArrow />
            )}
          </IconButton>

          <IconButton aria-label="download" sx={{ color: '#fff' }} onClick={Down}>
            <Download />
          </IconButton>
        </Box>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', padding: '8px' }}>
          <Typography component="div" variant="subtitle1">
            {song.fileName}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" component="div">
            {song.cost}
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FileCard;
