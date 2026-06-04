import type { Metadata } from 'next'
import VisualizerClient from './VisualizerClient'

export const metadata: Metadata = {
  title: 'KI-Raumvisualisierung — MadkourMedia',
  description: 'Laden Sie Ihr Raumfoto hoch und lassen Sie KI professionelle Interior-Design-Visualisierungen in Minuten erstellen.',
}

export default function VisualizerPage() {
  return <VisualizerClient />
}
