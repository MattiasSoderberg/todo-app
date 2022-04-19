import React from "react"
import { Routes, Route } from "react-router-dom"
import { Heading, Flex } from "@chakra-ui/react"
import LoginPage from "./pages/LoginPage";
import UserCreatePage from "./pages/UserCreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Flex w="100vw" h="100vh" direction="column" align="center">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-user" element={<UserCreatePage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Flex>
  );
}

export default App;
