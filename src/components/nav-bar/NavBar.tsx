import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Button, Typography, Container } from "@mui/material";


const NavBar = () => {

  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, backgroundColor: "#77A672", zIndex: 1000 }}>
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
            
          </Typography>
          
    
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {/* <Register />
            <Login />
            <LetterAvatars /> */}
          </Box>
          
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              to="/"
              sx={{
                color: "white",
                ":hover": { backgroundColor: "#5E8B5C", color: "white" },
                textTransform: "none",
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{
                color: "white",
                ":hover": { backgroundColor: "#5E8B5C", color: "white" },
                textTransform: "none",
              }}
            >
              About
            </Button>
            {/* <Button
              component={Link}
              to="/RecipesList"
              sx={{
                color: "white",
                ":hover": { backgroundColor: "#5E8B5C", color: "white" },
                textTransform: "none",
              }}
            >
              Recipes
            </Button> */}
            {/* {userState.user?.isConected && ( */}
              {/* <Button
                component={Link}
                to="/AddRecipe"
                sx={{
                  color: "white",
                  ":hover": { backgroundColor: "#5E8B5C", color: "white" },
                  textTransform: "none",
                }}
              >
                Add Recipe
              </Button> */}
             </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
