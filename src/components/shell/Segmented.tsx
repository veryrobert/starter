import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Single-choice control. Selected option is inverted, as in Card studio.
type Option<T extends string> = { value: T; label: string }

export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T
  onChange: (value: T) => void
  options: Option<T>[]
  label: string
}) {
  return (
    <ToggleGroup
      type="single"
      aria-label={label}
      value={value}
      onValueChange={v => v && onChange(v as T)}
      spacing={0}
      className="grid w-full auto-cols-fr grid-flow-col rounded-[10px] bg-muted p-0.5"
    >
      {options.map(o => (
        <ToggleGroupItem
          key={o.value}
          value={o.value}
          className="h-7 rounded-lg text-xs font-normal data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          {o.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
