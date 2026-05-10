import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { MainMenu } from '@/pages/MainMenu'
import { Unit1 } from '@/pages/Unit1'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/unit/1" element={<Unit1 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
