'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    float e = sin(world.x * 0.35 + uTime * 0.8) * 0.32
      + sin(world.z * 0.55 + uTime * 0.6) * 0.22
      + sin((world.x + world.z) * 0.9 + uTime * 1.3) * 0.07
      + sin((world.x - world.z) * 1.7 + uTime * 1.9) * 0.03;
    float d = distance(world.xz, uPointer);
    e += exp(-d * d * 0.09) * sin(d * 2.2 - uTime * 4.0) * 0.32;
    world.y += e;
    vElevation = e;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const fragmentShader = /* glsl */ `
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vec3 deep = vec3(0.035, 0.17, 0.22);
    vec3 shallow = vec3(0.13, 0.62, 0.62);
    vec3 foam = vec3(0.93, 0.96, 0.92);
    vec3 color = mix(deep, shallow, smoothstep(-0.55, 0.55, vElevation));
    color = mix(color, foam, smoothstep(0.42, 0.78, vElevation) * 0.85);
    float edge = 1.0 - smoothstep(0.32, 0.5, distance(vUv, vec2(0.5)));
    gl_FragColor = vec4(color, edge);
  }
`

function Waves({ segments }: { segments: number }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const pointer = useRef(new THREE.Vector2(0, 0))
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPointer: { value: new THREE.Vector2(0, 0) } }), [])

  useFrame((state, delta) => {
    const mat = material.current
    if (!mat) return
    mat.uniforms.uTime.value += delta
    pointer.current.set(state.pointer.x * 9, -state.pointer.y * 5 + 1)
    mat.uniforms.uPointer.value.lerp(pointer.current, 0.06)
  })

  return (
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[34, 34, segments, segments]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

function WireOverlay({ segments }: { segments: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (mesh.current) mesh.current.position.y = 0.9 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08
  })
  return (
    <mesh ref={mesh} rotation-x={-Math.PI / 2} position-y={0.9}>
      <planeGeometry args={[34, 34, Math.round(segments / 4), Math.round(segments / 4)]} />
      <meshBasicMaterial color="#f2c9a8" wireframe transparent opacity={0.06} />
    </mesh>
  )
}

export default function OceanCanvas({ active }: { active: boolean }) {
  const segments = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 150
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.8, 7.5], fov: 45 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden="true"
    >
      <Waves segments={segments} />
      <WireOverlay segments={segments} />
    </Canvas>
  )
}
