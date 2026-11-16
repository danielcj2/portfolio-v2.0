import { motion } from "motion/react";

const MENU_TRANSITION = {
  duration: 0.3,
  ease: [0.43, 0.13, 0.23, 0.96] as const,
};

const MenuIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="absolute top-2 right-2 size-7 min-h-7 min-w-7">
    <motion.span
      className="absolute top-1 block h-0.5 w-3 rounded-full bg-white"
      initial={false}
      animate={
        isOpen
          ? {
              top: "50%",
              left: "50%",
              x: "-50%",
              y: "-50%",
              width: 20,
              rotate: 45,
            }
          : { top: 4, left: 0, x: 0, y: 0, width: 12, rotate: 0 }
      }
      transition={MENU_TRANSITION}
    />
    <motion.span
      className="absolute top-1/2 left-0 block h-0.5 w-7 -translate-y-1/2 rounded-full bg-white"
      initial={false}
      animate={
        isOpen
          ? { left: "50%", x: "-50%", width: 20, rotate: -45 }
          : { left: 0, x: 0, width: 28, rotate: 0 }
      }
      transition={MENU_TRANSITION}
    />
    <motion.span
      className="bg-muted absolute top-5.5 right-0 block h-0.5 w-3 rounded-full"
      initial={false}
      animate={isOpen ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
      transition={MENU_TRANSITION}
    />
  </div>
);

export default MenuIcon;
