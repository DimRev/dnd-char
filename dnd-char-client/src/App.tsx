import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "~/features/views/HomePage";
import CharacterLayout from "~/features/views/CharacterLayout";
import CharacterIndexPage from "~/features/views/CharacterIndexPage";
import AppHeader from "~/features/shared/components/AppHeader";
import CharacterCreatePage from "~/features/views/CharacterCreatePage";

function App() {
  return (
    <div className="flex flex-col min-h-dvh">
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/character" element={<CharacterLayout />}>
            <Route index element={<CharacterIndexPage />} />
            <Route path="create" element={<CharacterCreatePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
