import { CameraControls, Environment, Float, MeshReflectorMaterial, RenderTexture, Text, useFont } from "@react-three/drei";
import { SolarModel } from "./Solar";
import { useEffect, useRef } from "react";
import { Color } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

const bloomColor = new Color("#fff")
bloomColor.multiplyScalar(0.9)

export const Experience = () => {

  const controls: any = useRef()
  const meshFitCameraHome: any = useRef()

  const fitCamera = async () => {
    controls.current.fitToBox(meshFitCameraHome.current, true)
  }

  const intro = async () => {
    controls.current.dolly(-20)
    controls.current.smoothTime = 1.6
    controls.current.dolly(20, true)
    fitCamera()
  }

  useEffect(() => {
    intro()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', fitCamera)
    return () => window.removeEventListener('resize', fitCamera)
  }, [])

  return (
    <>
      <CameraControls ref={controls}
        minDistance={4}
        maxDistance={10}
        minPolarAngle={degToRad(45)}
        maxPolarAngle={degToRad(105)}
        minAzimuthAngle={degToRad(-45)}
        maxAzimuthAngle={degToRad(90)}
      />
      <perspectiveCamera />
      <mesh ref={meshFitCameraHome} position-z={0.5} visible={false}>
        <boxGeometry args={[7.5, 2, 2]} />
        <meshBasicMaterial color={'orange'} transparent opacity={0.5} />
      </mesh>
      {/* <mesh> */}
      <Text font="/fonts/Poppins/Poppins-Black.ttf"
        position-x={-2}
        position-y={-0.5}
        position-z={1}
        lineHeight={0.8} textAlign="center"
        rotation-y={degToRad(25)}
        anchorY={'bottom'}
      >
        CYCLE{"\n"}STARK
        <meshBasicMaterial color={bloomColor} toneMapped={false}>
          <RenderTexture attach={'map'} sourceFile={null}>
            <color attach={'background'} args={['#fff']} />
            <Environment preset="forest" />
            <Float floatIntensity={0.4} rotationIntensity={5}>
              <SolarModel
                scale={2.8}
                rotation-x={-degToRad(25)}
                rotation-y={degToRad(20)}
                position-y={-0.5}
              />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      <group rotation-y={degToRad(-10)} position-z={-degToRad(20)} position-x={2}>
        <SolarModel scale={0.6} />
      </group>
      <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 1000]} // Blur ground reflections (width, height), 0 skips blur
          mixBlur={1} // How much blur mixes with surface roughness (default = 1)
          mixStrength={10} // Strength of the reflections
          // mixContrast={1} // Contrast of the reflections
          resolution={2048} // Off-buffer resolution, lower=faster, higher=better quality, slower
          // mirror={0} // Mirror environment, 0 = texture colors, 1 = pick up env colors
          depthScale={1} // Scale the depth factor (0 = no depth, default = 0)
          minDepthThreshold={0.4} // Lower edge for the depthTexture interpolation (default = 0)
          maxDepthThreshold={1.4} // Upper edge for the depthTexture interpolation (default = 0)
          depthToBlurRatioBias={0.25} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
          distortion={1} // Amount of distortion based on the distortionMap texture
          mirror={2}
          // distortionMap={distortionTexture} // The red channel of this texture is used as the distortion map. Default is null
          /* Depending on the assigned value, one of the following channels is shown:
      0 = no debug
      1 = depth channel
      2 = base channel
      3 = distortion channel
      4 = lod channel (based on the roughness)
    */
          // reflectorOffset={0.2} // Offsets the virtual camera that projects the reflection. Useful when the reflective surface is some distance from the object's origin (default = 0)
          color={'#333'}
          opacity={0.5}
          metalness={0.5}
        />
      </mesh>
      <Environment preset="forest" />
      {/* </mesh> */}
    </>
  );
};

useFont.preload('fonts/Poppins/Poppins-Black.ttf')