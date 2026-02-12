import { Route, Routes, BrowserRouter } from 'react-router'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'


const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path='login' element={<LoginPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter