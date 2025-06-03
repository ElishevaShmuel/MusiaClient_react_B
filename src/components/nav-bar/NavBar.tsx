import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, Container, ButtonBase } from "@mui/material";
import Avatar from "../login/Avatar";

const NavBar = () => {
  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, backgroundColor: "rgba(74, 51, 77, 0.66)", zIndex: 1000, height: "75px", padding: "8px" }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
            }}
          >
            music
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <ButtonBase
              component={Link}
              to="/"
              sx={{
                color: "white",
                ":hover": { color: "rgba(108, 61, 220, 0.73)" },
              }}
            >
              דף הבית
            </ButtonBase>
            <ButtonBase
              component={Link}
              to="/about"
              sx={{
                color: "white",
                ":hover": { color: "rgba(108, 61, 220, 0.73)" },
              }}
            >
              אודות
            </ButtonBase>
            <ButtonBase
              component={Link}
              to="/conect"
              sx={{
                color: "white",
                ":hover": { color: "rgba(108, 61, 220, 0.73)" },
              }}
            >
              צור קשר
            </ButtonBase>
            <ButtonBase
              component={Link}
              to="/register"
              sx={{
                color: "white",
                ":hover": { color: "rgba(108, 61, 220, 0.73)" },
              }}
            >
              הרשמה
            </ButtonBase>
            <ButtonBase
              component={Link}
              to="/login"
              sx={{
                color: "white",
                ":hover": { color: "rgba(108, 61, 220, 0.73)" },
              }}
            >
              כניסה
            </ButtonBase>

            <ButtonBase
              onClick={() => window.location.href = 'https://muisicngclient-c.onrender.com/users'}
              sx={{
                color: "white",
                fontWeight: "bold",
                ":hover": { color: "rgba(255, 0, 0, 0.8)" },
              }}
            >
              Admin
            </ButtonBase>

            <ButtonBase
              component={Link}
              to="/profile"
            >
              <Avatar />
            </ButtonBase>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
