import "./globals.css";
import "@css/bootstrap.min.css"
import "@css/font-awesome.css"
import "@css/animate.css"
import "@css/magnific-popup.css"
import "@css/meanmenu.css"
import "@css/swiper-bundle.min.css"
import "@css/nice-select.css"
import "@css/main.css"
import 'rc-slider/assets/index.css';

import Preloader from "@/layouts/Preloader";
import ClientWrapper from "@/components/ClientWrapper";

export const metadata = {
  title: "Al-Kababi - Food Restaurant",
  description: "Fresh, flavorful halal meals—kebabs, grills, biryani & curries. Dine-in, takeaway & delivery. Order from Al-Kababi today.",
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
    apple: '/icon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <Preloader />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
