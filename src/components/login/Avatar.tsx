import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

export default function LetterAvatars() {
  const user = useSelector((state:any) => state.user);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar 
        sx={{ 
          bgcolor: "rgba(1, 1, 1, 0.42)", // צבע רקע סגלגל
          color: 'white',
          fontWeight: 'bold',
          boxShadow: 3,
          textTransform: 'uppercase',
          padding: 1,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.1)', // הגדלה בעת ריחוף
            bgcolor: "rgba(1, 1, 1, 0.48)", // צבע רקע סגלגל בעת ריחוף

          },
        }}
      >
        {user?.Name?.charAt(0).toUpperCase()}
      </Avatar>
    </Stack>
  );
}
