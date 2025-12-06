export {};

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
}

import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { ReactThreeFiber } from "@react-three/fiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshLineGeometry: ReactThreeFiber.Node<THREE.BufferGeometry, typeof MeshLineGeometry>;
    meshLineMaterial: ReactThreeFiber.Node<THREE.Material, typeof MeshLineMaterial>;
  }
}
