import { Suspense, useEffect, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, PerspectiveCamera } from "@react-three/drei"
import gsap from "gsap"
import type { Group } from "three"

// ─── Lower-page 3D scene ──────────────────────────────────────────────────────
// Renders a stylized race car behind the "Story" section that rotates and
// pushes back as the user scrolls. Lazy-loaded from HomePage.

function RaceCarForm() {
  const group = useRef<Group>(null)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y +=
      (state.pointer.x * 0.08 - group.current.rotation.y) * 0.025
    group.current.rotation.x +=
      (-state.pointer.y * 0.025 - group.current.rotation.x) * 0.025
  })

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={group} scale={1.05} position={[0, -0.2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.8, 0.22, 1.15]} />
          <meshStandardMaterial
            color="#131313"
            metalness={0.8}
            roughness={0.24}
          />
        </mesh>
        <mesh position={[0.05, 0.25, 0]} castShadow>
          <boxGeometry args={[1.2, 0.35, 0.78]} />
          <meshStandardMaterial
            color="#242424"
            metalness={0.72}
            roughness={0.28}
          />
        </mesh>
        <mesh position={[0.15, 0.52, 0]} rotation={[0, 0, -0.05]}>
          <boxGeometry args={[0.62, 0.12, 0.58]} />
          <meshStandardMaterial
            color="#b20f08"
            metalness={0.5}
            roughness={0.24}
          />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.25, 0.5, 0.18]} />
          <meshStandardMaterial
            color="#d9a441"
            metalness={0.7}
            roughness={0.24}
            emissive="#4c2100"
            emissiveIntensity={0.25}
          />
        </mesh>
        {[-1.05, 1.05].map((x) => (
          <group
            key={x}
            position={[x, -0.12, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <mesh castShadow>
              <cylinderGeometry args={[0.38, 0.38, 0.2, 32]} />
              <meshStandardMaterial
                color="#080808"
                metalness={0.35}
                roughness={0.62}
              />
            </mesh>
          </group>
        ))}
        <mesh position={[-0.05, 0.36, 0]}>
          <boxGeometry args={[2.1, 0.08, 0.08]} />
          <meshStandardMaterial
            color="#d9a441"
            metalness={0.8}
            roughness={0.22}
            emissive="#5a2400"
            emissiveIntensity={0.35}
          />
        </mesh>
      </group>
    </Float>
  )
}

function ScrollRig({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<Group>(null)

  useEffect(() => {
    if (reducedMotion) return
    const element = document.getElementById("story")
    if (!element) return

    const update = () => {
      const bounds = element.getBoundingClientRect()
      const progress = Math.min(
        1,
        Math.max(
          0,
          (window.innerHeight - bounds.top) /
            (window.innerHeight + bounds.height),
        ),
      )
      if (rig.current) {
        gsap.to(rig.current.rotation, {
          y: progress * Math.PI * 1.7,
          x: progress * -0.16,
          duration: 0.5,
          overwrite: true,
          ease: "power2.out",
        })
        gsap.to(rig.current.position, {
          z: progress * 0.7,
          y: progress * 0.25,
          duration: 0.5,
          overwrite: true,
          ease: "power2.out",
        })
      }
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [reducedMotion])

  return (
    <group ref={rig}>
      <RaceCarForm />
    </group>
  )
}

export default function LowerPage3DScene() {
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  return (
    <div className="lower-3d-scene" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0.35, 6.8]} fov={42} />
        <ambientLight intensity={0.7} />
        <spotLight
          position={[3, 4, 4]}
          intensity={8}
          angle={0.35}
          penumbra={1}
          color="#fff2d0"
        />
        <pointLight position={[-3, 0, 2]} intensity={4} color="#ff1801" />
        <Suspense fallback={null}>
          <ScrollRig reducedMotion={reducedMotion} />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  )
}
