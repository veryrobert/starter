import { useState } from 'react'
import { Download, Palette, RotateCcw, SlidersHorizontal, Sun } from 'lucide-react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ToolButton } from '@/components/shell/ToolButton'
import { Toolbar, ToolbarSeparator } from '@/components/shell/Toolbar'
import { Segmented } from '@/components/shell/Segmented'
import { Field, FieldGroup } from '@/components/shell/Field'
import { Splash } from '@/components/shell/Splash'
import { cn } from '@/lib/utils'

// Example app shell: full-bleed stage, tool rail top right, sheet for
// settings, toolbar bottom centre. Replace the stage with your app.

const panels = [
  { id: 'design', label: 'Design', icon: SlidersHorizontal },
  { id: 'colour', label: 'Colour', icon: Palette },
  { id: 'light', label: 'Lighting', icon: Sun },
  { id: 'export', label: 'Export', icon: Download },
] as const

type PanelId = (typeof panels)[number]['id']

export default function App() {
  const [panel, setPanel] = useState<PanelId | null>(null)
  const [shape, setShape] = useState<'circle' | 'square'>('circle')
  const [size, setSize] = useState(160)
  const [label, setLabel] = useState('Starter')
  const current = panels.find(p => p.id === panel)

  return (
    <TooltipProvider delayDuration={400}>
      <Splash label="Loading">
        <path pathLength={1} d="M7 5h18a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
        <path pathLength={1} d="M16 11v10" />
        <path pathLength={1} d="M11 16h10" />
      </Splash>
      <main className="fixed inset-0 grid place-items-center">
        <div
          className={cn('grid place-items-center bg-foreground text-primary-foreground transition-all', shape === 'circle' ? 'rounded-full' : 'rounded-2xl')}
          style={{ width: size, height: size }}
        >
          <span className="text-sm font-medium">{label}</span>
        </div>
      </main>

      <nav
        aria-label="Panels"
        className={cn('panel fixed top-3 right-3 z-60 flex flex-col gap-1 rounded-full p-1 transition-[right] duration-200', panel && 'sm:right-[calc(300px+0.75rem)]')}
      >
        {panels.map(p => (
          <ToolButton
            key={p.id}
            icon={p.icon}
            label={p.label}
            active={panel === p.id}
            onClick={() => setPanel(panel === p.id ? null : p.id)}
          />
        ))}
      </nav>

      <Sheet open={panel !== null} onOpenChange={open => !open && setPanel(null)} modal={false}>
        <SheetContent
          side="right"
          className="panel gap-0 data-[side=right]:w-[min(300px,86vw)] data-[side=right]:sm:max-w-[300px]"
          onInteractOutside={e => e.preventDefault()}
        >
          <SheetHeader>
            <SheetTitle>{current?.label}</SheetTitle>
            <SheetDescription className="sr-only">{current?.label} settings</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-6">
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
          </div>
        </SheetContent>
      </Sheet>

      <div className="pointer-events-none fixed inset-x-0 bottom-4 flex justify-center">
        <Toolbar aria-label="Actions" className="pointer-events-auto">
          <ToolButton icon={RotateCcw} label="Reset" side="top" onClick={() => setSize(160)} />
          <ToolbarSeparator />
          <ToolButton icon={Download} label="Export" side="top" onClick={() => setPanel('export')} />
        </Toolbar>
      </div>
    </TooltipProvider>
  )
}
