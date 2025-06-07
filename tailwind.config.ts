
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'system-ui', 'sans-serif'],
				'poppins': ['Poppins', 'system-ui', 'sans-serif'],
				'sf-pro': ['SF Pro Display', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				fintech: {
					navy: '#060819',
					teal: '#14B8A6',
					lime: '#84CC16',
					electric: '#10B981',
					neon: '#39FF14',
					glass: 'rgba(255, 255, 255, 0.08)',
					'neon-cyan': '#00FFFF',
					'neon-pink': '#FF1493',
					'neon-yellow': '#FFFF00',
				}
			},
			backgroundImage: {
				'fintech-gradient': 'linear-gradient(135deg, #060819 0%, #14B8A6 50%, #84CC16 100%)',
				'fintech-dark': 'linear-gradient(135deg, #060819 0%, #1E293B 100%)',
				'neon-glow': 'linear-gradient(135deg, #10B981 0%, #39FF14 100%)',
				'neubrutalist-bg': 'linear-gradient(135deg, #060819 0%, #0F172A 25%, #1E1B4B 50%, #312E81 75%, #3730A3 100%)',
				'glass-morphism': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
				'holographic': 'linear-gradient(45deg, transparent, rgba(16, 185, 129, 0.1), transparent, rgba(20, 184, 166, 0.1), transparent, rgba(139, 92, 246, 0.1), transparent)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				},
				'typewriter': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'blink-caret': {
					'from, to': { 'border-color': 'transparent' },
					'50%': { 'border-color': 'rgba(16, 185, 129, 0.8)' }
				},
				'letter-spacing-grow': {
					'from': { 'letter-spacing': '0' },
					'to': { 'letter-spacing': '0.1em' }
				},
				'holographic': {
					'0%, 100%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' }
				},
				'float-coins': {
					'0%, 100%': { 
						transform: 'translateY(0px) rotateZ(0deg)'
					},
					'33%': { 
						transform: 'translateY(-20px) rotateZ(120deg)'
					},
					'66%': { 
						transform: 'translateY(10px) rotateZ(240deg)'
					}
				},
				'orbit': {
					'0%': { transform: 'rotate(0deg) translateX(100px) rotate(0deg)' },
					'100%': { transform: 'rotate(360deg) translateX(100px) rotate(-360deg)' }
				},
				'pulse-glow': {
					'0%, 100%': {
						'box-shadow': '0 0 20px rgba(16, 185, 129, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)'
					},
					'50%': {
						'box-shadow': '0 0 40px rgba(16, 185, 129, 0.8), 0 0 80px rgba(16, 185, 129, 0.6)'
					}
				},
				'slide-up-spring': {
					'0%': {
						transform: 'translateY(100px)',
						opacity: '0'
					},
					'60%': {
						transform: 'translateY(-10px)',
						opacity: '0.8'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'magnetic-hover': {
					'0%': { transform: 'translateY(0) scale(1)' },
					'100%': { transform: 'translateY(-2px) scale(1.02)' }
				},
				'ripple-burst': {
					'0%': { 
						transform: 'scale(1)',
						opacity: '1'
					},
					'100%': { 
						transform: 'scale(1.5)',
						opacity: '0'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)',
						'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(-10px)',
						'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				'shimmer': {
					'0%': { 'background-position': '-200% 0' },
					'100%': { 'background-position': '200% 0' }
				},
				'counter-glow': {
					'0%': { 'text-shadow': '0 0 10px rgba(16, 185, 129, 0.8)' },
					'50%': { 'text-shadow': '0 0 20px rgba(16, 185, 129, 1), 0 0 30px rgba(16, 185, 129, 0.8)' },
					'100%': { 'text-shadow': '0 0 10px rgba(16, 185, 129, 0.8)' }
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'stagger-slide-left': {
					'0%': {
						transform: 'translateX(-100px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'stagger-slide-right': {
					'0%': {
						transform: 'translateX(100px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'neon-flicker': {
					'0%, 100%': { 'text-shadow': '0 0 10px rgba(16, 185, 129, 0.8)' },
					'50%': { 'text-shadow': '0 0 20px rgba(16, 185, 129, 1), 0 0 30px rgba(16, 185, 129, 0.8)' }
				},
				'radial-reveal': {
					'0%': {
						transform: 'scale(0) rotate(0deg)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1) rotate(360deg)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'typewriter': 'typewriter 2s steps(40, end), blink-caret 0.75s step-end infinite',
				'letter-spacing': 'letter-spacing-grow 1.5s ease-out forwards',
				'holographic': 'holographic 3s ease-in-out infinite',
				'float-coins': 'float-coins 6s ease-in-out infinite',
				'orbit': 'orbit 10s linear infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'slide-up-spring': 'slide-up-spring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'magnetic-hover': 'magnetic-hover 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
				'ripple-burst': 'ripple-burst 0.6s ease-out forwards',
				'bounce-gentle': 'bounce-gentle 2s infinite',
				'shimmer': 'shimmer 2s infinite',
				'counter-glow': 'counter-glow 0.5s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'stagger-left': 'stagger-slide-left 0.6s ease-out',
				'stagger-right': 'stagger-slide-right 0.6s ease-out',
				'neon-flicker': 'neon-flicker 2s ease-in-out infinite',
				'radial-reveal': 'radial-reveal 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
			},
			backdropBlur: {
				xs: '2px',
				'3xl': '64px',
			},
			scale: {
				'102': '1.02',
				'103': '1.03',
			},
			transitionTimingFunction: {
				'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
