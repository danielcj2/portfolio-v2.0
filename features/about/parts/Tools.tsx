"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Card from "@/components/ui/Card";

type ToolEntry = { name: string; icon: string };
type ToolProps = ToolEntry & { onHover: (name: string | null) => void };

const r2Url = "https://pub-28857b6000b74245a3cbaa8cc4e27605.r2.dev";

// TODO [] move data to lib when switching to s3 bucket for images
const UI: ToolEntry[] = [
  { name: "React", icon: `${r2Url}/react.png` },
  { name: "TypeScript", icon: `${r2Url}/typescript.png` },
  { name: "Next.js", icon: `${r2Url}/next-js.png` },
  { name: "Tailwind CSS", icon: `${r2Url}/tailwind.png` },
  { name: "JavaScript", icon: `${r2Url}/javascript.png` },
  { name: "Motion", icon: `${r2Url}/motion.png` },
  { name: "HTML", icon: `${r2Url}/html.png` },
  { name: "CSS", icon: `${r2Url}/css.png` },
  { name: "Sass", icon: `${r2Url}/sass.png` },
];

const Data: ToolEntry[] = [
  { name: "Redux", icon: `${r2Url}/redux.png` },
  { name: "Zustand", icon: `${r2Url}/zustand.png` },
  { name: "Supabase", icon: `${r2Url}/supabase.png` },
  { name: "Zod", icon: `${r2Url}/zod.png` },
  { name: "PHP", icon: `${r2Url}/php.png` },
];

const Workflow: ToolEntry[] = [
  { name: "Figma", icon: `${r2Url}/figma.png` },
  { name: "GitHub", icon: `${r2Url}/github.png` },
  { name: "VS Code", icon: `${r2Url}/vscode.png` },
  { name: "Postman", icon: `${r2Url}/postman.png` },
  // jest?
  { name: "Jira", icon: `${r2Url}/jira.png` },
  { name: "ChatGPT", icon: `${r2Url}/open-ai.png` },
  { name: "Git", icon: `${r2Url}/git.png` },
  { name: "Spotify (24/7)", icon: `${r2Url}/spotify.png` },
];

const Tool = ({ name, icon, onHover }: ToolProps) => {
  return (
    <Card
      className="flex aspect-square items-center justify-center overflow-clip rounded-lg xl:rounded-xl"
      initial="initial"
      whileHover="hovered"
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
    >
      <motion.div
        variants={{
          initial: { opacity: 0.7, filter: "grayscale(100%)" },
          hovered: { opacity: 1, filter: "grayscale(0%)" },
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src={icon}
          alt={`${name} logo`}
          className="size-[clamp(1.5rem,3vw,2rem)] xl:size-8 select-none"
          width={32}
          height={32}
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(75%_55%_at_50%_0%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)]"
        variants={{
          initial: { opacity: 0 },
          hovered: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      />
    </Card>
  );
};

const Tools = ({ type }: { type: string }) => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const typeToTools: Record<string, ToolEntry[]> = { UI, Data, Workflow };
  const tools = typeToTools[type] || [];

  return (
    <div
      className="relative grid grid-cols-10 gap-2 lg:grid-cols-2 xl:grid-cols-3 lg:gap-1.5 2xl:gap-2"
      onMouseMove={handleMouseMove}
    >
      {tools.map((tool) => (
        <Tool
          key={tool.name}
          name={tool.name}
          icon={tool.icon}
          onHover={setHoveredTool}
        />
      ))}
      <AnimatePresence>
        {hoveredTool && (
          <motion.div
            className="text-foreground pointer-events-none fixed z-50 max-w-[10ch] rounded px-2 py-1 text-xs leading-relaxed font-medium tracking-widest uppercase shadow [word-spacing:2px]"
            style={{ left: mousePos.x + 12, top: mousePos.y + 12 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {hoveredTool}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tools;
