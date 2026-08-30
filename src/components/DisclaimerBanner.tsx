import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <aside
      id="educational-guidance-disclaimer"
      aria-label="Educational Guidance Notice"
      className="bg-[#EBF2ED]/95 dark:bg-[#1D2B21]/95 border-b border-[#D2E2D6] dark:border-[#2C4032] px-4 py-2.5 text-xs text-[#2D4534] dark:text-[#B5D6BE]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#4A6550] dark:text-[#7D9D85] shrink-0" />
          <p className="leading-snug">
            <span className="font-bold">Important Notice: Career Recommendations are Suggestions Only.</span>{' '}
            PathPilot AI provides exploratory guidance and educational project ideas to inspire curiosity. Career matches and roadmaps are suggestions, not guarantees or fixed predictions. Always consult with your school counselors, educators, and parents/guardians when making academic or career decisions.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1 text-[11px] opacity-90 shrink-0 font-medium text-[#4A6550] dark:text-[#7D9D85]">
          <Info className="w-3.5 h-3.5" />
          <span>Student Safety & Privacy First</span>
        </div>
      </div>
    </aside>
  );
};
