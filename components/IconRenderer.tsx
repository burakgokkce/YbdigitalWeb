import {
  Globe,
  Smartphone,
  Cog,
  Palette,
  ClipboardList,
  Map,
  Sparkles,
  Code,
  Search,
  Rocket,
  Zap,
  BarChart3,
  Cloud,
  PenTool,
  Layout,
  Home,
  User,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  cog: Cog,
  palette: Palette,
  clipboard: ClipboardList,
  map: Map,
  sparkles: Sparkles,
  code: Code,
  search: Search,
  rocket: Rocket,
  zap: Zap,
  'bar-chart': BarChart3,
  cloud: Cloud,
  'pen-tool': PenTool,
  layout: Layout,
  home: Home,
  user: User,
}

interface IconRendererProps {
  name: string
  size?: number
  className?: string
}

export default function IconRenderer({ name, size = 32, className = '' }: IconRendererProps) {
  const IconComponent = iconMap[name]
  if (!IconComponent) return null
  return <IconComponent size={size} className={className} />
}
