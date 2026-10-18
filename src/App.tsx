import { useState } from 'react'
import { Download, Frame, Palette, RotateCcw, Shapes } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ToolButton } from '@/components/shell/ToolButton'
import { Toolbar } from '@/components/shell/Toolbar'
import { Segmented } from '@/components/shell/Segmented'
import { Field, FieldGroup } from '@/components/shell/Field'
import { Splash } from '@/components/shell/Splash'
import { PanelRail } from '@/components/shell/PanelRail'
import { PanelSheet } from '@/components/shell/PanelSheet'
import { ActionDock } from '@/components/shell/ActionDock'
import { PANEL_W, PHONE_SHEET, SAFE_BOTTOM, usePhone } from '@/components/shell/layout'
import { FORMATS, type FormatName, formatTall } from '@/components/shell/formats'
import { cn } from '@/lib/utils'

// Example app shell: full-bleed stage, tool rail top right, sheet for
// settings, toolbar bottom centre. Replace the stage with your app.
// Panels run in the shared order (see CLAUDE.md): what you make, Colour, Canvas, the app's own,
// Library, Settings, Export last.

const panels = [
  { id: 'design', label: 'Design', icon: Shapes },
  { id: 'colour', label: 'Colour', icon: Palette },
  { id: 'canvas', label: 'Canvas', icon: Frame },
  { id: 'export', label: 'Export', icon: Download },
] as const

type PanelId = (typeof panels)[number]['id']

export default function App() {
  const [panel, setPanel] = useState<PanelId | null>(null)
  const phone = usePhone()
  const [shape, setShape] = useState<'circle' | 'square'>('circle')
  const [size, setSize] = useState(160)
  const [label, setLabel] = useState('Starter')
  const [format, setFormat] = useState<FormatName>('4:5') // every app starts on 4:5
  const current = panels.find(p => p.id === panel)

  return (
    <TooltipProvider delayDuration={400}>
      <Splash label="Loading">
        <path pathLength={1} d="M7 5h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
        <path pathLength={1} d="M16 11v10" />
        <path pathLength={1} d="M11 16h10" />
      </Splash>
      <main
        className="fixed inset-0 grid place-items-center transition-[right,bottom] duration-200"
        // The stage keeps clear of the panel: beside it on desktop, above it (or the bars) on phones
        style={phone ? { bottom: panel ? `${PHONE_SHEET * 100}dvh` : `calc(${SAFE_BOTTOM} + 68px)`, top: 'calc(env(safe-area-inset-top, 0px) + 72px)' } : { right: panel ? PANEL_W : 0 }}
      >
        <div
          className={cn('grid place-items-center bg-foreground text-primary-foreground transition-all', shape === 'circle' ? 'rounded-full' : 'rounded-2xl')}
          style={{ width: size, height: size * formatTall(format) }}
        >
          <span className="text-sm font-medium">{label}</span>
        </div>
      </main>

      <PanelRail panels={panels} open={panel} onToggle={id => setPanel(panel === id ? null : id)} phone={phone} />

      <PanelSheet open={panel !== null} title={current?.label} onClose={() => setPanel(null)} phone={phone}>
          {panel === 'canvas' ? (
            <FieldGroup>
              <Field label="Format">
                <Segmented label="Format" value={format} onChange={setFormat} options={FORMATS.map(f => ({ value: f.name, label: f.name }))} />
              </Field>
            </FieldGroup>
          ) : (<>
            <FieldGroup>
              <Field label="Shape">
                <Segmented
                  label="Shape"
                  value={shape}
                  onChange={setShape}
                  options={[{ value: 'circle', label: 'Circle' }, { value: 'square', label: 'Square' }]}
                />
              </Field>
              <Field label="Size">
                <Slider min={80} max={320} value={[size]} onValueChange={([v]) => setSize(v)} aria-label="Size" />
              </Field>
            </FieldGroup>
            <FieldGroup title="Text">
              <Field label="Label">
                <Input value={label} onChange={e => setLabel(e.target.value)} />
              </Field>
            </FieldGroup>
            <Button variant="secondary" onClick={() => { setShape('circle'); setSize(160); setLabel('Starter') }}>
              Reset
            </Button>
          </>)}
      </PanelSheet>

      <ActionDock phone={phone} panelOpen={panel !== null}>
        <Toolbar aria-label="Actions">
          <ToolButton icon={RotateCcw} label="Reset" side="top" onClick={() => setSize(160)} />
        </Toolbar>
      </ActionDock>
    </TooltipProvider>
  )
}
