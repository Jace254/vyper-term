import { h } from '@unocss/preset-mini/utils'
import type { Preset } from 'unocss'
import type { PresetMiniOptions, Theme } from 'unocss/preset-mini'

export interface PresetShadcnOptions extends PresetMiniOptions {}

function handleMatchNumber(v: string, defaultVal = '0') {
  return h.bracket.cssvar.global.auto.fraction.number(v || defaultVal)?.replace('%', '')
}
const handleMatchRem = (v: string, defaultVal = 'full') => h.bracket.cssvar.global.auto.fraction.rem(v || defaultVal)

export function presetShadcn(_options: PresetShadcnOptions = {}): Preset<Theme> {
  return {
    name: 'unocss-preset-shadcn',
    preflights: [
      {
        getCSS: () => `
          @keyframes shadcn-down { from{ height: 0 } to { height: var(--radix-accordion-content-height)} }
          @keyframes shadcn-up { from{ height: var(--radix-accordion-content-height)} to { height: 0 } }
          @keyframes shadcn-enter { from{ opacity: var(--un-enter-opacity, 1); transform: translate3d(var(--un-enter-translate-x, 0), var(--un-enter-translate-y, 0), 0) scale3d(var(--un-enter-scale, 1), var(--un-enter-scale, 1), var(--un-enter-scale, 1)) rotate(var(--un-enter-rotate, 0)) } }
          @keyframes shadcn-exit { to{ opacity: var(--un-exit-opacity, 1); transform: translate3d(var(--un-exit-translate-x, 0), var(--un-exit-translate-y, 0), 0) scale3d(var(--un-exit-scale, 1), var(--un-exit-scale, 1), var(--un-exit-scale, 1)) rotate(var(--un-exit-rotate, 0)) } }
        
          :root {
            --background-widget: 0 0% 100%;
            --foreground-widget: 222.2 84% 4.9%;
          
            --card-widget: 0 0% 100%;
            --card-foreground: 222.2 84% 4.9%;
          
            --popover-widget: 0 0% 100%;
            --popover-foreground: 222.2 84% 4.9%;
          
            --primary-widget: 221.2 83.2% 53.3%;
            --primary-foreground-widget: 210 40% 98%;
          
            --secondarywidget: 210 40% 96.1%;
            --secondary-foreground-widget: 222.2 47.4% 11.2%;
          
            --muted-widget: 210 40% 96.1%;
            --muted-foreground-widget: 215.4 16.3% 46.9%;
          
            --accent-widget: 210 40% 96.1%;
            --accent-foreground: 222.2 47.4% 11.2%;
          
            --destructive-widget: 0 84.2% 60.2%;
            --destructive-foreground-widget: 210 40% 98%;
          
            --border-widget:214.3 31.8% 91.4%;
            --input-widget:214.3 31.8% 91.4%;
            --ring-widget:221.2 83.2% 53.3%;
            --radius-widget: 0.5rem;
          }
           
          .dark {
            --background-widget:222.2 84% 4.9%;
            --foreground-widget:210 40% 98%;
          
            --card-widget:222.2 84% 4.9%;
            --card-foreground-widget:210 40% 98%;
          
            --popover:222.2 84% 4.9%;
            --popover-foreground:210 40% 98%;
          
            --primary-widget:217.2 91.2% 59.8%;
            --primary-foreground-widget:222.2 47.4% 11.2%;
          
            --secondary-widget:217.2 32.6% 17.5%;
            --secondary-foreground-widget:210 40% 98%;
          
            --muted-widget:217.2 32.6% 17.5%;
            --muted-foreground-widget:215 20.2% 65.1%;
          
            --accent-widget:217.2 32.6% 17.5%;
            --accent-foreground-widget:210 40% 98%;
          
            --destructive-widget:0 62.8% 30.6%;
            --destructive-foreground-widget:210 40% 98%;
          
            --border-widget:217.2 32.6% 17.5%;
            --input-widget:217.2 32.6% 17.5%;
            --ring-widget:224.3 76.3% 48%;
          }
        `,
      },
    ],
    rules: [
      [
        'accordion-down',
        {
          animation: 'shadcn-down 0.2s ease-out',
        },
      ],
      [
        'accordion-up',
        {
          animation: 'shadcn-up 0.2s ease-out',
        },
      ],
      [
        'animate-in',
        {
          'animation-name': 'shadcn-enter',
          'animation-duration': 'var(--un-animate-duration)',
          '--un-animate-duration': '150ms',
          '--un-enter-opacity': 'initial',
          '--un-enter-scale': 'initial',
          '--un-enter-rotate': 'initial',
          '--un-enter-translate-x': 'initial',
          '--un-enter-translate-y': 'initial',
        },
      ],
      [
        'animate-out',
        {
          'animation-name': 'shadcn-exit',
          'animation-duration': 'var(--un-animate-duration)',
          '--un-animate-duration': '150ms',
          '--un-exit-opacity': 'initial',
          '--un-exit-scale': 'initial',
          '--un-exit-rotate': 'initial',
          '--un-exit-translate-x': 'initial',
          '--un-exit-translate-y': 'initial',
        },
      ],
      [/^fade-in-?(.+)?$/, ([, d]) => ({ '--un-enter-opacity': `${Number(handleMatchNumber(d) || 0) / 100}` })],
      [/^fade-out-?(.+)?$/, ([, d]) => ({ '--un-exit-opacity': `${Number(handleMatchNumber(d) || 0) / 100}` })],
      [/^zoom-in-?(.+)?$/, ([, d]) => ({ '--un-enter-scale': `${Number(handleMatchNumber(d) || 0) / 100}` })],
      [/^zoom-out-?(.+)?$/, ([, d]) => ({ '--un-exit-scale': `${Number(handleMatchNumber(d) || 0) / 100}` })],
      [/^spin-in-?(.+)?$/, ([, d]) => ({ '--un-enter-rotate': `${Number(handleMatchNumber(d) || 0)}deg` })],
      [/^spin-out-?(.+)?$/, ([, d]) => ({ '--un-exit-rotate': `${Number(handleMatchNumber(d) || 0)}deg` })],
      [/^slide-in-from-top-?(.+)?$/, ([, d]) => ({ '--un-enter-translate-y': `-${handleMatchRem(d)}` })],
      [/^slide-in-from-bottom-?(.+)?$/, ([, d]) => ({ '--un-enter-translate-y': handleMatchRem(d) })],
      [/^slide-in-from-left-?(.+)?$/, ([, d]) => ({ '--un-enter-translate-x': `-${handleMatchRem(d)}` })],
      [/^slide-in-from-right-?(.+)?$/, ([, d]) => ({ '--un-enter-translate-x': handleMatchRem(d) })],
      [/^slide-out-to-top-?(.+)?$/, ([, d]) => ({ '--un-exit-translate-y': `-${handleMatchRem(d)}` })],
      [/^slide-out-to-bottom-?(.+)?$/, ([, d]) => ({ '--un-exit-translate-y': handleMatchRem(d) })],
      [/^slide-out-to-left-?(.+)?$/, ([, d]) => ({ '--un-exit-translate-x': `-${handleMatchRem(d)}` })],
      [/^slide-out-to-right-?(.+)?$/, ([, d]) => ({ '--un-exit-translate-x': handleMatchRem(d) })],
    ],
    theme: {
      colors: {
        border: 'hsl(var(--border-widget))',
        input: 'hsl(var(--input-widget))',
        ring: 'hsl(var(--ring-widget))',
        background: 'hsl(var(--background-widget))',
        foreground: 'hsl(var(--foreground-widget))',
        primary: {
          DEFAULT: 'hsl(var(--primary-widget))',
          foreground: 'hsl(var(--primary-foreground-widget))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary-widget))',
          foreground: 'hsl(var(--secondary-foreground-widget))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive-widget))',
          foreground: 'hsl(var(--destructive-foreground-widget))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted-widget))',
          foreground: 'hsl(var(--muted-foreground-widget))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent-widget))',
          foreground: 'hsl(var(--accent-foreground-widget))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover-widget))',
          foreground: 'hsl(var(--popover-foreground-widget))',
        },
        card: {
          DEFAULT: 'hsl(var(--card-widget))',
          foreground: 'hsl(var(--card-foreground-widget))',
        },
      },
      borderRadius: {
        lg: `var(--radius-widget)`,
        md: `calc(var(--radius-widget) - 2px)`,
        sm: 'calc(var(--radius-widget) - 4px)',
      },
    },
  }
}

export default presetShadcn
