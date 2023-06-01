import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import AddUser from './components/user/AddUser';
import EditUser from './components/user/EditUser';
import ViewUser from './components/user/ViewUser';

function App() {

    return (
        <Container sx={{ margin: '16px auto' }}>
            <Router>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route path='/add-user' element={<AddUser />} />
                    <Route path='/edit-user/:id' element={<EditUser />} />
                    <Route path='/view-user/:id' element={<ViewUser />} />
                </Routes>
            </Router>
        </Container>
    );
    
}

export default App;
