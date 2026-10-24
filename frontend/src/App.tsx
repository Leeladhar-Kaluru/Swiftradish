import { BrowserRouter, Route, Routes } from "react-router";
import { DirectionProvider } from "@/components/foundations/direction/direction";
import { AppShell } from "@/src/components/shell/app-shell";
import { AccountPage } from "@/src/pages/account-page";
import { LoginPage, RegisterPage } from "@/src/pages/auth-pages";
import { HomePage } from "@/src/pages/home-page";
import { IntroPage } from "@/src/pages/intro-page";

export function App() {
  return (
    <DirectionProvider locale="en-US">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<AppShell />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DirectionProvider>
  );
}
