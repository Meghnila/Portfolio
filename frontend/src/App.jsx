import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ToastProvider } from './components/Toast';
import './index.css';

const AdminPanel = lazy(() => import('./pages/AdminPanel'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastProvider>
          <div className="min-h-screen bg-dark text-white">
            <Navbar />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </Suspense>
          </div>
        </ToastProvider>
      </Router>
    </Provider>
  );
}

export default App;
