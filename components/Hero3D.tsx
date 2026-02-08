'use client'

import React, { Suspense, useRef, useMemo, useState, useEffect, Component, ReactNode } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Error Boundary
class Hero3DErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

/* ── Cyber Octopus ── */
function CyberOctopus() {
  const groupRef = useRef<THREE.Group>(null)
  const tentaclesRef = useRef<THREE.Group>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    t.current += delta * 0.6
    if (tentaclesRef.current) {
      tentaclesRef.current.children.forEach((child, i) => {
        const off = i * 0.7
        child.rotation.z = Math.sin(t.current + off) * 0.25
        child.rotation.x = Math.sin(t.current * 0.4 + off) * 0.15
      })
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t.current * 0.12) * 0.08
      groupRef.current.position.y = -0.3 + Math.sin(t.current * 0.35) * 0.12
    }
  })

  const headMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0d2357', metalness: 0.85, roughness: 0.15,
    emissive: '#1a3a8a', emissiveIntensity: 0.9,
  }), [])
  const crownMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0d2357', metalness: 0.85, roughness: 0.15,
    emissive: '#2a5adf', emissiveIntensity: 0.7,
  }), [])
  const ledMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#00d4ff', emissive: '#00d4ff', emissiveIntensity: 1.8,
    transparent: true, opacity: 0.9,
  }), [])

  const tentacles = useMemo(() => {
    const colors = ['#00d4ff', '#4f46e5', '#00d4ff', '#8b5cf6', '#00d4ff', '#4f46e5', '#00d4ff', '#8b5cf6']
    return Array.from({ length: 8 }, (_, i) => ({
      mat: new THREE.MeshStandardMaterial({
        color: '#0d2357', metalness: 0.75, roughness: 0.25,
        emissive: colors[i], emissiveIntensity: 0.7,
      }),
      angle: (i / 8) * Math.PI * 2,
    }))
  }, [])

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1.15, 1.15, 1.15]}>
      <mesh material={headMat} position={[0, 1.2, 0]}>
        <sphereGeometry args={[1.0, 20, 16]} />
      </mesh>
      <mesh material={crownMat} position={[0, 1.95, 0]}>
        <sphereGeometry args={[0.55, 14, 10]} />
      </mesh>
      <mesh material={ledMat} position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.95, 0.03, 6, 24]} />
      </mesh>
      <mesh material={ledMat} position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[1.1, 1.1, 1.1]}>
        <torusGeometry args={[0.95, 0.03, 6, 24]} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.35, 1.4, 0.78]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[0.35, 1.4, 0.78]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={1.5} />
      </mesh>
      <mesh position={[-0.35, 1.4, 0.92]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.35, 1.4, 0.92]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
      {/* Tentacles + LED dots */}
      <group ref={tentaclesRef}>
        {tentacles.map((tn, i) => {
          const x = Math.cos(tn.angle) * 0.75
          const z = Math.sin(tn.angle) * 0.75
          return (
            <group key={i}>
              <mesh material={tn.mat} position={[x, 0.2, z]} rotation={[Math.PI / 2, tn.angle, 0]}>
                <cylinderGeometry args={[0.18, 0.09, 2.0, 6]} />
              </mesh>
              <mesh position={[x * 2.0, -0.4, z * 2.0]}>
                <sphereGeometry args={[0.06, 6, 6]} />
                <meshStandardMaterial
                  color={i % 2 === 0 ? '#00ffff' : '#8b5cf6'}
                  emissive={i % 2 === 0 ? '#00ffff' : '#8b5cf6'}
                  emissiveIntensity={2.0}
                />
              </mesh>
            </group>
          )
        })}
      </group>
    </group>
  )
}

/* ── MacBook ── */
function MacBook() {
  const ref = useRef<THREE.Group>(null)
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 512; c.height = 512
    const x = c.getContext('2d')!
    const g = x.createLinearGradient(0, 0, 512, 512)
    g.addColorStop(0, '#050a18'); g.addColorStop(1, '#0a1628')
    x.fillStyle = g; x.fillRect(0, 0, 512, 512)
    // Header
    x.fillStyle = 'rgba(0,212,255,0.15)'; x.fillRect(0, 0, 512, 50)
    x.fillStyle = '#00d4ff'; x.font = 'bold 18px sans-serif'; x.fillText('Web Site Tasarimi', 20, 32)
    // Code area
    x.fillStyle = 'rgba(0,212,255,0.05)'; x.fillRect(15, 65, 480, 160)
    x.strokeStyle = '#00d4ff50'; x.strokeRect(15, 65, 480, 160)
    x.fillStyle = '#4f46e5'; x.font = '13px monospace'
    x.fillText('const app = createNextApp({', 25, 95)
    x.fillStyle = '#00d4ff'; x.fillText('  design: "premium",', 25, 115)
    x.fillStyle = '#8b5cf6'; x.fillText('  performance: "blazing",', 25, 135)
    x.fillStyle = '#00d4ff'; x.fillText('  responsive: true,', 25, 155)
    x.fillStyle = '#4f46e5'; x.fillText('})', 25, 175)
    // Cards
    x.fillStyle = 'rgba(0,212,255,0.08)'; x.fillRect(15, 240, 230, 80); x.fillRect(260, 240, 230, 80)
    x.strokeStyle = '#00d4ff'; x.lineWidth = 1
    x.strokeRect(15, 240, 230, 80); x.strokeRect(260, 240, 230, 80)
    x.fillStyle = '#fff'; x.font = 'bold 14px sans-serif'
    x.fillText('React / Next.js', 30, 270); x.fillText('TailwindCSS', 275, 270)
    x.fillStyle = '#888'; x.font = '11px sans-serif'
    x.fillText('Modern web uygulamalari', 30, 295); x.fillText('Responsive tasarim', 275, 295)
    // CTA
    x.fillStyle = '#00d4ff'; x.fillRect(15, 350, 120, 32)
    x.fillStyle = '#000'; x.font = 'bold 13px sans-serif'; x.fillText('Teklif Al', 38, 371)
    x.fillStyle = '#fff'; x.font = 'bold 22px sans-serif'; x.fillText('99+', 200, 370)
    x.fillStyle = '#888'; x.font = '11px sans-serif'; x.fillText('Tamamlanan Proje', 200, 390)
    const t = new THREE.CanvasTexture(c); t.needsUpdate = true; return t
  }, [])

  const tFloat = useRef(Math.random() * Math.PI * 2)
  useFrame((_, d) => {
    tFloat.current += d * 0.5
    if (ref.current) {
      // Hafif yukarı aşağı salınım, dönme yok — ekran bize bakıyor
      ref.current.position.y = 0.1 + Math.sin(tFloat.current) * 0.06
    }
  })

  return (
    <group ref={ref} position={[2.2, 0.1, 1.5]} rotation={[0, -0.3, 0.05]}>
      {/* Laptop base */}
      <mesh>
        <boxGeometry args={[1.3, 0.08, 0.85]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.9} roughness={0.1} emissive="#0a1628" emissiveIntensity={0.4} />
      </mesh>
      {/* Screen — bize dönük */}
      <mesh position={[0, 0.4, 0.2]}>
        <boxGeometry args={[1.2, 0.72, 0.03]} />
        <meshStandardMaterial map={tex} emissive="#001122" emissiveIntensity={0.8} />
      </mesh>
      {/* Ekran glow */}
      <mesh position={[0, 0.4, 0.18]}>
        <boxGeometry args={[1.25, 0.77, 0.01]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.15} transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

/* ── Phone ── */
function Phone() {
  const ref = useRef<THREE.Group>(null)
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256; c.height = 512
    const x = c.getContext('2d')!
    x.fillStyle = '#050a18'; x.fillRect(0, 0, 256, 512)
    // Header
    x.fillStyle = 'rgba(0,212,255,0.15)'; x.fillRect(0, 0, 256, 35)
    x.fillStyle = '#00d4ff'; x.font = 'bold 12px sans-serif'; x.fillText('YB Digital App', 20, 24)
    // Cards
    x.fillStyle = 'rgba(0,212,255,0.1)'; x.fillRect(12, 48, 232, 65)
    x.strokeStyle = '#00d4ff'; x.lineWidth = 1; x.strokeRect(12, 48, 232, 65)
    x.fillStyle = '#fff'; x.font = 'bold 14px sans-serif'; x.fillText('Mobil Uygulama', 22, 72)
    x.fillStyle = '#888'; x.font = '11px sans-serif'; x.fillText('iOS & Android', 22, 95)
    // Dashboard
    x.fillStyle = 'rgba(79,70,229,0.12)'; x.fillRect(12, 125, 232, 65)
    x.strokeStyle = '#4f46e5'; x.strokeRect(12, 125, 232, 65)
    x.fillStyle = '#fff'; x.font = 'bold 14px sans-serif'; x.fillText('Dashboard', 22, 150)
    x.fillStyle = '#4f46e5'; x.font = 'bold 18px sans-serif'; x.fillText('42%', 22, 178)
    // Chart bars
    const barColors = ['#00d4ff', '#4f46e5', '#8b5cf6', '#00d4ff', '#4f46e5']
    const barH = [50, 70, 38, 80, 55]
    barColors.forEach((color, i) => {
      x.fillStyle = color + '80'; x.fillRect(20 + i * 45, 280 - barH[i], 28, barH[i])
    })
    x.fillStyle = '#888'; x.font = '10px sans-serif'; x.fillText('Haftalik Analiz', 20, 300)
    const t = new THREE.CanvasTexture(c); t.needsUpdate = true; return t
  }, [])

  const tFloat = useRef(Math.random() * Math.PI * 2)
  useFrame((_, d) => {
    tFloat.current += d * 0.5
    if (ref.current) {
      // Hafif yukarı aşağı salınım, dönme yok — ekran bize bakıyor
      ref.current.position.y = 0.1 + Math.sin(tFloat.current + 1.5) * 0.06
    }
  })

  return (
    <group ref={ref} position={[-2.2, 0.1, 1.5]} rotation={[0, 0.3, -0.05]}>
      {/* Phone body */}
      <mesh>
        <boxGeometry args={[0.38, 0.7, 0.04]} />
        <meshStandardMaterial color="#0a0a1a" metalness={0.9} roughness={0.1} emissive="#0a1628" emissiveIntensity={0.4} />
      </mesh>
      {/* Screen — bize dönük */}
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[0.35, 0.65]} />
        <meshStandardMaterial map={tex} emissive="#001122" emissiveIntensity={0.8} />
      </mesh>
      {/* Ekran glow */}
      <mesh position={[0, 0, -0.025]}>
        <boxGeometry args={[0.42, 0.74, 0.01]} />
        <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={0.15} transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

/* ── Hologram Screen ── */
function HologramScreen({ position, rotation, label, color = '#00d4ff' }: {
  position: [number, number, number]
  rotation: [number, number, number]
  label: string
  color?: string
}) {
  const ref = useRef<THREE.Mesh>(null)
  const tRef = useRef(Math.random() * Math.PI * 2)

  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256; c.height = 192
    const x = c.getContext('2d')!
    x.fillStyle = 'rgba(0,20,40,0.7)'; x.fillRect(0, 0, 256, 192)
    x.strokeStyle = color; x.lineWidth = 2; x.strokeRect(4, 4, 248, 184)
    // Corner brackets
    x.fillStyle = color
    x.fillRect(4, 4, 20, 3); x.fillRect(4, 4, 3, 20)
    x.fillRect(232, 4, 20, 3); x.fillRect(249, 4, 3, 20)
    x.fillRect(4, 181, 20, 3); x.fillRect(4, 168, 3, 20)
    x.fillRect(232, 181, 20, 3); x.fillRect(249, 168, 3, 20)
    // Label
    x.fillStyle = color; x.font = 'bold 22px sans-serif'
    x.textAlign = 'center'; x.fillText(label, 128, 105)
    // Scanlines
    x.fillStyle = color + '10'
    for (let i = 0; i < 192; i += 4) x.fillRect(0, i, 256, 1)
    // Status dot
    x.fillStyle = '#00ff88'; x.beginPath(); x.arc(230, 20, 5, 0, Math.PI * 2); x.fill()
    const t = new THREE.CanvasTexture(c); t.needsUpdate = true; return t
  }, [label, color])

  useFrame((_, d) => {
    tRef.current += d * 0.6
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(tRef.current) * 0.06
    }
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[1.2, 0.9]} />
      <meshStandardMaterial map={tex} transparent opacity={0.75} emissive={color} emissiveIntensity={0.3} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ── Camera Rig ── */
function CameraRig({ mx, my }: { mx: number; my: number }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mx * 1.2 - camera.position.x) * 0.03
    camera.position.y += (1.2 + my * 0.6 - camera.position.y) * 0.03
    camera.lookAt(0, 0.8, 0)
  })
  return null
}

/* ── Scene ── */
function Scene({ mx, my }: { mx: number; my: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += (mx * 0.3 - ref.current.rotation.y) * 0.03
      ref.current.rotation.x += (my * 0.15 - ref.current.rotation.x) * 0.03
    }
  })

  return (
    <group ref={ref}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 3, 4]} intensity={1.5} color="#00d4ff" distance={12} />
      <pointLight position={[-3, 2, -3]} intensity={0.6} color="#8b5cf6" distance={10} />
      <pointLight position={[0, 1.5, 5]} intensity={0.8} color="#ffffff" distance={14} />

      <Suspense fallback={null}>
        <CyberOctopus />
        <MacBook />
        <Phone />

        <HologramScreen position={[-2.8, 2.2, -1.5]} rotation={[0, 0.5, 0]} label="n8n Otomasyon" color="#00d4ff" />
        <HologramScreen position={[2.8, 2.2, -1.5]} rotation={[0, -0.5, 0]} label="Web Site" color="#4f46e5" />
        <HologramScreen position={[-1.5, 3.0, -2.2]} rotation={[0.1, 0.25, 0]} label="Mobil Uygulama" color="#8b5cf6" />
        <HologramScreen position={[1.5, 3.0, -2.2]} rotation={[0.1, -0.25, 0]} label="UI/UX Tasarim" color="#00d4ff" />
        <HologramScreen position={[0, 3.5, -2.8]} rotation={[0.15, 0, 0]} label="Cloud & DevOps" color="#4f46e5" />

        {/* Ground glow */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]}>
          <circleGeometry args={[4, 24]} />
          <meshStandardMaterial color="#020818" emissive="#00d4ff" emissiveIntensity={0.1} transparent opacity={0.4} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.18, 0]}>
          <ringGeometry args={[3.5, 4.0, 48]} />
          <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={0.5} transparent opacity={0.3} />
        </mesh>
      </Suspense>

      <CameraRig mx={mx} my={my} />
    </group>
  )
}

/* ── Main Export ── */
export default function Hero3D() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let raf: number
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setMouse({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        })
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  if (!ready) return null

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  return (
    <Hero3DErrorBoundary>
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 1.5, 5], fov: 55 }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            powerPreference: 'high-performance',
            stencil: false,
            depth: true,
          }}
          dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, isMobile ? 1 : 1.5)}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene mx={mouse.x} my={mouse.y} />
        </Canvas>
      </div>
    </Hero3DErrorBoundary>
  )
}
