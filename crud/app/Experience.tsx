import { useFrame, useThree } from '@react-three/fiber'
import { DoubleSide, Mesh } from 'three'
import { useRef } from 'react'

import * as ribbonShader from './ribbonShader'

export default function Experience() {
    const ribbon = useRef<Mesh>(null!)

    useFrame((state, delta) => {
        ribbonShader.uniforms.uTime.value = state.clock.elapsedTime
        ribbon.current.rotation.y += delta * 0.2
    })
    const { size } = useThree()

    ribbonShader.uniforms.uResolution.value.x = size.width
    ribbonShader.uniforms.uResolution.value.y = size.height


    return <>
        <mesh ref={ribbon} rotation={[Math.PI * 0.04, Math.PI * 0.4, Math.PI * 0.2]}>
            <cylinderGeometry args={[0.8, 0.8, 0.14, 256, 1, true]} />
            <shaderMaterial
                {...ribbonShader}
                side={DoubleSide}
            />
        </mesh>
    </>
}
