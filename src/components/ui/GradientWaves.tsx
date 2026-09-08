import { Renderer, Program, Mesh, Triangle } from 'ogl'
import { useEffect, useRef } from 'react'
import styles from './GradientWaves.module.css'

export type GradientWavesDetail = 'low' | 'medium' | 'high'

type GradientWavesProps = {
  horizonColor?: string
  waveColor?: string
  crestColor?: string
  speed?: number
  amplitude?: number
  waveScale?: number
  waveRatio?: number
  swell?: number
  turbulence?: number
  tilt?: number
  zoom?: number
  height?: number
  fogDepth?: number
  detail?: GradientWavesDetail
  brightness?: number
  opacity?: number
  mouseInteraction?: boolean
  parallaxStrength?: number
  grain?: boolean
  grainIntensity?: number
  className?: string
}

function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return [1, 1, 1]
  return [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ]
}

function detailToSteps(detail: GradientWavesDetail): number {
  if (detail === 'low') return 22
  if (detail === 'high') return 48
  return 28
}

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragment = `#version 300 es
precision mediump float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaveScale;
uniform float uWaveRatio;
uniform float uSwell;
uniform float uTurbulence;
uniform float uTilt;
uniform float uZoom;
uniform float uHeight;
uniform float uFogDepth;
uniform float uSteps;
uniform float uBrightness;
uniform float uOpacity;
uniform float uGrain;
uniform float uGrainIntensity;
uniform vec2 uMouse;
uniform float uParallax;
uniform bool uEnableMouse;
uniform vec3 uHorizonColor;
uniform vec3 uWaveColor;
uniform vec3 uCrestColor;
out vec4 fragColor;

const float MAX_DIST = 20000.0;

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float plasma(vec3 r, vec2 freq, vec4 tc) {
  float mx = r.x + tc.x;
  mx += uSwell * sin((r.y + mx) / 20.0 + tc.y);
  float my = r.y - tc.z;
  my += uTurbulence * cos(r.x / 23.0 + tc.w);
  return r.z - (sin(mx * freq.x) * uAmplitude + sin(my * freq.y) * uAmplitude + uHeight);
}

float raymarch(vec3 pos, vec3 dir, vec2 freq, vec4 tc) {
  float dist = 0.0;
  for (int i = 0; i < 32; i++) {
    if (float(i) >= uSteps) break;
    float dscene = plasma(pos + dist * dir, freq, tc);
    if (abs(dscene) < 0.18) break;
    dist += 1.15 * dscene;
    if (!(abs(dist) < MAX_DIST)) return MAX_DIST;
  }
  return dist;
}

void main() {
  float T = iTime * uSpeed;
  vec2 freq = vec2(uWaveScale / 7.0, (uWaveScale * uWaveRatio) / 3.0);
  vec4 tc = vec4(T / 0.130, T / 0.810, T / 0.200, T / 0.710);
  float c, s;
  float vfov = (3.14159 / 2.3) / max(uZoom, 0.05);
  vec3 cam = vec3(0.0, 0.0, 30.0);
  vec2 uv = (gl_FragCoord.xy / iResolution.xy) - 0.5;
  uv.x *= iResolution.x / iResolution.y;
  uv.y *= -1.0;

  vec3 dir = vec3(0.0, 0.0, -1.0);
  float ulen = length(uv);
  float xrot = vfov * ulen;
  c = cos(xrot); s = sin(xrot);
  dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  vec2 nuv = ulen > 1e-5 ? uv / ulen : vec2(1.0, 0.0);
  c = nuv.x; s = nuv.y;
  dir = mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0) * dir;
  c = cos(uTilt); s = sin(uTilt);
  dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;

  if (uEnableMouse) {
    float yaw = (uMouse.x - 0.5) * uParallax * 0.4;
    float pitch = (uMouse.y - 0.5) * uParallax * 0.4;
    c = cos(yaw); s = sin(yaw);
    dir = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c) * dir;
    c = cos(pitch); s = sin(pitch);
    dir = mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c) * dir;
  }

  float dist = raymarch(cam, dir, freq, tc);
  vec3 pos = cam + dist * dir;

  float t = clamp(uFogDepth / max(dist, 0.001), 0.0, 1.0);
  float ridge = smoothstep(0.22, 0.8, abs(pos.z * 0.1));
  vec3 body = mix(uHorizonColor, uWaveColor, 0.72);
  vec3 col = mix(body, uCrestColor, pow(ridge, 1.7) * 0.38);
  col = mix(uHorizonColor, col, t);
  col *= uBrightness;
  col = clamp(col, 0.0, 1.0);

  float alpha = clamp(t * mix(0.22, 0.58, ridge), 0.0, 1.0) * uOpacity;
  if (uGrain > 0.5) {
    float g = hash21(gl_FragCoord.xy + mod(iTime, 64.0) * 11.0);
    alpha += (g - 0.5) * uGrainIntensity;
  }
  alpha = clamp(alpha, 0.0, 1.0);
  fragColor = vec4(col * alpha, alpha);
}
`

export function GradientWaves({
  horizonColor = '#f7f7f5',
  waveColor = '#c40000',
  crestColor = '#141414',
  speed = 0.4,
  amplitude = 2.5,
  waveScale = 0.6,
  waveRatio = 0.9,
  swell = 35,
  turbulence = 20,
  tilt = 1.11,
  zoom = 1,
  height = 5.5,
  fogDepth = 15,
  detail = 'medium',
  brightness = 1,
  opacity = 1,
  mouseInteraction = true,
  parallaxStrength = 0.5,
  grain = false,
  grainIntensity = 0.05,
  className = '',
}: GradientWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const enableMouseRef = useRef(mouseInteraction)
  const uniformsRef = useRef({
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    detail,
    brightness,
    opacity,
    grain,
    grainIntensity,
    parallaxStrength,
    mouseInteraction,
  })

  uniformsRef.current = {
    horizonColor,
    waveColor,
    crestColor,
    speed,
    amplitude,
    waveScale,
    waveRatio,
    swell,
    turbulence,
    tilt,
    zoom,
    height,
    fogDepth,
    detail,
    brightness,
    opacity,
    grain,
    grainIntensity,
    parallaxStrength,
    mouseInteraction,
  }
  enableMouseRef.current = mouseInteraction

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let renderer: Renderer
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        premultipliedAlpha: true,
        antialias: false,
        dpr: 1,
      })
    } catch {
      return
    }

    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    const canvas = gl.canvas as HTMLCanvasElement
    container.appendChild(canvas)

    const geometry = new Triangle(gl)
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaveScale: { value: waveScale },
        uWaveRatio: { value: waveRatio },
        uSwell: { value: swell },
        uTurbulence: { value: turbulence },
        uTilt: { value: tilt },
        uZoom: { value: zoom },
        uHeight: { value: height },
        uFogDepth: { value: fogDepth },
        uSteps: { value: detailToSteps(detail) },
        uBrightness: { value: brightness },
        uOpacity: { value: opacity },
        uGrain: { value: grain ? 1 : 0 },
        uGrainIntensity: { value: grainIntensity },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uParallax: { value: parallaxStrength },
        uEnableMouse: { value: mouseInteraction },
        uHorizonColor: { value: new Float32Array(hexToRgb(horizonColor)) },
        uWaveColor: { value: new Float32Array(hexToRgb(waveColor)) },
        uCrestColor: { value: new Float32Array(hexToRgb(crestColor)) },
      },
    })

    const mesh = new Mesh(gl, { geometry, program })

    const applyUniforms = () => {
      const next = uniformsRef.current
      const u = program.uniforms as Record<
        string,
        { value: number | boolean | Float32Array }
      >
      u.uSpeed.value = next.speed
      u.uAmplitude.value = next.amplitude
      u.uWaveScale.value = next.waveScale
      u.uWaveRatio.value = next.waveRatio
      u.uSwell.value = next.swell
      u.uTurbulence.value = next.turbulence
      u.uTilt.value = next.tilt
      u.uZoom.value = next.zoom
      u.uHeight.value = next.height
      u.uFogDepth.value = next.fogDepth
      u.uSteps.value = detailToSteps(next.detail)
      u.uBrightness.value = next.brightness
      u.uOpacity.value = next.opacity
      u.uGrain.value = next.grain ? 1 : 0
      u.uGrainIntensity.value = next.grainIntensity
      u.uParallax.value = next.parallaxStrength
      u.uEnableMouse.value = next.mouseInteraction
      const h = hexToRgb(next.horizonColor)
      const w = hexToRgb(next.waveColor)
      const c = hexToRgb(next.crestColor)
      const hc = u.uHorizonColor.value as Float32Array
      const wc = u.uWaveColor.value as Float32Array
      const cc = u.uCrestColor.value as Float32Array
      hc[0] = h[0]
      hc[1] = h[1]
      hc[2] = h[2]
      wc[0] = w[0]
      wc[1] = w[1]
      wc[2] = w[2]
      cc[0] = c[0]
      cc[1] = c[1]
      cc[2] = c[2]
    }

    const setSize = () => {
      const rect = container.getBoundingClientRect()
      const scale = 0.7
      const w = Math.max(1, Math.floor(rect.width * scale))
      const h = Math.max(1, Math.floor(rect.height * scale))
      renderer.setSize(w, h)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      const res = program.uniforms.iResolution.value as Float32Array
      res[0] = gl.drawingBufferWidth
      res[1] = gl.drawingBufferHeight
    }

    const ro = new ResizeObserver(setSize)
    ro.observe(container)
    setSize()

    const currentMouse: [number, number] = [0.5, 0.5]
    const targetMouse: [number, number] = [0.5, 0.5]

    const onPointerMove = (event: PointerEvent) => {
      if (!enableMouseRef.current) return
      const rect = container.getBoundingClientRect()
      targetMouse[0] = (event.clientX - rect.left) / rect.width
      targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height
    }
    const onPointerLeave = () => {
      targetMouse[0] = 0.5
      targetMouse[1] = 0.5
    }
    if (mouseInteraction) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let last = 0
    let isVisible = true
    let isPageVisible = !document.hidden
    const t0 = performance.now()
    applyUniforms()

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      if (t - last < 33) return
      last = t
      applyUniforms()
      program.uniforms.iTime.value = (t - t0) * 0.001
      if (enableMouseRef.current) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0])
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1])
        const mouse = program.uniforms.uMouse.value as Float32Array
        mouse[0] = currentMouse[0]
        mouse[1] = currentMouse[1]
      }
      renderer.render({ scene: mesh })
    }

    const tryStart = () => {
      if (reduce || !isVisible || !isPageVisible || raf !== 0) return
      raf = requestAnimationFrame(loop)
    }
    const tryStop = () => {
      if (raf === 0) return
      cancelAnimationFrame(raf)
      raf = 0
    }

    if (reduce) {
      applyUniforms()
      renderer.render({ scene: mesh })
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        isVisible ? tryStart() : tryStop()
      },
      { threshold: 0 },
    )
    io.observe(container)

    const onVisibility = () => {
      isPageVisible = !document.hidden
      isPageVisible ? tryStart() : tryStop()
    }
    document.addEventListener('visibilitychange', onVisibility)
    tryStart()

    return () => {
      tryStop()
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      if (canvas.parentElement === container) container.removeChild(canvas)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`${styles.root} ${className}`.trim()}
      aria-hidden="true"
    />
  )
}
