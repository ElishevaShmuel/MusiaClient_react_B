import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import { PlayArrow, Download } from '@mui/icons-material';
import { motion } from 'framer-motion';

const SongCard = ( song :any) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{ marginBottom: '16px' }}
    >
      <Card sx={{ display: 'flex', backgroundColor: '#1e1e1e', color: '#fff' }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={song.cover}
          alt={song.title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h6">
              {song.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" component="div">
              {song.artist}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <IconButton aria-label="play/pause">
              <PlayArrow sx={{ height: 38, width: 38, color: '#fff' }} />
            </IconButton>
            <IconButton aria-label="download">
              <Download sx={{ height: 38, width: 38, color: '#fff' }} />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </motion.div>
  );
};

export default SongCard;
