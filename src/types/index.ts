export type SceneMode = 'fluid' | 'lattice' | 'silk' | 'monolith';

export type ColorTheme = 'obsidian' | 'prismatic' | 'aurora' | 'amethyst';

export interface WebGLSettings {
  mode: SceneMode;
  theme: ColorTheme;
  particleDensity: number;
  turbulence: number;
  mouseForce: number;
  flowSpeed: number;
  cameraOrbit: boolean;
  wireframe: boolean;
}

export interface MousePhysicsState {
  x: number;          // Normalized -1 to 1
  y: number;          // Normalized -1 to 1
  screenX: number;    // Absolute clientX
  screenY: number;    // Absolute clientY
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  speed: number;
  isDown: boolean;
  clickTime: number;
}

export type ActiveSection =
  | 'hero'
  | 'ecosystem'
  | 'resources'
  | 'layla'
  | 'gallery'
  | 'testimonials'
  | 'contact';

export interface SmartDevice {
  id: string;
  name: string;
  badge: string;
  category: string;
  description: string;
  specs: string[];
  protocol: string;
  activeStatus: string;
}
