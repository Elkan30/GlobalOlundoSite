import { useState } from 'react'

// ── SVG Logo Mark ─────────────────────────────────────────────────────────────
function OlundoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <defs>
        <linearGradient id="gmark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8692a" />
          <stop offset="55%" stopColor="#c0504a" />
          <stop offset="100%" stopColor="#7b3fa0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 360) / 12
        const rad = (angle * Math.PI) / 180
        const inner = 18, outer = i % 2 === 0 ? 36 : 29
        const x1 = 40 + inner * Math.cos(rad), y1 = 40 + inner * Math.sin(rad)
        const x2 = 40 + outer * Math.cos(rad), y2 = 40 + outer * Math.sin(rad)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#gmark)" strokeWidth={i % 2 === 0 ? 3.5 : 2} strokeLinecap="round" />
      })}
      <circle cx="40" cy="40" r="9" fill="url(#gmark)" />
    </svg>
  )
}

// ── Companies grid data ───────────────────────────────────────────────────────
const companies = [
  {
    id: 'agro',
    name: 'Olundo Agro',
    label: 'Agronegócio',
    gridArea: 'agro',
    img: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&h=700&fit=crop&auto=format',
    desc: 'Produção, transformação e comercialização agrícola sustentável.',
  },
  {
    id: 'controi',
    name: 'Olundo Controi',
    label: 'Construção Civil',
    gridArea: 'controi',
    img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=1200&fit=crop&auto=format',
    desc: 'Engenharia e construção de infraestruturas de qualidade.',
  },
  {
    id: 'pharma',
    name: 'Olundo Pharma',
    label: 'Farmácia & Wellness',
    gridArea: 'pharma',
    img: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=700&fit=crop&auto=format',
    desc: 'Distribuição farmacêutica e soluções de saúde.',
  },
  {
    id: 'logistica',
    name: 'Olundo Logística',
    label: 'Logística',
    gridArea: 'logistica',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop&auto=format',
    desc: 'Gestão integrada da cadeia de abastecimento nacional.',
  },
  {
    id: 'transportes',
    name: 'Olundo Transportes',
    label: 'Transportes',
    gridArea: 'transportes',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&h=600&fit=crop&auto=format',
    desc: 'Transporte rodoviário com frota moderna.',
  },
  {
    id: 'ebo',
    name: 'Ebo Decorações',
    label: 'Decoração & Eventos',
    gridArea: 'ebo',
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=900&h=500&fit=crop&auto=format',
    desc: 'Design de interiores e gestão de eventos.',
  },
  {
    id: 'bar',
    name: 'Olundo Bar & Restaurante',
    label: 'Restauração',
    gridArea: 'bar',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=500&fit=crop&auto=format',
    desc: 'Gastronomia angolana e internacional num ambiente único.',
  },
]

const navLeft = ['Sobre Nós', 'Soluções', 'Empresas']
const navRight = ['Investimentos', 'Contactos']

// ── Page sections (below homepage) ───────────────────────────────────────────
type Section = 'home' | 'sobre' | 'empresas' | 'investimentos' | 'contactos'

export default function App() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<Section>('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<typeof companies[0] | null>(null)

  const navHeight = 62 // px

  const goto = (s: Section) => {
    setActiveSection(s)
    setMenuOpen(false)
    setSelectedCompany(null)
    window.scrollTo({ top: 0 })
  }

  return (
    <div style={{ fontFamily: 'Outfit, sans-serif', background: '#10142a', minHeight: '100vh' }}>

      {/* ── NAV ──────────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        height: navHeight,
        background: '#10142a',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center',
      }}>
        <div style={{
          maxWidth: 1440, margin: '0 auto', padding: '0 2rem',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          gap: '2rem',
        }}>
          {/* Nav left */}
          <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            {navLeft.map(label => (
              <button
                key={label}
                onClick={() => goto(label.toLowerCase().replace(' ', '') as Section)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'color 0.2s',
                  padding: 0,
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >{label}</button>
            ))}
          </div>

          {/* Logo — center */}
          <button
            onClick={() => goto('home')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 0,
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <OlundoMark size={34} />
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '0.56rem', fontWeight: 700,
                letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.5)', lineHeight: 1,
                marginBottom: 3,
              }}>GLOBAL</div>
              <div style={{
                fontSize: '1.1rem', fontWeight: 900,
                letterSpacing: '0.08em', color: '#fff', lineHeight: 1,
              }}>OLUNDO</div>
            </div>
          </button>

          {/* Nav right */}
          <div className="nav-right" style={{ display: 'flex', alignItems: 'center', gap: 36, justifyContent: 'flex-end' }}>
            {navRight.map(label => (
              <button
                key={label}
                onClick={() => goto(label.toLowerCase().replace(' ', '') as Section)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '0.72rem', fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  fontFamily: 'Outfit, sans-serif',
                  transition: 'color 0.2s', padding: 0, whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
              >{label}</button>
            ))}
            <button
              onClick={() => goto('contactos')}
              style={{
                background: 'var(--orange, #e8692a)',
                border: 'none', cursor: 'pointer',
                color: '#fff', fontFamily: 'Outfit, sans-serif',
                fontSize: '0.68rem', fontWeight: 800,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '0.55rem 1.25rem',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f0813d')}
              onMouseLeave={e => (e.currentTarget.style.background = '#e8692a')}
            >Contactar</button>
          </div>
        </div>
      </nav>

      {/* ── HOMEPAGE — full-viewport mosaic ──────────────────────────────── */}
      {activeSection === 'home' && (
        <div style={{
          paddingTop: navHeight,
          height: '100vh',
          overflow: 'hidden',
        }}>
          <div style={{
            height: `calc(100vh - ${navHeight}px)`,
            display: 'grid',
            gridTemplateAreas: `
              "agro      agro      controi    pharma     logistica"
              "agro      agro      controi    pharma     transportes"
              "ebo       ebo       controi    bar        transportes"
            `,
            gridTemplateColumns: '14% 14% 32% 24% 16%',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: '2px',
            background: '#10142a',
          }}>
            {companies.map(co => (
              <button
                key={co.id}
                onMouseEnter={() => setHovered(co.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => { setSelectedCompany(co); goto('empresas') }}
                style={{
                  gridArea: co.gridArea,
                  position: 'relative',
                  overflow: 'hidden',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  display: 'block',
                  background: '#1a1f3c',
                }}
              >
                {/* Photo */}
                <img
                  src={co.img}
                  alt={co.name}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s ease',
                    transform: hovered === co.id ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
                {/* Dark overlay — stronger on hover */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: hovered === co.id
                    ? 'linear-gradient(180deg, rgba(16,20,42,0.1) 0%, rgba(16,20,42,0.7) 100%)'
                    : 'linear-gradient(180deg, rgba(16,20,42,0.05) 0%, rgba(16,20,42,0.55) 100%)',
                  transition: 'background 0.4s ease',
                }} />
                {/* Orange side accent on hover */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
                  background: 'linear-gradient(180deg, #e8692a, #7b3fa0)',
                  opacity: hovered === co.id ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }} />

                {/* Label */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '1.25rem 1.25rem 1.1rem',
                }}>
                  {/* Sector tag */}
                  <div style={{
                    fontSize: '0.58rem', fontWeight: 700,
                    letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: '#e8692a', marginBottom: '0.3rem',
                    opacity: hovered === co.id ? 1 : 0.7,
                    transition: 'opacity 0.3s',
                  }}>{co.label}</div>
                  {/* Company name */}
                  <div style={{
                    fontSize: '0.9rem', fontWeight: 800,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: '#ffffff', lineHeight: 1.2,
                  }}>{co.name}</div>
                  {/* Description — only on hover */}
                  <div style={{
                    fontSize: '0.72rem', color: 'rgba(255,255,255,0.75)',
                    marginTop: '0.35rem', lineHeight: 1.5,
                    maxHeight: hovered === co.id ? 40 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.4s ease',
                    fontWeight: 300,
                  }}>{co.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── SOBRE NÓS ────────────────────────────────────────────────────── */}
      {activeSection === 'sobrenos' && (
        <div style={{ paddingTop: navHeight, minHeight: '100vh', background: '#10142a' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '5rem 2rem' }}>
            <div style={{ color: '#e8692a', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem' }}>
              — Quem Somos
            </div>
            <h1 style={{
              fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900,
              color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1,
              marginBottom: '1.5rem',
            }}>
              Lideramos negócios.<br />
              <span style={{
                background: 'linear-gradient(135deg,#e8692a,#c0504a,#7b3fa0)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Criamos impacto.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 640, fontWeight: 300, marginBottom: '2rem' }}>
              O Grupo Global Olundo é uma holding multissectorial angolana fundada com a missão de contribuir activamente para o desenvolvimento económico e social do país, investindo em sectores estratégicos com visão de longo prazo.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 600, fontWeight: 300, marginBottom: '3rem' }}>
              Com uma carteira diversificada de sete empresas, o Grupo opera da produção agrícola ao retalho farmacêutico, da construção civil ao transporte e logística — posicionando-se como parceiro de referência na economia angolana.
            </p>

            {/* Stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))',
              gap: '0.5rem', marginBottom: '3rem',
            }}>
              {[
                { v: '7+', l: 'Empresas' }, { v: '15+', l: 'Anos' },
                { v: '500+', l: 'Colaboradores' }, { v: '12', l: 'Províncias' },
              ].map(s => (
                <div key={s.l} style={{
                  padding: '1.75rem 1.5rem',
                  border: '1px solid rgba(232,105,42,0.15)',
                  background: 'rgba(255,255,255,0.02)',
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#e8692a', lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: 6 }}>{s.l}</div>
                </div>
              ))}
            </div>

            {/* MVV */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px,1fr))', gap: '1rem' }}>
              {[
                { t: 'Missão', icon: '🎯', txt: 'Oferecer soluções empresariais integradas e inovadoras que contribuam para o desenvolvimento da economia angolana.' },
                { t: 'Visão', icon: '🌍', txt: 'Ser o grupo empresarial multissectorial de maior referência em Angola até 2030.' },
                { t: 'Valores', icon: '⚖️', txt: 'Integridade, excelência operacional, inovação e responsabilidade social em cada decisão.' },
              ].map(v => (
                <div key={v.t} style={{
                  padding: '2rem', background: '#1a1f3c',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{ fontSize: 28, marginBottom: '0.75rem' }}>{v.icon}</div>
                  <div style={{ color: '#e8692a', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>{v.t}</div>
                  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.7, fontWeight: 300 }}>{v.txt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── EMPRESAS ─────────────────────────────────────────────────────── */}
      {activeSection === 'empresas' && (
        <div style={{ paddingTop: navHeight, minHeight: '100vh', background: '#10142a' }}>
          {/* Company detail modal if selected */}
          {selectedCompany && (
            <div style={{
              position: 'fixed', inset: 0, zIndex: 300,
              background: 'rgba(10,14,26,0.95)', backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
            }} onClick={() => setSelectedCompany(null)}>
              <div
                onClick={e => e.stopPropagation()}
                style={{
                  background: '#1a1f3c', maxWidth: 680, width: '100%',
                  border: '1px solid rgba(232,105,42,0.2)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'relative', height: 320 }}>
                  <img src={selectedCompany.img} alt={selectedCompany.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 30%, rgba(26,31,60,0.95) 100%)',
                  }} />
                  <button
                    onClick={() => setSelectedCompany(null)}
                    style={{
                      position: 'absolute', top: 16, right: 16,
                      background: 'rgba(10,14,26,0.8)', border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff', cursor: 'pointer', width: 36, height: 36,
                      fontSize: 16, fontFamily: 'Outfit, sans-serif',
                    }}
                  >✕</button>
                  <div style={{ position: 'absolute', bottom: 24, left: 28 }}>
                    <div style={{ color: '#e8692a', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>{selectedCompany.label}</div>
                    <h2 style={{ color: '#fff', fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.01em' }}>{selectedCompany.name}</h2>
                  </div>
                </div>
                <div style={{ padding: '2rem 2rem 2.5rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, fontWeight: 300, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                    {selectedCompany.desc} A empresa actua com foco em qualidade, inovação e responsabilidade social, contribuindo para o desenvolvimento sustentável do sector em Angola.
                  </p>
                  <button
                    onClick={() => goto('contactos')}
                    style={{
                      background: '#e8692a', border: 'none', cursor: 'pointer',
                      color: '#fff', fontFamily: 'Outfit, sans-serif',
                      fontSize: '0.72rem', fontWeight: 800,
                      letterSpacing: '0.12em', textTransform: 'uppercase',
                      padding: '0.875rem 2rem',
                    }}
                  >Contactar esta Empresa</button>
                </div>
              </div>
            </div>
          )}

          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
            <div style={{ color: '#e8692a', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>— Portefólio</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '3rem' }}>
              As Empresas do Grupo
            </h1>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))',
              gap: '2px', background: '#10142a',
            }}>
              {companies.map(co => (
                <button
                  key={co.id}
                  onClick={() => setSelectedCompany(co)}
                  style={{
                    position: 'relative', height: 260, overflow: 'hidden',
                    border: 'none', cursor: 'pointer', padding: 0,
                    background: '#1a1f3c',
                  }}
                  onMouseEnter={e => {
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement
                    if (img) img.style.transform = 'scale(1.06)'
                  }}
                  onMouseLeave={e => {
                    const img = e.currentTarget.querySelector('img') as HTMLImageElement
                    if (img) img.style.transform = 'scale(1)'
                  }}
                >
                  <img src={co.img} alt={co.name} style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover', transition: 'transform 0.5s ease',
                  }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(16,20,42,0.1) 0%,rgba(16,20,42,0.75) 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                    <div style={{ color: '#e8692a', fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 5 }}>{co.label}</div>
                    <div style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{co.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── INVESTIMENTOS ────────────────────────────────────────────────── */}
      {activeSection === 'investimentos' && (
        <div style={{ paddingTop: navHeight, minHeight: '100vh', background: '#10142a', display: 'flex', alignItems: 'center' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 2rem', textAlign: 'center' }}>
            <div style={{ color: '#e8692a', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem' }}>
              — Parcerias & Investimento
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Construamos o futuro{' '}
              <span style={{ background: 'linear-gradient(135deg,#e8692a,#c0504a,#7b3fa0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>juntos.</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 560, margin: '0 auto 3rem', fontWeight: 300 }}>
              O Grupo Global Olundo está aberto a parcerias estratégicas, joint ventures e oportunidades de investimento em todos os sectores da sua área de actuação.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1px', background: 'rgba(255,255,255,0.05)', margin: '0 auto 3rem' }}>
              {['Parcerias Comerciais', 'Joint Ventures', 'Expansão Sectorial', 'Captação de Capital'].map(t => (
                <div key={t} style={{
                  padding: '1.75rem', background: '#10142a',
                  borderLeft: '2px solid transparent',
                  cursor: 'default',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderLeftColor = '#e8692a')}
                  onMouseLeave={e => (e.currentTarget.style.borderLeftColor = 'transparent')}
                >
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 500 }}>{t}</div>
                </div>
              ))}
            </div>
            <button onClick={() => goto('contactos')} style={{
              background: '#e8692a', border: 'none', cursor: 'pointer',
              color: '#fff', fontFamily: 'Outfit, sans-serif',
              fontSize: '0.75rem', fontWeight: 800,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              padding: '1rem 2.5rem',
            }}>Iniciar Conversa</button>
          </div>
        </div>
      )}

      {/* ── CONTACTOS ────────────────────────────────────────────────────── */}
      {activeSection === 'contactos' && (
        <div style={{ paddingTop: navHeight, minHeight: '100vh', background: '#10142a' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem' }}>
            <div style={{ color: '#e8692a', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1rem' }}>— Contacte-nos</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em', marginBottom: '3rem' }}>
              Estamos ao seu dispor
            </h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px,1fr))', gap: '4rem' }}>
              <div>
                {[
                  { icon: '📍', label: 'Sede', value: 'Luanda, República de Angola' },
                  { icon: '📞', label: 'Telefone', value: '+244 923 456 789' },
                  { icon: '✉️', label: 'Email', value: 'info@globalolundo.com' },
                  { icon: '🌐', label: 'Website', value: 'www.globalolundo.com' },
                ].map(c => (
                  <div key={c.label} style={{ display: 'flex', gap: 16, marginBottom: '1.75rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: 40, height: 40, flexShrink: 0,
                      background: 'rgba(232,105,42,0.08)',
                      border: '1px solid rgba(232,105,42,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18,
                    }}>{c.icon}</div>
                    <div>
                      <div style={{ color: '#e8692a', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
                      <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', fontWeight: 300 }}>{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Nome Completo', type: 'text', placeholder: 'O seu nome' },
                  { label: 'Email', type: 'email', placeholder: 'email@empresa.com' },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>{f.label}</label>
                    <input type={f.type} placeholder={f.placeholder} style={{
                      width: '100%', background: '#1a1f3c',
                      border: '1px solid rgba(255,255,255,0.07)',
                      padding: '0.875rem 1rem', color: '#fff',
                      fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif', outline: 'none',
                    }}
                      onFocus={e => e.target.style.borderColor = 'rgba(232,105,42,0.4)'}
                      onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Assunto</label>
                  <select style={{
                    width: '100%', background: '#1a1f3c',
                    border: '1px solid rgba(255,255,255,0.07)',
                    padding: '0.875rem 1rem', color: 'rgba(255,255,255,0.6)',
                    fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif', outline: 'none', cursor: 'pointer',
                  }}>
                    {['Parceria Comercial', 'Investimento', 'Informações Gerais', 'Recursos Humanos', 'Imprensa & Media'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.35)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 6 }}>Mensagem</label>
                  <textarea rows={4} placeholder="Descreva a sua proposta..." style={{
                    width: '100%', background: '#1a1f3c',
                    border: '1px solid rgba(255,255,255,0.07)',
                    padding: '0.875rem 1rem', color: '#fff',
                    fontSize: '0.9rem', fontFamily: 'Outfit, sans-serif',
                    outline: 'none', resize: 'vertical',
                  }}
                    onFocus={e => e.target.style.borderColor = 'rgba(232,105,42,0.4)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.07)'}
                  />
                </div>
                <button type="submit" style={{
                  background: '#e8692a', border: 'none', cursor: 'pointer',
                  color: '#fff', fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.72rem', fontWeight: 800,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '0.9rem 2rem', marginTop: 4,
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f0813d')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#e8692a')}
                >Enviar Mensagem</button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; overflow-x: hidden; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        select option { background: #1a1f3c; }
        @media (max-width: 900px) {
          .nav-left, .nav-right { display: none !important; }
        }
      `}</style>
    </div>
  )
}
