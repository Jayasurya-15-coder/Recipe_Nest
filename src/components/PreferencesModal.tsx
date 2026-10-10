import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/index.js';
import { resetPreferences } from '../store/feedbackSlice.js';
import { LanguageCode, translations } from '../i18n/translations.js';

interface PreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
}

export const PreferencesModal: React.FC<PreferencesModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
}) => {
  const t = translations[currentLanguage];
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.feedback.profile);
  const feedbackHistory = useAppSelector((state) => state.feedback.history);
  const [message, setMessage] = useState<string | null>(null);

  const handleReset = () => {
    if (window.confirm('Reset your personalized preference weights back to baseline?')) {
      dispatch(resetPreferences());
      setMessage('Preferences have been reset to baseline in Redux store.');
      setTimeout(() => setMessage(null), 3000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#D5CFC4] max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-start justify-between border-b border-[#E8E2D8] pb-4 mb-6">
          <div>
            <h3 className="font-serif text-2xl font-semibold text-[#16321A]">
              {t.activePreferenceProfile}
            </h3>
            <p className="text-xs text-[#5D7062] mt-1">
              Centralized Redux preference weights shaping your recommendation rankings.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-xs uppercase tracking-wider font-semibold text-[#5D7062] hover:text-[#16321A] border border-[#D5CFC4] px-2.5 py-1"
          >
            Close
          </button>
        </div>

        <div className="space-y-6">
          {message && (
            <div className="text-xs text-[#16321A] bg-[#EAF2EC] p-3 border border-[#B9D6C1]">
              {message}
            </div>
          )}

          {/* Profile Statistics */}
          <div className="grid grid-cols-3 gap-3 border border-[#E8E2D8] bg-white p-4 text-center">
            <div>
              <span className="block text-2xl font-serif font-bold text-[#16321A]">
                {profile.totalPositive}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#5D7062]">Positive Signals</span>
            </div>
            <div>
              <span className="block text-2xl font-serif font-bold text-[#8C3A28]">
                {profile.totalNegative}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#5D7062]">Refinements</span>
            </div>
            <div>
              <span className="block text-2xl font-serif font-bold text-[#16321A]">
                {profile.minMatchPercent}%
              </span>
              <span className="text-[11px] uppercase tracking-wider text-[#5D7062]">Match Threshold</span>
            </div>
          </div>

          {/* Cuisine Affinity Weights */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#16321A] mb-2">
              Preferred Cuisines & Weights
            </h4>
            {Object.keys(profile.preferredCuisines).length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {Object.entries(profile.preferredCuisines).map(([cuisine, weight]) => (
                  <span
                    key={cuisine}
                    className="border border-[#16321A] bg-[#F0F5F1] text-[#16321A] px-3 py-1 text-xs font-medium"
                  >
                    {cuisine} (+{weight})
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#7A8A7F] italic">
                No positive cuisine preferences accumulated yet. Rate recipes to train this profile.
              </p>
            )}
          </div>

          {/* Disliked / Deprioritized Cuisines */}
          {Object.keys(profile.dislikedCuisines).length > 0 && (
            <div>
              <h4 className="text-xs uppercase tracking-wider font-semibold text-[#8C3A28] mb-2">
                Deprioritized Cuisines
              </h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(profile.dislikedCuisines).map(([cuisine, count]) => (
                  <span
                    key={cuisine}
                    className="border border-[#E2B7AE] bg-[#FDF4F2] text-[#8C3A28] px-3 py-1 text-xs font-medium"
                  >
                    {cuisine} (-{count})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recent Feedback Logs from Redux */}
          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold text-[#16321A] mb-2">
              Feedback Activity Log ({feedbackHistory.length})
            </h4>
            {feedbackHistory.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {feedbackHistory.map((fb) => (
                  <div
                    key={fb.id}
                    className="border border-[#E8E2D8] bg-white p-3 text-xs flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between font-semibold text-[#16321A]">
                      <span>{fb.recipeName}</span>
                      <span className="uppercase tracking-wider text-[10px] text-[#4A5D4F]">
                        {fb.rating} · {fb.improvementCategory}
                      </span>
                    </div>
                    {fb.comment && (
                      <p className="text-[#5D7062] mt-1 italic">
                        "{fb.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#7A8A7F] italic">No feedback entries recorded yet.</p>
            )}
          </div>

          {/* Redux State Architecture Notice */}
          <div className="text-[11px] text-[#7A8A7F] bg-[#F2ECE3] p-3 border border-[#E0D8CB] leading-relaxed">
            Note: Preferences are managed via centralized Redux Toolkit state slices with browser localStorage hydration, dynamically passed to GraphQL recommendation queries for real-time ranking adjustments.
          </div>

          {/* Reset Button */}
          <div className="flex justify-end pt-3 border-t border-[#E8E2D8]">
            <button
              onClick={handleReset}
              className="text-xs uppercase tracking-wider font-semibold text-[#8C3A28] border border-[#8C3A28] hover:bg-[#8C3A28] hover:text-white px-4 py-2 transition-colors"
            >
              {t.resetPreferences}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
