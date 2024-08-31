import { Route,Routes,Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";

const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Layout showHero><HomePage></HomePage></Layout>}></Route>
            <Route path="/auth-callback" element={<AuthCallbackPage></AuthCallbackPage>}></Route>
            <Route path="/search/:city" element={<Layout showHero={false} ><SearchPage></SearchPage></Layout>}></Route>
            <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route path="/user-profile" element={<Layout><UserProfilePage></UserProfilePage></Layout>}></Route>
                <Route path="/manage-restaurant" element={<Layout><ManageRestaurantPage></ManageRestaurantPage></Layout>}></Route>
            </Route>
            <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
    )
}
export default AppRoutes;

