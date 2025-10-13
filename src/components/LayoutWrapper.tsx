"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Routes where Navbar should NOT appear
  const hiddenNavbarRoutes = ["/admin", "/login", "/signup"];
  const shouldHideNavbar = hiddenNavbarRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Routes where Footer should NOT appear
  const hiddenFooterRoutes = ["/admin", "/login"];
  const shouldHideFooter = hiddenFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );

  return (
    <>
      {/* Show Navbar only if not hidden */}
      {!shouldHideNavbar && <Navbar />}

      <main>{children}</main>

      {/* Show Footer only if not hidden */}
      {!shouldHideFooter && <Footer />}
    </>
  );
}
