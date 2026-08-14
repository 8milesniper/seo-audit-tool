// Voice Search Optimization Analysis Service
// Scores readiness for voice assistants from REAL signals in the actually-
// fetched page - no Math.random(), no URL string matching.
import { PageSignals, countPhraseHits, computeReadingGradeLevel } from './htmlSignals'

export interface VoiceSearchMetrics {
  conversationalKeywords: number
  featuredSnippetOpportunities: number
  localVoiceReadiness: number
  questionBasedContent: number
  averageReadingLevel: number | null
  naturalLanguageOptimization: boolean
  methodology: string
}

const CONVERSATIONAL_PHRASES = [
  'how to', 'what is', 'why does', 'when should', 'where can',
  'you can', 'you should', "let's", "here's how", 'near me',
]

const NAP_PHONE_REGEX = /(\+?\d[\d\s().-]{7,}\d)/

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)))

export function analyzeVoiceSearchOptimization(signals: PageSignals): VoiceSearchMetrics {
  const conversationalHits = countPhraseHits(signals.bodyText, CONVERSATIONAL_PHRASES)
  const hasLocalBusinessSchema = signals.jsonLd.some((e) => e.type === 'LocalBusiness' || e.type.endsWith('LocalBusiness'))
  const hasPhonePattern = NAP_PHONE_REGEX.test(signals.bodyText)

  // Conversational Keywords: real count of conversational/voice-style phrases
  // found in the actual page text, scaled to 0-100.
  const conversationalKeywords = clamp(20 + conversationalHits * 15)

  // Featured Snippet Opportunities: real structural signals Google's
  // featured-snippet extraction favors - lists, tables, and short
  // direct-answer paragraphs placed right after a heading.
  const featuredSnippetOpportunities = clamp(
    15 +
      Math.min(35, signals.structure.listCount * 10) +
      Math.min(20, signals.structure.tableCount * 20) +
      Math.min(30, signals.structure.shortAnswerParagraphs * 15)
  )

  // Local Voice Readiness: real LocalBusiness schema and/or a phone-number
  // pattern found in the page text (the standard NAP - Name/Address/Phone -
  // signal voice assistants use for "near me" queries).
  const localVoiceReadiness = clamp((hasLocalBusinessSchema ? 60 : 0) + (hasPhonePattern ? 40 : 0))

  // Question-Based Content: real count of headings phrased as questions.
  const questionBasedContent = clamp(15 + signals.headings.questionHeadingCount * 20)

  // Average Reading Level: real Flesch-Kincaid grade level computed from the
  // actual extracted body text (null if there wasn't enough text to score).
  const averageReadingLevel = computeReadingGradeLevel(signals.bodyText)

  const naturalLanguageOptimization = conversationalHits >= 2 || signals.headings.questionHeadingCount >= 1

  return {
    conversationalKeywords,
    featuredSnippetOpportunities,
    localVoiceReadiness,
    questionBasedContent,
    averageReadingLevel,
    naturalLanguageOptimization,
    methodology:
      `Scored from real page content: ${conversationalHits} conversational phrase match(es), ` +
      `${signals.structure.listCount} list(s), ${signals.structure.tableCount} table(s), ` +
      `${signals.structure.shortAnswerParagraphs} short-answer paragraph(s) placed right after a heading, ` +
      `${signals.headings.questionHeadingCount} question-phrased heading(s), and ` +
      `${hasLocalBusinessSchema ? 'LocalBusiness schema found' : 'no LocalBusiness schema'} plus ` +
      `${hasPhonePattern ? 'a phone-number pattern found' : 'no phone-number pattern found'} in the text. ` +
      'Reading level is a real Flesch-Kincaid grade computed from the fetched text.',
  }
}

export function calculateVoiceSearchScore(metrics: VoiceSearchMetrics): number {
  const readingLevelScore = metrics.averageReadingLevel === null ? 60 : clamp(100 - Math.abs(metrics.averageReadingLevel - 8) * 8)

  const score =
    metrics.conversationalKeywords * 0.25 +
    metrics.featuredSnippetOpportunities * 0.25 +
    metrics.localVoiceReadiness * 0.15 +
    metrics.questionBasedContent * 0.2 +
    readingLevelScore * 0.1 +
    (metrics.naturalLanguageOptimization ? 100 : 0) * 0.05

  return clamp(score)
}

export function generateVoiceSearchRecommendations(metrics: VoiceSearchMetrics): Array<{
  type: 'critical' | 'warning' | 'info'
  category: 'voice-search'
  title: string
  description: string
  recommendation: string
  priority: number
  impact: 'high' | 'medium' | 'low'
}> {
  const recommendations = []

  if (metrics.questionBasedContent < 50) {
    recommendations.push({
      type: 'warning' as const,
      category: 'voice-search' as const,
      title: 'Few Question-Based Headings Found',
      description: 'Voice assistants favor content structured as direct answers to spoken questions.',
      recommendation: 'Add headings phrased as questions (e.g. "What is...", "How do I...") with a concise answer immediately after.',
      priority: 3,
      impact: 'medium' as const,
    })
  }

  if (metrics.featuredSnippetOpportunities < 50) {
    recommendations.push({
      type: 'info' as const,
      category: 'voice-search' as const,
      title: 'Limited Featured-Snippet-Friendly Structure',
      description: 'No short, direct-answer paragraphs following headings, and few/no lists or tables were found.',
      recommendation: 'Follow key headings with a 1-2 sentence direct answer, and use lists/tables for step-by-step or comparison content.',
      priority: 6,
      impact: 'low' as const,
    })
  }

  if (metrics.localVoiceReadiness < 40) {
    recommendations.push({
      type: 'info' as const,
      category: 'voice-search' as const,
      title: 'Local Voice Search Signals Missing',
      description: 'No LocalBusiness schema or phone-number pattern was found on the page.',
      recommendation: 'Add LocalBusiness schema markup with your name, address, and phone number if this is a local business.',
      priority: 7,
      impact: 'low' as const,
    })
  }

  return recommendations
}
