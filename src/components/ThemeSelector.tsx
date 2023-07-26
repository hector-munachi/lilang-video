import { EuiThemeColorMode } from "@elastic/eui";
import React, { Suspense, useEffect, useState } from "react";

const DarkTheme = React.lazy(() => import("./Themes/DarkTheme"));

export default function ThemeSelector({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<EuiThemeColorMode>("dark");
  useEffect(() => {
    const theme = localStorage.getItem("lilang-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        {theme === "dark" ? <DarkTheme /> : <DarkTheme />}
      </Suspense>
      {children}
    </>
  );
}
