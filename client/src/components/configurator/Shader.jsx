import * as THREE from "three";
import { extend, useFrame } from "@react-three/fiber";
import { useRef } from "react";

// Extend necessary classes to be used in JSX
extend({ PlaneGeometry: THREE.PlaneGeometry });

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float time;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;

    // Create a gradient effect
    vec3 colorA = vec3(0.0, 0.5, 0.5);
    vec3 colorB = vec3(0.7, 0.0, 0.7);
    vec3 gradient = mix(colorA, colorB, uv.y);

    // Add a waving animation
    float wave = sin(uv.y * 20.0 + time * 3.0) * 0.05;
    gradient.r += wave;

    gl_FragColor = vec4(gradient, 1.0);
  }
`;

function CustomBackgroundShader() {
  const meshRef = useRef();
  const uniforms = useRef({
    time: { value: 0.0 },
  });

  useFrame(({ clock }) => {
    uniforms.current.time.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[10, 10]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms.current}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default CustomBackgroundShader;
