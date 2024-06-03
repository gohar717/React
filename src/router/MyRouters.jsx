// Importing necessary dependencies from React and React Router
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Importing components and pages
import { Footer } from "../components/Footer/Footer";
import { Menu } from "../components/Menu/Menu";
import BestiaryPage from "../pages/BestiaryPage/BestiaryPage";
import Blogs from "../pages/Blogs/Blogs";
import SingleBlog from "../pages/Blogs/SingleBlog/SingleBlog";
import ChangeLog from "../pages/ChangeLog/ChangeLog";
import GameCredits from "../pages/GameCredits/GameCredits";
import { LandingPage } from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import MyNftsPage from "../pages/MyNftsPage/MyNftsPage";
import PlayerProfile from "../pages/PlayerProfile/PlayerProfile";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import Signup from "../pages/Signup/Signup";
import StagingNftsPage from "../pages/StagingNftsPage/StagingNftsPage";
import TriliumWiki from "../pages/TriliumWiki/TriliumWiki";
import WebEpisode0Page from "../pages/WebEpisode0/WebEpisode0";
import WebEpisodePage from "../pages/WebEpisodes/WebEpisodes";

// Functional component for managing routes
const MyRouters = () => {
  // Redux state management - extracting relevant user information
  const { playerIsLogged, waxConnected, anchorConnected } = useSelector(
    (state) => state.user
  );

  // Definition of all available pages with their respective paths and types
  const allPages = [
    { path: "/", component: LandingPage },
    { path: "/blogs", component: Blogs },
    { path: "/blogs/:id", component: SingleBlog },
    { path: "/change-log", component: ChangeLog },
    { path: "/bestiary", component: BestiaryPage },
    { path: "/trilium-wiki", component: TriliumWiki },
    { path: "/privacy-policy", component: PrivacyPolicy },
    { path: "/game-credits", component: GameCredits },
    { path: "/web-episodes", component: WebEpisodePage },
    { path: "/web-episode-0", component: WebEpisode0Page },
    { path: "/curse-of-the-holoforms", component: WebEpisode0Page},
    { path: "/login", component: Login, type: "player-not-loggedin" },
    { path: "/signup", component: Signup, type: "player-not-loggedin" },
    { path: "/my-nfts", component: MyNftsPage, type: "wax-loggedin" },
    { path: "/staging-nfts", component: StagingNftsPage, type: "wax-loggedin" },
    {
      path: "/player-profile",
      component: PlayerProfile,
      type: "player-loggedin",
    },
  ];

  // Filtering pages based on user authentication and connection status
  const pages = allPages?.reduce((newPages, item) => {
    if (!item.type) {
      newPages.push(item);
      return newPages;
    }

    if (!playerIsLogged && item.type === "player-not-loggedin") {
      newPages.push(item);
      return newPages;
    }

    if (playerIsLogged && item.type === "player-loggedin") {
      newPages.push(item);
      return newPages;
    }

    if ((waxConnected || anchorConnected) && item.type === "wax-loggedin") {
      newPages.push(item);
    }
    return newPages;
  }, []);

  // Rendering the routes within BrowserRouter
  return (
    <BrowserRouter>
      {/* Menu component */}
      <Menu />

      {/* Routes component to manage different route configurations */}
      <Routes>
        {/* Mapping through the filtered pages and rendering Route components */}
        {pages.map(({ component, path }) => {
          const Component = component;
          return <Route key={path} element={<Component />} path={path} />;
        })}

        {/* Fallback route in case the requested route is not found */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Footer component */}
      <Footer />
    </BrowserRouter>
  );
};

// Exporting the component as the default export
export default MyRouters;
