import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
 
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <AuthProvider>
     
       <Toaster position="top-right" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
     
     
    </AuthProvider>
  );
}

export default App;