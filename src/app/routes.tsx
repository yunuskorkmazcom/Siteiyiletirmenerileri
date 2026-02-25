import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePage } from "./pages/HomePage";
import { AllToursPage } from "./pages/AllToursPage";
import { AllHotelsPage } from "./pages/AllHotelsPage";
import { HotelCategoryPage } from "./pages/HotelCategoryPage";
import { TourListPage } from "./pages/TourListPage";
import { TourDetailPage } from "./pages/TourDetailPage";
import { HotelDetailPage } from "./pages/HotelDetailPage";
import { ReservationPage } from "./pages/ReservationPage";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { ProfilePage } from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "tum-turlar", Component: AllToursPage },
      { path: "tum-oteller", Component: AllHotelsPage },
      { path: "oteller", Component: HotelCategoryPage },
      { path: "turlar", Component: TourListPage },
      { path: "tur/:id", Component: TourDetailPage },
      { path: "otel/:id", Component: HotelDetailPage },
      { path: "rezervasyon/:tourId", Component: ReservationPage },
      { path: "blog", Component: BlogListPage },
      { path: "blog/:slug", Component: BlogDetailPage },
      { path: "iletisim", Component: ContactPage },
      { path: "hakkimizda", Component: AboutPage },
      { path: "gizlilik", Component: PrivacyPage },
      { path: "profil", Component: ProfilePage },
    ],
  },
]);