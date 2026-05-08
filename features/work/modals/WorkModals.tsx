"use client";

import Card from "@/ui/Card";
import Modal from "@/ui/Modal";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

import QuickQRModal from "./QuickQRModal";
import BluewaveModal from "./BluewaveModal";
import BogueModal from "./BogueModal";
import { type ModalContentProps } from "./shared";

type Project = {
  id: "quickqr" | "bluewave" | "bogue";
  name: string;
  year: string;
  title: string;
  subtitle: string;
  color: string;
  overlay: string;
  video: string | null;
};

const r2Url = process.env.NEXT_PUBLIC_PORTFOLIO;

const PROJECTS: Project[] = [
  {
    id: "quickqr",
    name: "quickQR",
    year: "2025",
    title: "Reimagining QR Codes",
    subtitle: "All-in-One Business Tool",
    color: "bg-[#CF1736]",
    overlay: "bg-[#CF1736]/80",
    video: `${r2Url}/quickqr.webm`,
  },
  {
    id: "bluewave",
    name: "BlueWave Labs",
    year: "2024",
    title: "Tracking Uptime",
    subtitle: "for Websites & APIs",
    color: "bg-[#1777CF]",
    overlay: "bg-[#1777CF]/90",
    video: `${r2Url}/bluewave.webm`,
  },
  {
    id: "bogue",
    name: "Bogue",
    year: "2023",
    title: "Modern Commerce",
    subtitle: "A Personal Retail Experiment",
    color: "bg-[#CF9117]",
    overlay: "bg-[#CF9117]/80",
    video: `${r2Url}/bogue.webm`,
  },
];

const MODAL_CONTENT: Record<
  Project["id"],
  React.ComponentType<ModalContentProps>
> = {
  quickqr: QuickQRModal,
  bluewave: BluewaveModal,
  bogue: BogueModal,
};

const SPACING = ["pr-4", "px-4", "pl-4"] as const;

const WorkModals = () => {
  const [activeProjectId, setActiveProjectId] = useState<Project["id"] | null>(
    null,
  );
  const [hoveredProjectId, setHoveredProjectId] = useState<
    Project["id"] | null
  >(null);
  const videoRefs = useRef<
    Partial<Record<Project["id"], HTMLVideoElement | null>>
  >({});

  const activeProject = useMemo(
    () => PROJECTS.find((project) => project.id === activeProjectId),
    [activeProjectId],
  );

  useEffect(() => {
    PROJECTS.forEach((project) => {
      const video = videoRefs.current[project.id];

      if (!video) return;

      const shouldPlay =
        hoveredProjectId === project.id || activeProjectId === project.id;

      if (shouldPlay) {
        void video.play().catch(() => {});
        return;
      }

      video.pause();
    });
  }, [hoveredProjectId, activeProjectId]);

  const ModalContent = activeProject ? MODAL_CONTENT[activeProject.id] : null;

  return (
    <>
      <div className="bg-background mx relative z-1 flex">
        {PROJECTS.map((project, index) => {
          const isActive = activeProjectId === project.id;

          return (
            <motion.div
              key={project.id}
              className={`h-min w-full flex-1 cursor-pointer outline-none ${SPACING[index]} ${isActive ? "opacity-0" : ""}`}
              layout
              initial="initial"
              whileHover="hovered"
              whileFocus="hovered"
              tabIndex={0}
              onHoverStart={() => setHoveredProjectId(project.id)}
              onHoverEnd={() => setHoveredProjectId(null)}
              onClick={() => setActiveProjectId(project.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveProjectId(project.id);
                }
              }}
              role="button"
              variants={{ initial: { flex: 1 }, hovered: { flex: 1.5 } }}
            >
              <Card
                className="h-190 w-full will-change-transform"
                theme="stacked"
              >
                <Card
                  className="z-0 flex h-18 items-center justify-between px-5"
                  theme="light"
                >
                  <motion.div
                    className={`absolute inset-0 -z-1 ${project.color}`}
                    variants={{
                      initial: { opacity: 0 },
                      hovered: { opacity: 1 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <p className="font-medium tracking-tighter text-white">
                    {project.name}
                  </p>
                  <p className="font-chakra font-semibold tracking-tight text-white/50">
                    {project.year}
                  </p>
                </Card>
                <Card
                  className="h-full"
                  layoutId={`card-${project.id}`}
                  theme="light"
                >
                  {!!project.video && (
                    <motion.div
                      className="relative flex size-full justify-center"
                      variants={{
                        initial: {
                          opacity: 0.3,
                          filter: "grayscale(100%)",
                          scale: 1,
                        },
                        hovered: {
                          opacity: 1,
                          filter: "grayscale(0%)",
                          scale: 1.2,
                        },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <video
                        ref={(element) => {
                          videoRefs.current[project.id] = element;
                        }}
                        className="h-full w-auto object-cover"
                        src={project.video ?? undefined}
                        muted
                        loop
                        playsInline
                        preload="auto"
                        controls={false}
                        disablePictureInPicture
                        aria-hidden="true"
                        tabIndex={-1}
                      />
                    </motion.div>
                  )}
                  <motion.div
                    className={`absolute inset-0 -z-1 ${project.overlay}`}
                    variants={{
                      initial: { opacity: 0.05, filter: "grayscale(100%)" },
                      hovered: { opacity: 1, filter: "grayscale(0%)" },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute bottom-0 p-4 text-2xl">
                    <p className="font-medium">{project.title}</p>
                    <p className="font-extralight italic">{project.subtitle}</p>
                  </div>
                </Card>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <Modal
        className="flex gap-4 overflow-clip"
        aria-labelledby=""
        aria-describedby=""
        isOpen={!!activeProject}
        onClose={() => setActiveProjectId(null)}
      >
        {ModalContent && activeProject && (
          <ModalContent
            projectId={activeProject.id}
            name={activeProject.name}
            year={activeProject.year}
            onClose={() => setActiveProjectId(null)}
          />
        )}
      </Modal>
    </>
  );
};

export default WorkModals;
