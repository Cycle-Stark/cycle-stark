import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";

const MyCanvas = () => {
    return (
        <>
            <Canvas style={{
                position: "fixed",
                zIndex: 1,
                top: 0,
                bottom: 0,
                pointerEvents: 'stroke'
            }} shadows camera={{ position: [0, 0, 8], fov: 42 }}>
                <color attach="background" args={["#131419"]} />
                <fog attach={'fog'} args={['#171720', 10, 30]} />
                <Suspense>
                    <Experience />
                </Suspense>
                <EffectComposer>
                    <Bloom mipmapBlur intensity={1.3} />
                </EffectComposer>
            </Canvas>
        </>
    )
}

export default MyCanvas