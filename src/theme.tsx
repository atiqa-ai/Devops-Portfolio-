import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Mode = "light" | "dark";

type Ctx = {
  mode: Mode;
  setMode: (m: Mode) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<Ctx>({
  mode: "light",
  setMode: () => {},
  toggleMode: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    try {
      const saved = localStorage.getItem("atiqa-mode");
      if (saved === "light" || saved === "dark") return saved;
    } catch { /* ignore */ }
    return "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = "b";
  }, []);

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    try { localStorage.setItem("atiqa-mode", mode); } catch { /* ignore */ }
  }, [mode]);

  const toggleMode = () => setMode((m) => (m === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
