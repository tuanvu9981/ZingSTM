// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "components/Configurator/Configurator";
import Footer from "components/Footer/Footer.js";
// Layout components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes.js";
// Custom Chakra theme
import theme from "theme/theme.js";
// Custom components
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import Playlist from 'views/Pages/PlayList';
import Album from "views/Pages/Album";
import Genres from "views/Pages/Genres";
import Artist from "views/Pages/Artist";
//Admin components
import AddSong from "views/RTL/Admin/AddNew/AddSong";
import AddAlbum from "views/RTL/Admin/AddNew/AddAlbum";
import AddArtist from "views/RTL/Admin/AddNew/AddArtist";
import AddGenre from "views/RTL/Admin/AddNew/AddGenre";

import UpdateSong from "views/RTL/Admin/Update/UpdateSong";
import UpdateArtist from "views/RTL/Admin/Update/UpdateArtist";
import UpdateAlbum from "views/RTL/Admin/Update/UpdateAlbum";
import UpdateGenre from "views/RTL/Admin/Update/UpdateGenre";

import SongManage from "views/RTL/Admin/Manage/SongManage";
import SuperAdmin from "views/RTL/SuperAdmin/S_Admin.js";
import AlbumManage from "views/RTL/Admin/Manage/AlbumManage.js";
import ArtistManage from "views/RTL/Admin/Manage/ArtistManage";
import Song from "views/Pages/Song";
import EnterVerifyCode from "views/Pages/EnterVerifyCode";
import GenreManage from "views/RTL/Admin/Manage/GenreManage";

export default function Dashboard(props) {
  const { ...rest } = props;
  // states and functions
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  // ref for main panel div
  const mainPanel = React.createRef();
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/zingstm/full-screen-maps";
  };
  const getActiveRoute = (routes) => {
    let activeRoute = "Zing STM";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.category === "account") {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/zingstm") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  document.documentElement.dir = "ltr";
  // Chakra Color Mode
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Sidebar
        routes={routes}
        logoText={"Zing STM"}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        ref={mainPanel}
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={"Zing STM"}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Switch>
                {getRoutes(routes)}
                <Route path={`/zingstm/playlist/:playlistId`} component={Playlist} />
                <Route path={`/zingstm/album/:albumId`} component={Album} />
                <Route path={`/zingstm/genres/:genreId`} component={Genres} />
                <Route path={`/zingstm/song/:songId`} component={Song} />
                <Route path={`/zingstm/artist/:artistId`} component={Artist} />
                <Route path={`/zingstm/enter-verifycode/:playlistId`} component={EnterVerifyCode} />

                <Route path={`/zingstm/add-song`} component={AddSong} />
                <Route path={`/zingstm/add-album`} component={AddAlbum} />
                <Route path={`/zingstm/add-artist`} component={AddArtist} />
                <Route path={`/zingstm/add-genre`} component={AddGenre} />

                <Route path={`/zingstm/update-song/:id`} component={UpdateSong} />
                <Route path={`/zingstm/update-artist/:id`} component={UpdateArtist} />
                <Route path={`/zingstm/update-album/:id`} component={UpdateAlbum} />
                <Route path={`/zingstm/update-genre/:id`} component={UpdateGenre} />

                <Route path={`/zingstm/manage-song`} component={SongManage} />
                <Route path={`/zingstm/manage-album`} component={AlbumManage} />
                <Route path={`/zingstm/manage-artist`} component={ArtistManage} />
                <Route path={`/zingstm/manage-genre`} component={GenreManage} />

                <Route path={`/zingstm/Manage-admin&user`} component={SuperAdmin} />

                {/* Add route here */}
                <Redirect from="/zingstm" to="/zingstm/home" />
              </Switch>
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <Configurator
          secondary={getActiveNavbar(routes)}
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </ChakraProvider>
  );
}
