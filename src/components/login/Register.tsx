import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { RegisterUser } from '../../services/userFetch';
import { TextField, Button, Box, Typography, Container, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const Register = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    role: string;
}>({
    name: '',
    email: '',
    password: '',
    role: '',
});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(RegisterUser(formData));

  };

  return (
    <div style={{ margin: '100px' }}>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ padding: 4, backgroundColor: '#333', color: 'white', borderRadius: 2 }}>
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            הרשמה
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="שם משתמש"
              name="name"
              autoComplete="username"
              autoFocus
              value={formData.name}
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

            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label" sx={{ color: 'white' }}>תפקיד</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={()=>handleChange}
                sx={{
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#888',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#aaa',
                  },
                }}
                inputProps={{
                  style: { color: 'white' },
                }}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
            </FormControl>

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
              הרשמה
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;
