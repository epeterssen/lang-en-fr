import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { Home } from '@/pages/Home'
import { MainMenu } from '@/pages/MainMenu'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/main-menu" element={<MainMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
