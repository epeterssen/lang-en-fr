import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { MainMenu } from '@/pages/MainMenu';
import { Unit1 } from '@/pages/Unit1';
import { Unit2 } from '@/pages/Unit2';
import { Unit3 } from '@/pages/Unit3';
import { Unit4 } from '@/pages/Unit4';
import { WinePage } from '@/pages/wine/WinePage';
import { WineRegionPage } from '@/pages/wine/WineRegionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/unit/1" element={<Unit1 />} />
          <Route path="/unit/2" element={<Unit2 />} />
          <Route path="/unit/3" element={<Unit3 />} />
          <Route path="/unit/4" element={<Unit4 />} />
        </Route>
        <Route element={<Layout />}>
          <Route path="/wine" element={<WinePage />} />
          <Route path="/wine/region/:index" element={<WineRegionPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
