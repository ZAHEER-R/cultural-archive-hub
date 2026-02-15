import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Earth() {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.15;
    if (pointsRef.current) pointsRef.current.rotation.y += delta * 0.15;
  });

  // Generate dots on sphere surface for continents effect
  const points = useMemo(() => {
    const pts: number[] = [];
    const count = 3000;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = 2.02 * Math.cos(theta) * Math.sin(phi);
      const y = 2.02 * Math.sin(theta) * Math.sin(phi);
      const z = 2.02 * Math.cos(phi);
      pts.push(x, y, z);
    }
    return new Float32Array(pts);
  }, []);

  // Golden connection lines
  const lines = useMemo(() => {
    const lineGeometries: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const cityCoords = [
      [28.6, 77.2], [41.0, 28.9], [41.9, 12.5], [35.0, 135.7],
      [-13.5, -71.9], [31.6, -7.9], [30.0, 31.2], [39.9, 116.4],
      [19.4, -99.1], [37.9, 23.7], [-33.8, 151.2], [48.8, 2.3],
      [51.5, -0.1], [40.7, -74.0], [-22.9, -43.1], [1.3, 103.8],
    ];
    const toVec = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta)
      );
    };
    for (let i = 0; i < cityCoords.length - 1; i += 2) {
      lineGeometries.push({
        start: toVec(cityCoords[i][0], cityCoords[i][1], 2.05),
        end: toVec(cityCoords[i + 1][0], cityCoords[i + 1][1], 2.05),
      });
    }
    return lineGeometries;
  }, []);

  return (
    <group>
      {/* Globe sphere */}
      <Sphere ref={meshRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          color="#1a2a3a"
          transparent
          opacity={0.85}
          wireframe={false}
        />
      </Sphere>

      {/* Wireframe overlay */}
      <Sphere args={[2.01, 32, 32]}>
        <meshBasicMaterial color="#c6a75e" wireframe transparent opacity={0.08} />
      </Sphere>

      {/* Dots on surface */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="#c6a75e" size={0.02} transparent opacity={0.6} sizeAttenuation />
      </points>

      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.3, 2.35, 64]} />
        <meshBasicMaterial color="#c6a75e" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pts = new Float32Array(600);
    for (let i = 0; i < 600; i++) {
      pts[i] = (Math.random() - 0.5) * 12;
    }
    return pts;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={200} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#c6a75e" size={0.03} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function GlobeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 3, 5]} intensity={0.8} color="#c6a75e" />
        <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#4a6fa5" />
        <Earth />
        <FloatingParticles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      </Canvas>
    </div>
  );
}
