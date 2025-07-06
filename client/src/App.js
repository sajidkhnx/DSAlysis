
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Homenew from "./pages/Homenew";
import Charts from "./pages/Charts";
import HomeUI from "./pages/components/HomeUI";
import Sheet from "./pages/Sheet";
import Upload from "./pages/components/Upload"; // new file
import Profile from "./pages/Profile";
// import Insider from "./pages/Insider";




function App() {
  return (
    <Router>  
      <Routes>
         {/* <Route path="/insider" element={<Insider />} /> */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
         
        <Route path="/upload" element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        } />
        <Route path="/sheet" element={
          <ProtectedRoute>
            <Sheet />
          </ProtectedRoute>
        } />
        <Route path="/home" element={<Homenew />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomeUI />
          </ProtectedRoute>
        } />
        <Route path="/charts" element={
          <ProtectedRoute>
            <Charts />
          </ProtectedRoute>
        } />
        <Route path="/chatbot" element={
          <ProtectedRoute>
            {React.createElement(require("./pages/Chatbot.jsx").default)}
          </ProtectedRoute>
        } />
        <Route path="/gemini" element={
          <ProtectedRoute>
            {React.createElement(require("./pages/GeminiChat.jsx").default)}
          </ProtectedRoute>
        } />
        <Route path="/signup" element={React.createElement(require("./pages/Signup.jsx").default)} />
        <Route path="/login" element={React.createElement(require("./pages/Login.jsx").default)} />
      </Routes>
    </Router>
  );
}
export default App;