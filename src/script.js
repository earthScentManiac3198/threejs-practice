import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

//Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load('/textures/golf-ball-nm.jpg')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5,64,64);
// Materials

const material = new THREE.MeshStandardMaterial({
    metalness : 0.7,
    roughness : 0.2,
    normalMap : normalTexture
})
material.color = new THREE.Color(0xa3a3a3)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Light1

const pointLight1 = new THREE.PointLight(0xffffff, 0.1)
pointLight1.position.x = 2
pointLight1.position.y = 3
pointLight1.position.z = 4
pointLight1.intensity= 0.2
scene.add(pointLight1)

// Light2

const pointLight2 = new THREE.PointLight(0xff00bd, 0.1)
pointLight2.position.set(-2.76,2.65,-1.44)
pointLight2.intensity= 1.81
scene.add(pointLight2)

//gui

// const light2 = gui.addFolder("Light 2")

// light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01)
// light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
// light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const light2color = {
//     color: 0xff0000
// }

// light2.addColor(light2color, 'color').onChange(() => {
//     pointLight2.color.set(light2color.color)
// })

// //pointlight helper
// const pointlightHelper2 = new THREE.PointLightHelper(pointLight2, 0.3)
// scene.add(pointlightHelper2)
scene.add(pointLight2)

// Light3

const pointLight3 = new THREE.PointLight(0x3c00ff, 0.1)
pointLight3.position.set(3.85,-3,-1.19)
pointLight3.intensity= 1.18
scene.add(pointLight3)

//gui
// const light3 = gui.addFolder("Light 3")

// light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
// light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
// light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// const light3color = {
//     color: 0xff0000
// }

// light3.addColor(light3color, 'color').onChange(() => {
//     pointLight3.color.set(light3color.color)
// })

// //pointlight helper
// const pointlightHelper3 = new THREE.PointLightHelper(pointLight3, 0.3)
// scene.add(pointlightHelper3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX =(event.clientX - windowHalfX)
    mouseY =(event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * 0.001
}

window.addEventListener('scroll',  updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)
    sphere.position.z += -.05 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()