import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Header from "./components/header";
import Profiles from "./pages/profiles";
import AuthGuard from "./guards/auth";
import Login from "./pages/login";
import Signup from "./pages/signup";
import { useEffect } from "react";
import { checkSession } from "./services/auth";
import { useAuthStore } from "./stores/auth";

export default function App() {
  const setAuth = useAuthStore(state => state.setAuth)
  useEffect(() => {
    checkSession()
      .then(({status}) => {
        if (status !== 200) return setAuth({ isAuth: false, client: null, error: null })
      })
  }, [])
  return (
    <main className="main">
      
      <Header />

      <div className="main_container--pages">
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* RUTAS PROTEGIDAS */}
        <Route element ={<AuthGuard />}>

          <Route path="/" element={<Home />} />
          <Route path="/profiles/:id" element={<Profiles />}/>

        </Route>
      </Routes>
      </div>
    </main>
  );
}
