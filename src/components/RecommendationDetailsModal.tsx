import React from 'react';
import { LanguageCode } from '../i18n/translations.js';

interface RecommendationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  intent?: {
    goal: string;
    identifiedIngredients: string[];
    dietaryFocus?: string;
    cuisineFocus?: string;
  };
  scoringMethodology?: string;
  currentLanguage: LanguageCode;
}

export const RecommendationDetailsModal: React.FC<RecommendationDetailsModalProps> = ({
  isOpen,
  onClose,
  intent,
  scoringMethodology,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#D5CFC4] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-start justify-between border-b border-[#E8E2D8] pb-4 mb-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#16321A]">
              Personalization & Scoring Logic
            </h3>
            <p className="text-xs text-[#5D7062] mt-1">
              Deterministic JavaScript ranking engine backed by Redux state & GraphQL.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-[#5D7062] hover:text-[#16321A] border border-[#D5CFC4] px-2.5 py-1"
          >
            Close
          </button>
        </div>

        {/* Pipeline Architecture Banner */}
        <div className="bg-white border border-[#E8E2D8] p-4 mb-6">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#16321A] mb-1">
            <span>Ranking Engine</span>
            <span className="text-[#16321A]">JavaScript / Redux / GraphQL Pipeline</span>
          </div>
          {intent && (
            <p className="text-xs text-[#4A5D4F] leading-relaxed mt-2">
              <strong>Parsed Query:</strong> {intent.goal}
            </p>
          )}
          {scoringMethodology && (
            <p className="text-xs text-[#5D7062] leading-relaxed mt-1">
              <strong>Methodology:</strong> {scoringMethodology}
            </p>
          )}
        </div>

        {/* 4 Factor Weights Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#16321A]">
            Mathematical Score Composition
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white border border-[#E8E2D8] p-3">
              <span className="font-semibold text-[#16321A] block">1. Pantry Match (40% Weight)</span>
              <p className="text-[#5D7062] mt-1">Calculates normalized ingredient overlap percentage between pantry and recipe.</p>
            </div>
            <div className="bg-white border border-[#E8E2D8] p-3">
              <span className="font-semibold text-[#16321A] block">2. Cuisine Affinity (25% Weight)</span>
              <p className="text-[#5D7062] mt-1">Adjusts score dynamically based on positive vs negative ratings for specific cuisines.</p>
            </div>
            <div className="bg-white border border-[#E8E2D8] p-3">
              <span className="font-semibold text-[#16321A] block">3. Dietary Suitability (20% Weight)</span>
              <p className="text-[#5D7062] mt-1">Evaluates vegetarian compliance and high-protein density thresholds.</p>
            </div>
            <div className="bg-white border border-[#E8E2D8] p-3">
              <span className="font-semibold text-[#16321A] block">4. Feedback Signals (15% Weight)</span>
              <p className="text-[#5D7062] mt-1">Applies positive reinforcement (+8 to +25) and penalties (-8 to -25) from Redux.</p>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div className="mt-6 pt-4 border-t border-[#E8E2D8] text-[11px] text-[#5D7062]">
          <strong className="text-[#16321A] uppercase tracking-wider block mb-1">Mathematical Formula:</strong>
          <p className="font-mono bg-white p-2 border border-[#E8E2D8]">
            Total Score = (Match% × 0.40) + (CuisineAffinity × 0.25) + (DietaryFit × 0.20) + ((50 + FeedbackAdjustment) × 0.15)
          </p>
        </div>
      </div>
    </div>
  );
};

// Backwards-compatible export
export const AgentWorkflowModal = RecommendationDetailsModal;
