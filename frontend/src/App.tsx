import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import "./styles/main.css"
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Collectives from "./pages/collectives/Collectives";
import SingleCollective from "./pages/collectives/view/SingleCollective";
import Heroes from "./pages/collectives/view/Heroes";
import Cycles from "./pages/collectives/view/Cycles";
import CollectiveInfo from "./pages/collectives/view/CollectiveInfo";
import Chat from "./pages/collectives/view/Chat";
import CreateCollective from "./pages/collectives/CreateCollective";
import Home from "./pages/Home";
import MyCollectives from "./pages/account/MyCollectives";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/collectives" element={<Collectives />} />
            <Route path="/create/collective" element={<CreateCollective />} />
            <Route path="/my-collectives" element={<MyCollectives />} />
            <Route path="/collectives/:cid" element={<SingleCollective />}>
              <Route path="/collectives/:cid/heroes" element={<Heroes />} />
              <Route path="/collectives/:cid/cycles" element={<Cycles />} />
              <Route path="/collectives/:cid/info" element={<CollectiveInfo />} />
              <Route path="/collectives/:cid/chat" element={<Chat />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </>
  );
}
