import { Outlet } from "react-router";
import { Box, Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#F0F4F1",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#77A672",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          About Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "1.1rem",
            lineHeight: "1.7",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          Welcome to the "About" page. Here, you can learn more about our mission,
          values, and what makes us different. We are dedicated to providing
          high-quality content and engaging experiences for all users. Our platform
          is designed to cater to your needs, whether you're looking for recipes, tips,
          or just a place to connect.
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            color: "#555",
            textAlign: "center",
          }}
        >
          Feel free to browse our content and get to know us better. We're always
          striving to improve and offer the best possible experience to our community.
        </Typography>
      </Container>
      <Outlet />
    </Box>
  );
};

export default About;
