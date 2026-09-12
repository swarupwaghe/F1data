import React from 'react';
import type { ComparisonInsight } from '../types/f1';
import { Sparkles, ChevronRight } from 'lucide-react';

interface PerformanceInsightProps {
  insight: ComparisonInsight;
}

export const PerformanceInsight: React.FC<PerformanceInsightProps> = ({ insight }) => {
  return (
    <div className="glass-panel rounded-2xl p-5 sm:p-6 mb-8 border border-red-900/30 bg-gradient-to-br from-[#121824] via-[#161c2c] to-[#1a1324]">
      
      {/* Panel Header */}
      <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-red-400 mb-3">
        <Sparkles className="w-4 h-4 text-red-500 animate-pulse" />
        <span>AUTOMATED TELEMETRY INSIGHT ENGINE</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-3">
        Race Performance Narrative
      </h3>

      {/* Main Rule-based Summary Narrative Paragraph (PRD Section 13 Rule) */}
      <div className="p-4 rounded-xl bg-black/40 border border-gray-800 text-sm sm:text-base text-gray-200 leading-relaxed font-medium mb-5">
        "{insight.narrative}"
      </div>

      {/* Key Telemetry Takeaways Bullet Points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {insight.keyTakeaways.map((takeaway, idx) => (
          <div
            key={idx}
            className="flex items-start space-x-2.5 p-3 rounded-xl bg-[#161f30]/60 border border-gray-800/80 text-xs font-semibold text-gray-300"
          >
            <ChevronRight className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{takeaway}</span>
          </div>
        ))}
      </div>

    </div>
  );
};
