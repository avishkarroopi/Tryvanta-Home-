import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { SceneMode, ColorTheme, WebGLSettings } from '../types/index.ts';

// Pre-allocated math helpers for zero GC in render loop
const _vec3 = new THREE.Vector3();
const _targetCameraPos = new THREE.Vector3();
const _mouse3D = new THREE.Vector3();
const _colorA = new THREE.Color();
const _colorB = new THREE.Color();

// Tryvanta Neon & Ambient Themes
const THEME_PALETTES: Record<ColorTheme, { p1: number; p2: number; light: number }> = {
  obsidian: { p1: 0xff3b81, p2: 0x06b6d4, light: 0xff4081 }, // Exact Tryvanta Magenta + Cyan
  prismatic: { p1: 0xec4899, p2: 0xf59e0b, light: 0x8b5cf6 }, // Magenta + Amber
  aurora: { p1: 0x06b6d4, p2: 0x10b981, light: 0x38bdf8 },   // Cyan + Emerald
  amethyst: { p1: 0xd946ef, p2: 0x6366f1, light: 0xa855f7 }, // Neon Violet + Indigo
};

export class LivingScene {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private clock: THREE.Clock;
  private animFrameId: number | null = null;
  private isDestroyed: boolean = false;

  // Visual Layers
  private particleField!: THREE.Points;
  private particleMaterial!: THREE.ShaderMaterial;
  private ribbonLines: THREE.Line[] = [];
  private ribbonSplines: { points: THREE.Vector3[]; line: THREE.Line; speed: number; phase: number }[] = [];
  private heroGroup!: THREE.Group;
  private contactShadow!: THREE.Mesh;

  // Sub-models for different modes
  private fluidMesh!: THREE.Group;
  private latticeMesh!: THREE.Group;
  private silkMesh!: THREE.Group;
  private monolithMesh!: THREE.Group;

  // Lights
  private mouseLight!: THREE.PointLight;
  private keyLight!: THREE.DirectionalLight;
  private fillLight!: THREE.HemisphereLight;
  private accentLight!: THREE.PointLight;

  // Settings & Physics State
  public settings: WebGLSettings;
  private mouse = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    clickTime: -10.0,
    isDown: false,
  };

  constructor(container: HTMLElement, initialSettings: WebGLSettings) {
    this.container = container;
    this.settings = initialSettings;
    this.clock = new THREE.Clock();

    this.initRenderer();
    this.initScene();
    this.initLighting();
    this.initParticles();
    this.initEnergyRibbons();
    this.initHeroSubjects();
    this.initContactShadow();
    this.bindEvents();
    this.updateThemeColors();
    this.setMode(this.settings.mode);

    this.renderer.compile(this.scene, this.camera);
    this.startLoop();
  }

  private initRenderer() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    const isHeadless =
      typeof navigator !== 'undefined' &&
      (navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent));

    this.renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
      stencil: false,
      depth: true,
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.shadowMap.enabled = !isHeadless;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);
  }

  private initScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x06080d, 0.035);

    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 8.0);

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();
  }

  private initLighting() {
    // Warm key light
    this.keyLight = new THREE.DirectionalLight(0xfff5ea, 2.0);
    this.keyLight.position.set(5, 8, 5);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.bias = -0.0005;
    this.keyLight.shadow.normalBias = 0.02;
    this.scene.add(this.keyLight);

    // Cool fill light with cyan tint
    this.fillLight = new THREE.HemisphereLight(0x06b6d4, 0x07090e, 1.2);
    this.scene.add(this.fillLight);

    // Ambient Tryvanta magenta accent light
    this.accentLight = new THREE.PointLight(0xff2d78, 3.5, 15, 1.5);
    this.accentLight.position.set(-4, -2, 2);
    this.scene.add(this.accentLight);

    // Interactive mouse point light
    this.mouseLight = new THREE.PointLight(0xff4081, 4.5, 14, 1.6);
    this.mouseLight.position.set(0, 0, 3.5);
    this.scene.add(this.mouseLight);
  }

  private initParticles() {
    const count = 12000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randomness = new Float32Array(count * 3);

    const radius = 6.8;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = Math.pow(Math.random(), 0.65) * radius;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = (r * Math.sin(phi) * Math.sin(theta)) * 0.75;
      const z = (r * Math.cos(phi)) * 0.85;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      scales[i] = 0.7 + Math.random() * 1.9;
      randomness[i3] = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aOriginal', new THREE.BufferAttribute(originalPositions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randomness, 3));

    // Custom WebGL Shader with fluid curl dynamics and Tryvanta magenta/cyan energy blend
    this.particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseVelocity: { value: new THREE.Vector2(0, 0) },
        uClickTime: { value: -10 },
        uTurbulence: { value: this.settings.turbulence },
        uMouseForce: { value: this.settings.mouseForce },
        uColor1: { value: new THREE.Color(0xff3b81) },
        uColor2: { value: new THREE.Color(0x06b6d4) },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform vec2 uMouseVelocity;
        uniform float uClickTime;
        uniform float uTurbulence;
        uniform float uMouseForce;
        uniform vec3 uColor1;
        uniform vec3 uColor2;

        attribute vec3 aOriginal;
        attribute float aScale;
        attribute vec3 aRandom;

        varying vec3 vColor;
        varying float vAlpha;

        vec3 curlNoise(vec3 p) {
          float t = uTime * 0.28;
          float x = sin(p.y * 1.4 + t) * cos(p.z * 1.1 + t);
          float y = sin(p.z * 1.4 + t) * cos(p.x * 1.1 + t);
          float z = sin(p.x * 1.4 + t) * cos(p.y * 1.1 + t);
          return vec3(x, y, z);
        }

        void main() {
          vec3 pos = aOriginal;
          
          vec3 noise = curlNoise(pos * 0.42);
          pos += noise * (0.38 * uTurbulence);

          vec3 mouseWorld = vec3(uMouse.x * 5.2, uMouse.y * 3.8, 0.0);
          float dist = distance(pos.xy, mouseWorld.xy);
          float mouseRadius = 2.6;

          if (dist < mouseRadius) {
            float influence = 1.0 - smoothstep(0.0, mouseRadius, dist);
            vec2 dir = normalize(pos.xy - mouseWorld.xy + 0.0001);
            pos.xy += dir * influence * uMouseForce * 0.9;
            pos.z += sin(dist * 4.5 - uTime * 3.5) * influence * 0.6;
            pos.x += -dir.y * influence * length(uMouseVelocity) * 2.2;
            pos.y += dir.x * influence * length(uMouseVelocity) * 2.2;
          }

          float timeSinceClick = uTime - uClickTime;
          if (timeSinceClick > 0.0 && timeSinceClick < 3.2) {
            float waveSpeed = 5.0;
            float waveRadius = timeSinceClick * waveSpeed;
            float waveDist = abs(distance(pos.xy, mouseWorld.xy) - waveRadius);
            float waveWidth = 0.7;
            if (waveDist < waveWidth) {
              float waveAmp = (1.0 - waveDist / waveWidth) * exp(-timeSinceClick * 1.3);
              pos.z += waveAmp * 1.4;
              pos.xy += normalize(pos.xy - mouseWorld.xy + 0.001) * waveAmp * 0.9;
            }
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = aScale * (13.5 / -mvPosition.z);

          // Ethereal dual color gradient (Tryvanta neon glow)
          float colorMix = sin(pos.z * 0.6 + uTime * 0.5 + aRandom.x * 3.14) * 0.5 + 0.5;
          vColor = mix(uColor1, uColor2, colorMix);
          vAlpha = clamp(0.25 + (1.0 - length(pos) / 7.5) * 0.7, 0.1, 0.95);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vec2 coord = gl_PointCoord - vec2(0.5);
          float dist = length(coord);
          if (dist > 0.5) discard;

          float strength = 1.0 - smoothstep(0.0, 0.5, dist);
          strength = pow(strength, 1.5);

          gl_FragColor = vec4(vColor, vAlpha * strength);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.particleField = new THREE.Points(geometry, this.particleMaterial);
    this.scene.add(this.particleField);
  }

  // Glowing 3D energy stream ribbons flowing across space matching the uploaded images
  private initEnergyRibbons() {
    const numRibbons = 4;
    const colors = [0xff2d78, 0x06b6d4, 0xf59e0b, 0xd946ef];

    for (let r = 0; r < numRibbons; r++) {
      const numPoints = 80;
      const points: THREE.Vector3[] = [];
      const baseRadius = 3.2 + r * 0.8;

      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 2;
        const x = Math.cos(t) * baseRadius + Math.sin(t * 3) * 0.5;
        const y = Math.sin(t) * (baseRadius * 0.5) + Math.cos(t * 2) * 0.4;
        const z = Math.sin(t * 2) * 1.5;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const curvePoints = curve.getPoints(240);
      const geom = new THREE.BufferGeometry().setFromPoints(curvePoints);

      const mat = new THREE.LineBasicMaterial({
        color: colors[r % colors.length],
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        linewidth: 2,
      });

      const line = new THREE.Line(geom, mat);
      line.rotation.x = (r * 0.4) - 0.2;
      line.rotation.y = r * 0.6;
      this.scene.add(line);

      this.ribbonLines.push(line);
      this.ribbonSplines.push({
        points,
        line,
        speed: 0.4 + r * 0.2,
        phase: r * 1.5,
      });
    }
  }

  private initHeroSubjects() {
    this.heroGroup = new THREE.Group();
    this.heroGroup.position.set(0, 0, 0);
    this.scene.add(this.heroGroup);

    // MODE 1: Tryvanta Core Smart Vortex (Central Ecosystem Hub)
    this.fluidMesh = new THREE.Group();
    const knotGeom = new THREE.TorusKnotGeometry(1.25, 0.3, 160, 24, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x0e1118,
      metalness: 0.95,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      transmission: 0.12,
      ior: 1.6,
    });
    const knot = new THREE.Mesh(knotGeom, knotMat);
    knot.castShadow = true;
    knot.receiveShadow = true;
    this.fluidMesh.add(knot);

    // Part 2: Orbiting glowing neon data rings
    const ringGeom = new THREE.TorusGeometry(2.2, 0.025, 16, 120);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xff3b81,
      emissive: 0xff2d78,
      emissiveIntensity: 0.8,
      metalness: 0.95,
      roughness: 0.1,
    });
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI * 0.35;
    this.fluidMesh.add(ring1);

    const ringGeom2 = new THREE.TorusGeometry(2.5, 0.015, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.y = Math.PI * 0.45;
    this.fluidMesh.add(ring2);

    // Part 3: Inner luminous AI core sphere (Layla Brain)
    const coreGeom = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x030712,
      emissive: 0xff2d78,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    this.fluidMesh.add(core);

    // MODE 2: Cyber Geometric Smart Lattice
    this.latticeMesh = new THREE.Group();
    const icoOuterGeom = new THREE.IcosahedronGeometry(1.65, 2);
    const wireMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      roughness: 0.15,
      metalness: 0.9,
    });
    const icoOuter = new THREE.Mesh(icoOuterGeom, wireMat);
    this.latticeMesh.add(icoOuter);

    const icoInnerGeom = new THREE.OctahedronGeometry(0.95, 0);
    const icoInnerMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0c12,
      metalness: 0.95,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const icoInner = new THREE.Mesh(icoInnerGeom, icoInnerMat);
    this.latticeMesh.add(icoInner);

    // MODE 3: Quantum Silk Undulating Mesh
    this.silkMesh = new THREE.Group();
    const planeGeom = new THREE.PlaneGeometry(3.8, 3.8, 64, 64);
    const silkMat = new THREE.MeshPhysicalMaterial({
      color: 0x090d16,
      metalness: 0.85,
      roughness: 0.2,
      wireframe: true,
      side: THREE.DoubleSide,
      clearcoat: 0.7,
    });
    const silk = new THREE.Mesh(planeGeom, silkMat);
    silk.rotation.x = -Math.PI * 0.3;
    this.silkMesh.add(silk);

    // MODE 4: Obsidian Core Monolith (Tryvanta Core Hub replica)
    this.monolithMesh = new THREE.Group();
    const monoGeom = new THREE.CylinderGeometry(0.8, 0.9, 1.2, 32);
    const monoMat = new THREE.MeshPhysicalMaterial({
      color: 0x07090e,
      metalness: 0.95,
      roughness: 0.06,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      reflectivity: 1.0,
    });
    const monolith = new THREE.Mesh(monoGeom, monoMat);
    monolith.castShadow = true;
    this.monolithMesh.add(monolith);

    // Luminous Tryvanta top ring on the Hub
    const topRingGeom = new THREE.TorusGeometry(0.8, 0.04, 16, 64);
    const topRingMat = new THREE.MeshStandardMaterial({
      color: 0xff2d78,
      emissive: 0xff2d78,
      emissiveIntensity: 1.5,
    });
    const topRing = new THREE.Mesh(topRingGeom, topRingMat);
    topRing.rotation.x = Math.PI / 2;
    topRing.position.y = 0.6;
    this.monolithMesh.add(topRing);

    // Add all modes to the hero group
    this.heroGroup.add(this.fluidMesh);
    this.heroGroup.add(this.latticeMesh);
    this.heroGroup.add(this.silkMesh);
    this.heroGroup.add(this.monolithMesh);
  }

  private initContactShadow() {
    const shadowGeom = new THREE.PlaneGeometry(5.5, 5.5);
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.28)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(canvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;

    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.6,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });

    this.contactShadow = new THREE.Mesh(shadowGeom, shadowMat);
    this.contactShadow.rotation.x = -Math.PI / 2;
    this.contactShadow.position.y = -2.1;
    this.scene.add(this.contactShadow);
  }

  public setMode(mode: SceneMode) {
    this.settings.mode = mode;
    this.fluidMesh.visible = mode === 'fluid';
    this.latticeMesh.visible = mode === 'lattice';
    this.silkMesh.visible = mode === 'silk';
    this.monolithMesh.visible = mode === 'monolith';
  }

  public updateThemeColors() {
    const palette = THEME_PALETTES[this.settings.theme] || THEME_PALETTES.obsidian;
    _colorA.setHex(palette.p1);
    _colorB.setHex(palette.p2);

    if (this.particleMaterial) {
      this.particleMaterial.uniforms.uColor1.value.copy(_colorA);
      this.particleMaterial.uniforms.uColor2.value.copy(_colorB);
    }
    if (this.mouseLight) {
      this.mouseLight.color.setHex(palette.light);
    }
    if (this.accentLight) {
      this.accentLight.color.setHex(palette.p1);
    }
  }

  public updateSettings(partial: Partial<WebGLSettings>) {
    Object.assign(this.settings, partial);
    if (partial.mode) {
      this.setMode(partial.mode);
    }
    if (partial.theme) {
      this.updateThemeColors();
    }
    if (partial.turbulence !== undefined && this.particleMaterial) {
      this.particleMaterial.uniforms.uTurbulence.value = partial.turbulence;
    }
    if (partial.mouseForce !== undefined && this.particleMaterial) {
      this.particleMaterial.uniforms.uMouseForce.value = partial.mouseForce;
    }
    if (partial.wireframe !== undefined) {
      this.fluidMesh.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material.wireframe = partial.wireframe;
        }
      });
    }
  }

  public onMouseMove(normalizedX: number, normalizedY: number, vx: number, vy: number) {
    this.mouse.targetX = normalizedX;
    this.mouse.targetY = normalizedY;
    this.mouse.vx = vx;
    this.mouse.vy = vy;
  }

  public onMouseDown() {
    this.mouse.isDown = true;
    this.mouse.clickTime = this.clock.getElapsedTime();
    if (this.particleMaterial) {
      this.particleMaterial.uniforms.uClickTime.value = this.mouse.clickTime;
    }
  }

  public onMouseUp() {
    this.mouse.isDown = false;
  }

  public triggerImpulse(intensity: number = 1.0) {
    this.mouse.clickTime = this.clock.getElapsedTime();
    if (this.particleMaterial) {
      this.particleMaterial.uniforms.uClickTime.value = this.mouse.clickTime;
    }
    this.heroGroup.position.z += 0.35 * intensity;
  }

  private bindEvents() {
    const handleResize = () => {
      if (this.isDestroyed || !this.renderer) return;
      const width = this.container.clientWidth || window.innerWidth;
      const height = this.container.clientHeight || window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    const canvas = this.renderer.domElement;
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      if (this.animFrameId) {
        cancelAnimationFrame(this.animFrameId);
        this.animFrameId = null;
      }
    });

    canvas.addEventListener('webglcontextrestored', () => {
      this.renderer.compile(this.scene, this.camera);
      this.startLoop();
    });
  }

  private startLoop() {
    const render = () => {
      if (this.isDestroyed) return;

      const delta = Math.min(this.clock.getDelta(), 0.1);
      const time = this.clock.getElapsedTime() * this.settings.flowSpeed;

      // Exponential damping on mouse physics
      this.mouse.x = THREE.MathUtils.damp(this.mouse.x, this.mouse.targetX, 6.0, delta);
      this.mouse.y = THREE.MathUtils.damp(this.mouse.y, this.mouse.targetY, 6.0, delta);

      // Hero group position spring recovery
      this.heroGroup.position.z = THREE.MathUtils.damp(this.heroGroup.position.z, 0, 5.0, delta);

      // Update particle shader uniforms
      if (this.particleMaterial) {
        this.particleMaterial.uniforms.uTime.value = time;
        this.particleMaterial.uniforms.uMouse.value.set(this.mouse.x, this.mouse.y);
        this.particleMaterial.uniforms.uMouseVelocity.value.set(this.mouse.vx, this.mouse.vy);
      }

      // Interactive mouse point light
      _mouse3D.set(this.mouse.x * 4.8, this.mouse.y * 3.2, 2.8);
      this.mouseLight.position.lerp(_mouse3D, 0.12);
      this.mouseLight.intensity = this.mouse.isDown ? 6.5 : 4.0;

      // Animate flowing energy ribbons
      for (let i = 0; i < this.ribbonSplines.length; i++) {
        const item = this.ribbonSplines[i];
        item.line.rotation.z = time * item.speed * 0.15 + item.phase;
        item.line.rotation.y = time * 0.1 + item.phase * 0.5;
        // Subtle mouse pull on ribbons
        item.line.position.x = this.mouse.x * 0.4 * (i + 1);
        item.line.position.y = this.mouse.y * 0.3 * (i + 1);
      }

      // Ambient slow rotation & interactive mouse tilt for hero group
      const targetRotX = -this.mouse.y * 0.4;
      const targetRotY = this.mouse.x * 0.6;
      this.heroGroup.rotation.x = THREE.MathUtils.damp(this.heroGroup.rotation.x, targetRotX, 4.0, delta);
      this.heroGroup.rotation.y = THREE.MathUtils.damp(this.heroGroup.rotation.y, targetRotY, 4.0, delta);

      // Continuous mode-specific procedural animation
      if (this.settings.mode === 'fluid') {
        this.fluidMesh.children[0].rotation.z = time * 0.35;
        this.fluidMesh.children[1].rotation.z = -time * 0.3;
        this.fluidMesh.children[2].rotation.x = time * 0.25;
      } else if (this.settings.mode === 'lattice') {
        this.latticeMesh.children[0].rotation.y = time * 0.2;
        this.latticeMesh.children[0].rotation.z = time * 0.15;
        this.latticeMesh.children[1].rotation.y = -time * 0.4;
      } else if (this.settings.mode === 'silk') {
        const silk = this.silkMesh.children[0] as THREE.Mesh;
        if (silk && silk.geometry) {
          const posAttr = silk.geometry.attributes.position;
          const posArray = posAttr.array as Float32Array;
          for (let i = 0; i < posAttr.count; i++) {
            const u = posArray[i * 3];
            const v = posArray[i * 3 + 1];
            const distToMouse = Math.hypot(u - this.mouse.x * 2.0, v - this.mouse.y * 2.0);
            const wave = Math.sin(u * 2.4 + time * 1.5) * Math.cos(v * 2.4 + time * 1.2) * 0.25;
            const mouseRipple = Math.exp(-distToMouse * 2.0) * Math.sin(distToMouse * 8.0 - time * 5.0) * 0.3;
            posArray[i * 3 + 2] = wave + mouseRipple;
          }
          posAttr.needsUpdate = true;
        }
      } else if (this.settings.mode === 'monolith') {
        this.monolithMesh.rotation.y = time * 0.2;
      }

      // Camera choreography
      if (this.settings.cameraOrbit) {
        _targetCameraPos.set(
          Math.sin(time * 0.12) * 1.2 + this.mouse.x * 0.8,
          Math.cos(time * 0.16) * 0.6 + this.mouse.y * 0.6,
          7.6 + Math.sin(time * 0.08) * 0.4
        );
      } else {
        _targetCameraPos.set(this.mouse.x * 0.8, this.mouse.y * 0.6, 8.0);
      }
      this.camera.position.lerp(_targetCameraPos, 0.04);
      this.camera.lookAt(0, 0, 0);

      this.renderer.render(this.scene, this.camera);
      this.animFrameId = requestAnimationFrame(render);
    };

    this.animFrameId = requestAnimationFrame(render);
  }

  public setSectionCamera(section: string) {
    if (section === 'hero' || section === 'overview') {
      this.heroGroup.position.set(0, 0, 0);
      this.heroGroup.scale.set(1, 1, 1);
    } else if (section === 'ecosystem') {
      this.heroGroup.position.set(1.6, 0.1, -0.6);
      this.heroGroup.scale.set(0.85, 0.85, 0.85);
    } else if (section === 'resources') {
      this.heroGroup.position.set(-1.6, 0.1, -0.5);
      this.heroGroup.scale.set(0.85, 0.85, 0.85);
    } else if (section === 'layla') {
      this.heroGroup.position.set(0, 0.3, 0.4);
      this.heroGroup.scale.set(1.05, 1.05, 1.05);
    } else if (section === 'gallery') {
      this.heroGroup.position.set(1.5, 0.2, -0.4);
      this.heroGroup.scale.set(0.9, 0.9, 0.9);
    } else if (section === 'testimonials') {
      this.heroGroup.position.set(-1.4, -0.2, -0.6);
      this.heroGroup.scale.set(0.8, 0.8, 0.8);
    } else if (section === 'contact') {
      this.heroGroup.position.set(0, -0.3, -1.0);
      this.heroGroup.scale.set(0.75, 0.75, 0.75);
    }
  }

  public dispose() {
    this.isDestroyed = true;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }

    if (this.particleField) {
      this.particleField.geometry.dispose();
      this.particleMaterial.dispose();
    }
    if (this.contactShadow) {
      this.contactShadow.geometry.dispose();
      (this.contactShadow.material as THREE.Material).dispose();
    }
    this.ribbonLines.forEach((l) => {
      l.geometry.dispose();
      (l.material as THREE.Material).dispose();
    });

    this.heroGroup.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((m) => m.dispose());
        } else {
          object.material?.dispose();
        }
      }
    });

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }
  }
}
