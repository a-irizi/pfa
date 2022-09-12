import Papiers from "./pages/Papiers";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Professeurs from "./pages/Professeurs";
import Thesards from "./pages/Thesards";
import SharedLayout from "./pages/SharedLayout";
import Profile from "./pages/Profile";
import ProfileUpdate from "./pages/ProfileUpdate";
import EmptyLayout from "./pages/EmptyLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<Papiers />} />
            <Route path="professeurs" element={<EmptyLayout />}>
              <Route index element={<Professeurs />} />
              <Route path=":researcherId" element={<Profile />} />
            </Route>
            <Route path="thesards" element={<EmptyLayout />}>
              <Route index element={<Thesards />} />
              <Route path=":researcherId" element={<Profile />} />
            </Route>
            <Route path="profile" element={<EmptyLayout />}>
              <Route index element={<Profile currentUser={true} />} />
              <Route path="mise-a-joure" element={<ProfileUpdate />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
