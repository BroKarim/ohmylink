import { motion } from "framer-motion";
import BackgroundOptions from "@/components/control-panel/background-options";
import BackgroundPattern from "@/components/control-panel/background-pattern";
import BackgroundEffect from "@/components/control-panel/background-effect";
import { CardTextureSelector } from "@/components/control-panel/texture-selector";
import { ThemeSelector } from "@/components/control-panel/theme-selector";
import type { ProfileEditorData } from "@/server/user/profile/payloads";

interface ThemeTabProps {
  profile: ProfileEditorData;
  onUpdate: (profile: ProfileEditorData) => void;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function ThemeTab({ profile, onUpdate }: ThemeTabProps) {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="px-3 pb-4">
      <div className="space-y-6">
        <motion.div variants={item}>
          <ThemeSelector profile={profile} onUpdate={onUpdate} />
        </motion.div>

        <motion.div variants={item} className="w-full flex gap-x-2 justify-between items-center">
          <BackgroundPattern profile={profile} onUpdate={onUpdate} />
          <BackgroundEffect profile={profile} onUpdate={onUpdate} />
        </motion.div>

        <motion.div variants={item}>
          <BackgroundOptions profile={profile} onUpdate={onUpdate} />
        </motion.div>

        <motion.div variants={item}>
          <CardTextureSelector profile={profile} onUpdate={onUpdate} />
        </motion.div>
      </div>
    </motion.div>
  );
}
