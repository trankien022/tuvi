import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			default: 'var(--aw-color-text-default)',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--aw-font-sans, ui-sans-serif)',
                    ...defaultTheme.fontFamily.sans
                ],
  			serif: [
  				'var(--aw-font-serif, ui-serif)',
                    ...defaultTheme.fontFamily.serif
                ],
  			heading: [
  				'var(--aw-font-heading, ui-sans-serif)',
                    ...defaultTheme.fontFamily.sans
                ]
  		},
  		animation: {
  			fade: 'fadeInUp 1s both',
  			marquee: 'marquee var(--duration) linear infinite',
  			'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
  			'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'fade-up': 'fadeUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'fade-down': 'fadeDown 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'fade-left': 'fadeLeft 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'fade-right': 'fadeRight 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'scale-up': 'scaleUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'zoom-in': 'zoomIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  			'accordion-down': 'accordion-down 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  			'accordion-up': 'accordion-up 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  		},
  		keyframes: {
  			fadeInUp: {
  				'0%': {
  					opacity: 0,
  					transform: 'translate3d(0, 2rem, 0)',
  					willChange: 'transform, opacity'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translate3d(0, 0, 0)',
  					willChange: 'auto'
  				}
  			},
  			marquee: {
  				from: {
  					transform: 'translate3d(0, 0, 0)'
  				},
  				to: {
  					transform: 'translate3d(calc(-100% - var(--gap)), 0, 0)'
  				}
  			},
  			'marquee-vertical': {
  				from: {
  					transform: 'translate3d(0, 0, 0)'
  				},
  				to: {
  					transform: 'translate3d(0, calc(-100% - var(--gap)), 0)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			fadeUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate3d(0, 30px, 0)',
  					willChange: 'transform, opacity'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate3d(0, 0, 0)',
  					willChange: 'auto'
  				}
  			},
  			fadeDown: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate3d(0, -30px, 0)',
  					willChange: 'transform, opacity'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate3d(0, 0, 0)',
  					willChange: 'auto'
  				}
  			},
  			fadeLeft: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate3d(-30px, 0, 0)',
  					willChange: 'transform, opacity'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate3d(0, 0, 0)',
  					willChange: 'auto'
  				}
  			},
  			fadeRight: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate3d(30px, 0, 0)',
  					willChange: 'transform, opacity'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate3d(0, 0, 0)',
  					willChange: 'auto'
  				}
  			},
  			scaleUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale3d(0.9, 0.9, 1)',
  					willChange: 'transform, opacity'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale3d(1, 1, 1)',
  					willChange: 'auto'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translate3d(0, 50px, 0)',
  					willChange: 'transform, opacity'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translate3d(0, 0, 0)',
  					willChange: 'auto'
  				}
  			},
  			zoomIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'scale3d(0.8, 0.8, 1)',
  					willChange: 'transform, opacity'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'scale3d(1, 1, 1)',
  					willChange: 'auto'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
    require('tailwindcss-animate'),
  ],
  darkMode: ['class', 'class'],
};
