export interface Model3DConfig {
  scale: number;
  position: [number, number, number];
  rotation: [number, number, number];
}

export const defaultModel3D: Model3DConfig = {
  "scale": 3.4,
  "position": [
    0.3,
    -0.3,
    0
  ],
  "rotation": [
    0.02,
    0.89,
    0.02
  ]
};
