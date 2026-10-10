import React, { useState } from 'react';
import { submitFeedback, FeedbackData } from '../services/feedbackService.js';
import { LanguageCode, translations } from '../i18n/translations.js';

interface FeedbackFormProps {
  recipeId: string;
  recipeName: string;
  cuisine?: string;
  category?: string;
  currentLanguage: LanguageCode;
  onFeedbackSubmitted?: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({
  recipeId,
  recipeName,
  cuisine,
  category,
  currentLanguage,
  onFeedbackSubmitted,
}) => {
  const t = translations[currentLanguage];

  const [rating, setRating] = useState<'Excellent' | 'Good' | 'Average' | 'Not suitable'>('Good');
  const [improvementCategory, setImprovementCategory] = useState<
    'Ingredient match' | 'Diet suitability' | 'Cooking time' | 'Cuisine or taste preference' | 'Other'
  >('Ingredient match');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const data: FeedbackData = {
        recipeId,
        recipeName,
        cuisine,
        category,
        rating,
        improvementCategory,
        comment: comment.trim(),
      };

      await submitFeedback(data);
      setSubmittedMessage(t.feedbackSubmitted);
      if (onFeedbackSubmitted) {
        onFeedbackSubmitted();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to record feedback');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submittedMessage) {
    return (
      <div className="bg-[#F0F5F1] border border-[#C5D8C8] p-6 text-center">
        <h4 className="font-serif text-lg font-semibold text-[#16321A] mb-2">
          {t.feedbackTitle}
        </h4>
        <p className="text-sm text-[#234E35] mb-4">
          {submittedMessage}
        </p>
        <button
          onClick={() => {
            setSubmittedMessage(null);
            setComment('');
          }}
          className="text-xs uppercase tracking-wider font-semibold text-[#16321A] border-b border-[#16321A] pb-0.5"
        >
          Submit Another Note
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] border border-[#E5DFD5] p-6 sm:p-8">
      <div className="border-b border-[#E8E2D8] pb-4 mb-6">
        <h4 className="font-serif text-xl font-semibold text-[#16321A]">
          {t.feedbackTitle}
        </h4>
        <p className="text-xs text-[#5D7062] mt-1 leading-relaxed">
          Your feedback directly updates your centralized Redux preference profile to tune future recommendation rankings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Field (No stars or emojis: clear text options) */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#16321A] mb-3">
            {t.ratingLabel}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { key: 'Excellent', label: t.rateExcellent },
              { key: 'Good', label: t.rateGood },
              { key: 'Average', label: t.rateAverage },
              { key: 'Not suitable', label: t.rateNotSuitable },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setRating(option.key as any)}
                className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider border transition-colors ${
                  rating === option.key
                    ? 'bg-[#16321A] text-white border-[#16321A]'
                    : 'bg-white text-[#4A5D4F] border-[#D5CFC4] hover:border-[#16321A]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Improvement Category Field */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#16321A] mb-3">
            {t.improveLabel}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              { key: 'Ingredient match', label: t.improveIngredientMatch },
              { key: 'Diet suitability', label: t.improveDietSuitability },
              { key: 'Cooking time', label: t.improveCookingTime },
              { key: 'Cuisine or taste preference', label: t.improveCuisinePreference },
              { key: 'Other', label: t.improveOther },
            ].map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => setImprovementCategory(option.key as any)}
                className={`text-left py-2 px-3 text-xs font-medium border transition-colors ${
                  improvementCategory === option.key
                    ? 'bg-[#16321A] text-white border-[#16321A]'
                    : 'bg-white text-[#4A5D4F] border-[#D5CFC4] hover:border-[#16321A]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Comment */}
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-[#16321A] mb-2">
            {t.commentLabel}
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={t.commentPlaceholder}
            rows={3}
            className="w-full bg-white border border-[#D5CFC4] p-3 text-sm text-[#1F2923] placeholder-[#8A988D] focus:outline-none focus:border-[#16321A]"
          />
        </div>

        {errorMessage && (
          <div className="text-xs text-[#8C3A28] bg-[#FDF2F0] p-3 border border-[#F3C5BA]">
            {errorMessage}
          </div>
        )}

        {/* Submit Text Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#16321A] text-white text-xs uppercase tracking-widest font-semibold py-3 px-6 hover:bg-[#234E35] disabled:opacity-50 transition-colors"
          >
            {isSubmitting ? 'Recording Feedback...' : t.submitFeedback}
          </button>
        </div>
      </form>
    </div>
  );
};
