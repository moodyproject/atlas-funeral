import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import * as THREE from 'three'

// ── Golden arc curve between two lat/lng points ──
function Arc({ from, to, color, speed }) {
  const ref = useRef()
  const curve = useMemo(() => {
    const start = latLngToVec3(from[0], from[1], 2.01)
    const end = latLngToVec3(to[0], to[1], 2.01)
    const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(2.6)
    return new THREE.QuadraticBezierCurve3(start, mid, end)
  }, [from, to])

  const geometry = useMemo(() => {
    const pts = curve.getPoints(48)
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [curve])

  // Animate dash offset
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.dashOffset -= delta * (speed || 0.3)
    }
  })

  return (
    <group>
      {/* Glow arc */}
      <line geometry={geometry}>
        <lineBasicMaterial color={color || '#c9a96e'} transparent opacity={0.12} />
      </line>
      {/* Dashed arc */}
      <line geometry={geometry}>
        <lineDashedMaterial
          ref={ref}
          color={color || '#c9a96e'}
          transparent
          opacity={0.7}
          dashSize={0.08}
          gapSize={0.06}
          linewidth={1}
        />
      </line>
    </group>
  )
}

// ── Pulsing city node ──
function CityNode({ lat, lng, size = 0.025, delay = 0 }) {
  const ref = useRef()
  const ringRef = useRef()
  const pos = useMemo(() => latLngToVec3(lat, lng, 2.02), [lat, lng])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + delay
    const pulse = 0.7 + Math.sin(t * 2) * 0.3
    if (ref.current) ref.current.scale.setScalar(pulse)
    if (ringRef.current) {
      const ringPulse = 1 + Math.sin(t * 1.5) * 0.5
      ringRef.current.scale.setScalar(ringPulse)
      ringRef.current.material.opacity = 0.4 - Math.sin(t * 1.5) * 0.3
    }
  })

  return (
    <group position={pos}>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[size * 3, 8, 8]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.15} />
      </mesh>
      {/* Core dot */}
      <mesh ref={ref}>
        <sphereGeometry args={[size, 8, 8]} />
        <meshBasicMaterial color="#e8d5a8" transparent opacity={1} />
      </mesh>
      {/* Pulse ring */}
      <mesh ref={ringRef} rotation={[0, 0, 0]}>
        <ringGeometry args={[size * 2, size * 3.5, 16]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ── Convert lat/lng to 3D position ──
function latLngToVec3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// ── Continent outlines (simplified polylines) ──
function ContinentOutlines() {
  const gold = '#c9a96e'

  // Simplified continent outlines as lat/lng arrays
  const continents = useMemo(() => ({
    northAmerica: [
      [60,-140],[55,-130],[60,-120],[55,-110],[48,-125],[45,-124],[40,-124],
      [35,-120],[32,-117],[28,-115],[24,-110],[20,-105],[18,-97],[20,-90],
      [25,-90],[30,-88],[30,-85],[27,-80],[25,-80],[30,-82],[32,-80],
      [35,-76],[38,-75],[40,-74],[42,-70],[43,-66],[45,-67],[47,-68],
      [47,-60],[50,-57],[52,-56],[55,-60],[58,-62],[60,-65],[58,-70],
      [55,-77],[55,-85],[58,-92],[60,-95],[63,-90],[65,-85],[70,-80],
      [72,-78],[70,-90],[72,-95],[70,-100],[68,-105],[70,-110],[72,-115],
      [70,-130],[68,-135],[65,-140],[63,-145],[60,-148],[57,-155],[60,-148],
      [63,-152],[65,-168],[60,-165],[55,-160],[55,-155],[58,-150],[60,-140],
    ],
    southAmerica: [
      [12,-72],[10,-75],[8,-77],[5,-77],[2,-80],[0,-80],[-3,-80],
      [-5,-81],[-7,-80],[-5,-75],[-8,-75],[-12,-77],[-15,-75],[-18,-70],
      [-20,-64],[-22,-60],[-23,-44],[-20,-40],[-15,-39],[-12,-38],
      [-8,-35],[-5,-35],[-2,-50],[0,-50],[5,-60],[8,-63],[10,-67],[12,-72],
    ],
    europe: [
      [36,-8],[38,-8],[40,-8],[43,-8],[44,-1],[46,0],[48,-4],[48,0],
      [50,-5],[52,-5],[55,-3],[58,-5],[60,5],[63,5],[65,12],[68,15],
      [70,20],[72,28],[70,30],[65,28],[60,25],[56,24],[55,20],[54,14],
      [55,10],[53,8],[52,5],[50,5],[48,5],[46,3],[44,5],[42,3],[40,0],
      [38,0],[37,-2],[36,-5],[36,-8],
    ],
    africa: [
      [35,-5],[37,10],[35,12],[32,13],[30,32],[25,35],[20,37],[15,42],
      [12,44],[10,42],[5,42],[0,42],[-5,40],[-10,40],[-15,35],
      [-20,35],[-25,33],[-28,32],[-30,30],[-34,26],[-34,18],
      [-30,17],[-25,15],[-20,12],[-15,12],[-10,14],[-5,12],
      [0,10],[5,5],[5,0],[5,-5],[10,-10],[15,-17],[20,-17],
      [25,-15],[30,-10],[33,-8],[35,-5],
    ],
    asia: [
      [40,28],[42,42],[38,48],[30,48],[25,55],[25,60],[20,65],
      [15,75],[10,78],[8,80],[5,100],[0,104],[-5,106],[-8,110],
      [0,115],[5,115],[10,120],[15,120],[22,114],[25,120],[28,122],
      [35,129],[38,130],[40,132],[42,132],[45,135],[48,140],[50,140],
      [52,140],[55,135],[58,140],[60,145],[62,150],[65,160],[68,170],
      [70,180],[72,170],[70,145],[68,140],[65,135],[60,130],[55,130],
      [50,120],[48,90],[50,80],[52,70],[50,55],[45,40],[42,35],[40,28],
    ],
    australia: [
      [-12,130],[-15,125],[-20,118],[-25,114],[-28,114],[-32,116],
      [-35,117],[-35,120],[-37,140],[-38,145],[-38,148],[-35,150],
      [-30,153],[-25,153],[-20,148],[-18,146],[-15,145],[-15,140],
      [-12,137],[-12,130],
    ],
  }), [])

  const lines = useMemo(() => {
    const result = []
    for (const [name, coords] of Object.entries(continents)) {
      const points = coords.map(([lat, lng]) => latLngToVec3(lat, lng, 2.015))
      const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.5)
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(coords.length * 4))
      result.push({ name, geo })
    }
    return result
  }, [continents])

  return (
    <>
      {lines.map(({ name, geo }) => (
        <group key={name}>
          {/* Glow layer */}
          <line geometry={geo}>
            <lineBasicMaterial color={gold} transparent opacity={0.15} linewidth={3} />
          </line>
          {/* Sharp layer */}
          <line geometry={geo}>
            <lineBasicMaterial color={gold} transparent opacity={0.55} />
          </line>
        </group>
      ))}
    </>
  )
}

// ── Atmosphere glow (two-layer) ──
function AtmosphereGlow() {
  const ref = useRef()

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.material.opacity = 0.06 + Math.sin(clock.getElapsedTime() * 0.5) * 0.02
    }
  })

  return (
    <>
      {/* Inner atmosphere */}
      <mesh ref={ref}>
        <sphereGeometry args={[2.12, 48, 48]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      {/* Mid haze */}
      <mesh>
        <sphereGeometry args={[2.25, 48, 48]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      {/* Outer haze */}
      <mesh>
        <sphereGeometry args={[2.45, 48, 48]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
    </>
  )
}

// ── Main globe ──
function Globe() {
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12
    }
  })

  // Grid lines — fewer, cleaner
  const latLines = useMemo(() => {
    const lines = []
    for (let lat = -60; lat <= 60; lat += 20) {
      const points = []
      const phi = (90 - lat) * (Math.PI / 180)
      for (let lng = 0; lng <= 360; lng += 2) {
        const theta = lng * (Math.PI / 180)
        points.push(new THREE.Vector3(
          2 * Math.sin(phi) * Math.cos(theta),
          2 * Math.cos(phi),
          2 * Math.sin(phi) * Math.sin(theta)
        ))
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(points))
    }
    return lines
  }, [])

  const lngLines = useMemo(() => {
    const lines = []
    for (let lng = 0; lng < 360; lng += 20) {
      const points = []
      const theta = lng * (Math.PI / 180)
      for (let lat = -90; lat <= 90; lat += 2) {
        const phi = (90 - lat) * (Math.PI / 180)
        points.push(new THREE.Vector3(
          2 * Math.sin(phi) * Math.cos(theta),
          2 * Math.cos(phi),
          2 * Math.sin(phi) * Math.sin(theta)
        ))
      }
      lines.push(new THREE.BufferGeometry().setFromPoints(points))
    }
    return lines
  }, [])

  // Major cities
  const cities = [
    [40.7, -74],    // NYC
    [34, -118.2],   // LA
    [41.9, -87.6],  // Chicago
    [29.8, -95.4],  // Houston
    [33.4, -112],   // Phoenix
    [47.6, -122.3], // Seattle
    [42.4, -71],    // Boston
    [25.8, -80.2],  // Miami
    [51.5, -0.1],   // London
    [48.9, 2.35],   // Paris
    [35.7, 139.7],  // Tokyo
    [22.3, 114.2],  // Hong Kong
    [-33.9, 151.2], // Sydney
    [55.8, 37.6],   // Moscow
    [19.4, -99.1],  // Mexico City
    [-23.5, -46.6], // São Paulo
    [28.6, 77.2],   // Delhi
    [39.9, 116.4],  // Beijing
    [1.35, 103.8],  // Singapore
    [30, 31.2],     // Cairo
  ]

  // Connection arcs between US cities
  const arcs = [
    { from: [40.7, -74], to: [51.5, -0.1], speed: 0.25 },
    { from: [34, -118.2], to: [35.7, 139.7], speed: 0.2 },
    { from: [40.7, -74], to: [48.9, 2.35], speed: 0.3 },
    { from: [25.8, -80.2], to: [-23.5, -46.6], speed: 0.22 },
    { from: [47.6, -122.3], to: [22.3, 114.2], speed: 0.18 },
    { from: [41.9, -87.6], to: [55.8, 37.6], speed: 0.28 },
    { from: [40.7, -74], to: [28.6, 77.2], speed: 0.15 },
    { from: [34, -118.2], to: [-33.9, 151.2], speed: 0.2 },
  ]

  return (
    <group ref={groupRef} rotation={[0.25, -0.5, 0.08]}>
      {/* Grid — barely there, just texture */}
      {latLines.map((geo, i) => (
        <line key={`lat-${i}`} geometry={geo}>
          <lineBasicMaterial color="#c9a96e" transparent opacity={0.04} />
        </line>
      ))}
      {lngLines.map((geo, i) => (
        <line key={`lng-${i}`} geometry={geo}>
          <lineBasicMaterial color="#c9a96e" transparent opacity={0.04} />
        </line>
      ))}

      {/* Continent outlines — the star */}
      <ContinentOutlines />

      {/* City nodes */}
      {cities.map(([lat, lng], i) => (
        <CityNode key={i} lat={lat} lng={lng} size={i < 6 ? 0.03 : 0.02} delay={i * 0.7} />
      ))}

      {/* Connection arcs */}
      {arcs.map((arc, i) => (
        <Arc key={i} from={arc.from} to={arc.to} speed={arc.speed} />
      ))}

      {/* Atmosphere */}
      <AtmosphereGlow />

      {/* Rim highlight ring — equator glow */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.0, 2.08, 64]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.06} side={THREE.DoubleSide} />
      </mesh>

      {/* Dark core for depth — less opaque so continents on back side faintly show */}
      <mesh>
        <sphereGeometry args={[1.99, 48, 48]} />
        <meshBasicMaterial color="#0f0f1a" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

export default function WireframeGlobe({ className }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Globe />
      </Canvas>
    </div>
  )
}
