import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
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
import { TokenKitWrapper } from 'starknet-tokenkit'
import 'starknet-tokenkit/dist/index.css'

export default function App() {
  // ERC 20 transfer
  return (
    <>
      <TokenKitWrapper
        network="SN_SEPOLIA" // Required - SN_MAIN | SN_SEPOLIA
        sepoliaNodeURL="https://starknet-sepolia.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec" // Required
        mainnetNodeURL="https://starknet-mainnet.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec" // Required
        themeObject={
          {
            "textColor": "black",
            "headerFooterBg": "rgba(0, 0, 0, 0.1)",
            "backgroundColor": "#ffdfa8",
            "fontFamily": "Space Grotesk, sans-serif",
            "searchBackground": "rgba(0, 0, 0, 0.1)",
            "searchColor": "black",
            "searchBorderColor": "rgba(14, 6, 46, 0)",
            "searchFocusBorderColor": "#845ef7",
            "primaryColor": "#845ef7",
            "r": "20px"
          }
        }
      >
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
      </TokenKitWrapper>
    </>
  );
}
