import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Community = lazy(() => import('./pages/Community.jsx'))
const Events = lazy(() => import('./pages/Events.jsx'))
const EventDetail = lazy(() => import('./pages/EventDetail.jsx'))
const RoutesPage = lazy(() => import('./pages/Routes.jsx'))
const Media = lazy(() => import('./pages/Media.jsx'))
const Shop = lazy(() => import('./pages/Shop.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const Admin = lazy(() => import('./pages/Admin.jsx'))
const CheckoutDemo = lazy(() => import('./pages/CheckoutDemo.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

// Simple loader
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-hydrn-dark text-white">
    <div className="w-8 h-8 border-4 border-hydrn-accent border-t-transparent rounded-full animate-spin"></div>
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="community" element={<Community />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:id" element={<EventDetail />} />
            <Route path="routes" element={<RoutesPage />} />
            <Route path="media" element={<Media />} />
            <Route path="shop" element={<Shop />} />
            <Route path="profile" element={<Profile />} />
            <Route path="checkout" element={<CheckoutDemo />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
)
