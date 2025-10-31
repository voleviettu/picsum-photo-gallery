import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhotoGrid from './components/PhotoGrid';
import PhotoDetail from './components/PhotoDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/photos" replace />} />
        <Route path="/photos" element={<PhotoGrid />} />
        <Route path="/photos/:id" element={<PhotoDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
