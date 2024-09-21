import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Route, Routes, useLocation } from "react-router-dom"
import './App.css'
import Home from "./routes/Home"
import About from "./routes/About"
import Contact from "./routes/Contact"
import Service from "./routes/Service"
import Navbar from './components/Navbar'
import GoSolo from "./routes/GoSolo"
import GoGroup from "./routes/GoGroup"
import SearchProfiles from "./routes/SearchProfiles"
// import YourGroups from "./routes/YourGroups"
import HotelView from "./routes/HotelView"
import ViewAccount from "./routes/ViewAccount"
import UpdateProfile from './components/updateProfile'
import ViewFriends from './components/viewFriends'
import Sign from './routes/Sign'
import GroupsTravel from './routes/GroupsTravel'
import WhatsApp from './components/pages/WhatsApp'
// import WhatsApp2 from './components/pages/WhatsApp2'

import Notifications from './components/Notifications'
import WhatsApp2 from './components/pages/Whatsapp2'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [count, setCount] = useState(0)
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const hideNavbarRoutes = ['/services/YourGroups', '/services/YourGroups/:group_name'];
  return (
    <>
      <div className='App'>
        {/* Hide Navbar if the current route matches either of the specified routes */}
        {!hideNavbarRoutes.some(path => location.pathname.startsWith('/services/YourGroups')) && (
          <Navbar isAuthenticated={isAuthenticated} />
        )}
        <Routes>
          {
            // sourcery skip: invert-ternary
            !isAuthenticated ? (
              <>
                <Route path="/" element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path='/sign' element={<Sign setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="*" element={<Sign setIsAuthenticated={setIsAuthenticated} />} />

              </>
            ) :
              (
                <>
                  <Route path='/notifications' element={<Notifications />} />
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/contact" element={<Contact />}></Route>
                  <Route path="/services" element={<Service />}></Route>
                  <Route path="/services/GoSolo" element={<GoSolo />}></Route>
                  <Route path="/services/GoGroup" element={<GoGroup />}></Route>
                  <Route path="/services/SearchProfiles" element={<SearchProfiles />}></Route>
                  <Route path="/services/YourGroups" element={<WhatsApp />}></Route>
                  <Route path="/services/YourGroups/:group_name" element={<WhatsApp2 />}></Route>
                  <Route path='/:Hotel_Name' element={<HotelView />}></Route>
                  <Route path='/account' element={<ViewAccount />}></Route>
                  <Route path='/account/updateProfile' element={<UpdateProfile />}></Route>
                  <Route path='/account/viewFriends' element={<ViewFriends />}></Route>
                  <Route path='/groupsTravel' element={<GroupsTravel />} />
                </>
              )
          }

        </Routes>

      </div>
    </>
  )
}

export default App
