// Edit this when starting a deck. The footer and the section dividers read it.

export const deckLabel = 'TC Detector · Sprint 1'

export type PartIcon = 'topology' | 'code' | 'flask' | 'chart' | 'bulb'

export interface DeckPart {
  title: string
  color: string
  icon: PartIcon
}

export const parts: DeckPart[] = [
  { title: 'Goal', color: 'var(--blue)', icon: 'topology' },
  { title: 'What we built', color: 'var(--orange)', icon: 'code' },
  { title: 'Pilot design', color: 'var(--purple)', icon: 'flask' },
  { title: 'Results', color: 'var(--green)', icon: 'chart' },
  { title: 'Next', color: 'var(--red)', icon: 'bulb' },
]
