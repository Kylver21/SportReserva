import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home/Home';
import Courts from './pages/Courts/Courts';
import CourtDetail from './pages/CourtDetail/CourtDetail';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Profile from './pages/Profile/Profile';
import Bookings from './pages/Bookings/Bookings';
import Checkout from './pages/Checkout/Checkout';
import BookingSuccess from './pages/BookingSuccess/BookingSuccess';
import Support from './pages/Support/Support';
import BookingDetails from './pages/BookingDetails/BookingDetails';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courts" element={<Courts />} />
              <Route path="/courts/:id" element={<CourtDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              <Route path="/support" element={<Support />} />
              <Route path="/booking-details/:id" element={<BookingDetails />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;