import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { LoginUser, RegisterUser } from '../../services/userFetch';
import { User } from '../../models/User';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
}>({
    email: '',
    password: '',
});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(LoginUser(formData));


  };

  return (
    <div style={{margin:'100px'}}>
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#333', color: 'white', borderRadius: 2 }}>
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          כניסה
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="אימייל"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#555',
                },
                '&:hover fieldset': {
                  borderColor: '#888',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#aaa',
                },
              },
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              style: { color: 'white' },
            }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#555',
                },
                '&:hover fieldset': {
                  borderColor: '#888',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#aaa',
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: 'rgba(107, 50, 113, 0.73)',
              '&:hover': {
                backgroundColor: 'rgba(143, 69, 150, 0.51)',
              },
            }}
          >
            כניסה
          </Button>
        </Box>
      </Paper>
    </Container>
    </div>
  );
};

export default Login;