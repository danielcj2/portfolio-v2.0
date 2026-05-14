"use client";

import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FocusTrap } from "focus-trap-react";
import { useLenisRef } from "@/providers/LenisContext";
import { cn } from "@/lib/utils";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
} & HTMLMotionProps<"div">;

const Modal = ({
  className,
  isOpen,
  onClose,
  children,
  ...props
}: ModalProps) => {
  const lenisRef = useLenisRef();

  const modalRef = useRef<HTMLDivElement>(null);
  const canUseDOM = typeof document !== "undefined";

  useEffect(() => {
    if (!isOpen) return;
    const lenis = lenisRef.current;

    const scrollContainer = document.getElementById("scroll-container");
    if (scrollContainer)
      (scrollContainer as HTMLElement & { inert?: boolean }).inert = true;

    lenis?.stop();

    return () => {
      if (scrollContainer)
        (scrollContainer as HTMLElement & { inert?: boolean }).inert = false;

      lenis?.start();
    };
  }, [isOpen, lenisRef]);

  return (
    <>
      {canUseDOM &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.button
                  aria-label="Close modal"
                  className="bg-background/80 fixed inset-0 z-110 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={onClose}
                />
                <div className="pointer-events-none fixed inset-0 z-111 m-4 flex items-center justify-center font-sans lg:m-8 xl:m-12">
                  <FocusTrap
                    focusTrapOptions={{
                      initialFocus: () => modalRef.current,
                      fallbackFocus: () => modalRef.current ?? document.body,
                      escapeDeactivates: false,
                      allowOutsideClick: true,
                    }}
                  >
                    <motion.div
                      className={cn(
                        "pointer-events-auto size-full outline-none",
                        className,
                      )}
                      role="dialog"
                      aria-modal="true"
                      ref={modalRef}
                      tabIndex={-1}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") {
                          event.stopPropagation();
                          onClose();
                        }
                      }}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      {...props}
                    >
                      {children}
                    </motion.div>
                  </FocusTrap>
                </div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default Modal;
