import React, { useEffect, useState } from "react";
import "./m3e.css";
import Editor from "./Editor";
import { Skeleton } from "./components/Skeleton";
import { isLang, setGlobalLang, type Lang } from "./lib/i18n";

export interface CustomizeAppM3ECanvasProps {
  onSwitchProject?: (projectId: string) => void;
}

function initialLanguage(): Lang {
  try {
    const ui = JSON.parse(localStorage.getItem("m3e:ui") ?? "null");
    if (isLang(ui?.lang)) return ui.lang;
  } catch {}
  const language = (typeof navigator !== "undefined" ? navigator.language ?? "" : "").toLowerCase();
  return language.startsWith("zh")
    ? "zh"
    : language.startsWith("ko")
    ? "ko"
    : language.startsWith("ja")
    ? "ja"
    : "en";
}

function Boot({ done }: { done: boolean }) {
  return (
    <div
      className="m3e-boot"
      data-done={done ? "" : undefined}
      aria-busy={!done}
      aria-hidden={done}
    >
      <Skeleton />
    </div>
  );
}

const BOOT_FADE_MS = 420;

export default function CustomizeAppM3ECanvas({
  onSwitchProject,
}: CustomizeAppM3ECanvasProps) {
  const [lang, setLang] = useState<Lang | null>(null);
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  useEffect(() => {
    const initialLang = initialLanguage();
    if (typeof document !== "undefined") {
      document.documentElement.lang = initialLang;
    }
    setGlobalLang(initialLang);
    setLang(initialLang);
  }, []);

  useEffect(() => {
    if (phase !== "fading") return;
    const id = setTimeout(() => setPhase("done"), BOOT_FADE_MS);
    return () => clearTimeout(id);
  }, [phase]);

  return (
    <div
      className="m3e-workspace-shell"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* Main Material 3 Expressive Editor Canvas with Studio Project switcher */}
      {lang && (
        <Editor
          initialLang={lang}
          onReady={() => setPhase((p) => (p === "loading" ? "fading" : p))}
          onSwitchProject={onSwitchProject}
        />
      )}

      {/* Boot Skeleton Overlay during initial mount */}
      {phase !== "done" && <Boot done={phase === "fading"} />}
    </div>
  );
}
