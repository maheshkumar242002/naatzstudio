import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Rotate3d, Sparkles, Camera, Car, Image as ImageIcon } from 'lucide-react';

type StudioMode = 'camera' | 'frame' | 'car';

export const Hero3DStudio: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<StudioMode>('camera');
  const [isRotating, setIsRotating] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
    mainLight.position.set(5, 8, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    // Naatz Studio Yellow rim accent light
    const yellowLight = new THREE.PointLight(0xFACC15, 4, 15);
    yellowLight.position.set(-3, 3, 2);
    scene.add(yellowLight);

    const blueRimLight = new THREE.PointLight(0x38BDF8, 2, 12);
    blueRimLight.position.set(3, -2, -2);
    scene.add(blueRimLight);

    // Pedestal
    const pedestalGroup = new THREE.Group();
    const pedestalGeo = new THREE.CylinderGeometry(2, 2.2, 0.25, 40);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x12131A,
      roughness: 0.3,
      metalness: 0.8,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.2;
    pedestal.receiveShadow = true;
    pedestalGroup.add(pedestal);

    // Glowing yellow ring on pedestal
    const ringGeo = new THREE.TorusGeometry(1.95, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xFACC15 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.07;
    pedestalGroup.add(ring);
    scene.add(pedestalGroup);

    // Floating particles
    const particleCount = 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 6;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xFACC15,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mode-specific 3D Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const textureLoader = new THREE.TextureLoader();

    // Helper: Build Camera Model
    const buildCameraModel = () => {
      const g = new THREE.Group();
      const bodyGeo = new THREE.BoxGeometry(2, 1.3, 1);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1A1C24, roughness: 0.2, metalness: 0.7 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      g.add(body);

      const gripGeo = new THREE.BoxGeometry(0.5, 1.25, 0.4);
      const gripMat = new THREE.MeshStandardMaterial({ color: 0x090A0F, roughness: 0.9 });
      const grip = new THREE.Mesh(gripGeo, gripMat);
      grip.position.set(0.8, -0.02, 0.45);
      g.add(grip);

      const lensBarrelGeo = new THREE.CylinderGeometry(0.65, 0.7, 0.9, 32);
      const lensBarrelMat = new THREE.MeshStandardMaterial({ color: 0x242838, roughness: 0.3, metalness: 0.9 });
      const lensBarrel = new THREE.Mesh(lensBarrelGeo, lensBarrelMat);
      lensBarrel.rotation.x = Math.PI / 2;
      lensBarrel.position.set(-0.2, 0, 0.7);
      g.add(lensBarrel);

      const lensGlassGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.05, 32);
      const lensGlassMat = new THREE.MeshStandardMaterial({
        color: 0x0F172A,
        roughness: 0.05,
        metalness: 0.95,
      });
      const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
      lensGlass.rotation.x = Math.PI / 2;
      lensGlass.position.set(-0.2, 0, 1.15);
      g.add(lensGlass);

      const lensRingGeo = new THREE.TorusGeometry(0.66, 0.03, 16, 32);
      const lensRingMat = new THREE.MeshBasicMaterial({ color: 0xFACC15 });
      const lensRing = new THREE.Mesh(lensRingGeo, lensRingMat);
      lensRing.position.set(-0.2, 0, 0.95);
      g.add(lensRing);

      const topGeo = new THREE.ConeGeometry(0.6, 0.45, 4);
      const topMat = new THREE.MeshStandardMaterial({ color: 0x1A1C24, roughness: 0.3, metalness: 0.8 });
      const top = new THREE.Mesh(topGeo, topMat);
      top.rotation.y = Math.PI / 4;
      top.position.set(-0.2, 0.85, 0);
      g.add(top);

      const shutterGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.15, 16);
      const shutterMat = new THREE.MeshStandardMaterial({ color: 0xFACC15, metalness: 0.8, roughness: 0.2 });
      const shutter = new THREE.Mesh(shutterGeo, shutterMat);
      shutter.position.set(0.75, 0.7, 0.2);
      g.add(shutter);

      g.position.y = 0.1;
      return g;
    };

    // Helper: Build Frame Model with REAL FRAMES POSTER PHOTO
    const buildFrameModel = () => {
      const g = new THREE.Group();
      const outerGeo = new THREE.BoxGeometry(2.4, 3.0, 0.15);
      const outerMat = new THREE.MeshStandardMaterial({ color: 0x12131A, roughness: 0.4, metalness: 0.6 });
      const outer = new THREE.Mesh(outerGeo, outerMat);
      g.add(outer);

      const bevelGeo = new THREE.BoxGeometry(2.0, 2.6, 0.16);
      const bevelMat = new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.2, metalness: 0.7 });
      const bevel = new THREE.Mesh(bevelGeo, bevelMat);
      g.add(bevel);

      // Real poster image texture mapped directly inside the 3D frame!
      const realFrameTex = textureLoader.load('/images/frames_real.jpg', () => {
        renderer.render(scene, camera);
      });
      const photoGeo = new THREE.PlaneGeometry(1.8, 2.4);
      const photoMat = new THREE.MeshBasicMaterial({
        map: realFrameTex,
        side: THREE.FrontSide,
      });
      const photo = new THREE.Mesh(photoGeo, photoMat);
      photo.position.z = 0.085;
      g.add(photo);

      const standGeo = new THREE.BoxGeometry(0.3, 1.8, 0.05);
      const standMat = new THREE.MeshStandardMaterial({ color: 0x0A0B10 });
      const stand = new THREE.Mesh(standGeo, standMat);
      stand.position.set(0, -0.3, -0.4);
      stand.rotation.x = 0.35;
      g.add(stand);

      g.position.y = 0.2;
      return g;
    };

    // Helper: Build Die-Cast Car Model with REAL DIE-CAST CAR POSTER PHOTO
    const buildCarModel = () => {
      const g = new THREE.Group();
      const chassisGeo = new THREE.BoxGeometry(1.6, 0.45, 3.2);
      const carPaintMat = new THREE.MeshStandardMaterial({
        color: 0xFACC15,
        roughness: 0.15,
        metalness: 0.85,
      });
      const chassis = new THREE.Mesh(chassisGeo, carPaintMat);
      chassis.position.y = 0.15;
      g.add(chassis);

      const cabinGeo = new THREE.BoxGeometry(1.3, 0.4, 1.6);
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.05, metalness: 0.95 });
      const cabin = new THREE.Mesh(cabinGeo, glassMat);
      cabin.position.set(0, 0.5, -0.2);
      g.add(cabin);

      const spoilerGeo = new THREE.BoxGeometry(1.5, 0.08, 0.4);
      const carbonMat = new THREE.MeshStandardMaterial({ color: 0x18181B, roughness: 0.3 });
      const spoiler = new THREE.Mesh(spoilerGeo, carbonMat);
      spoiler.position.set(0, 0.65, -1.35);
      g.add(spoiler);

      const wheelGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.22, 24);
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x18181B, roughness: 0.8 });
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, metalness: 0.9, roughness: 0.1 });

      const wheelPositions = [
        [-0.85, -0.1, 1.0],
        [0.85, -0.1, 1.0],
        [-0.85, -0.1, -1.0],
        [0.85, -0.1, -1.0],
      ];

      wheelPositions.forEach(([x, y, z]) => {
        const wheel = new THREE.Group();
        const tire = new THREE.Mesh(wheelGeo, tireMat);
        tire.rotation.z = Math.PI / 2;
        wheel.add(tire);

        const rimGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.24, 16);
        const rim = new THREE.Mesh(rimGeo, rimMat);
        rim.rotation.z = Math.PI / 2;
        wheel.add(rim);

        wheel.position.set(x, y, z);
        g.add(wheel);
      });

      // Real car showroom billboard standing behind the 3D model!
      const realCarTex = textureLoader.load('/images/cars_real.jpg', () => {
        renderer.render(scene, camera);
      });
      const cardGeo = new THREE.PlaneGeometry(2.6, 1.6);
      const cardMat = new THREE.MeshBasicMaterial({ map: realCarTex, side: THREE.DoubleSide });
      const card = new THREE.Mesh(cardGeo, cardMat);
      card.position.set(0, 1.4, -1.3);
      g.add(card);

      g.position.y = 0.1;
      return g;
    };

    let currentModel: THREE.Group;
    if (activeMode === 'camera') currentModel = buildCameraModel();
    else if (activeMode === 'frame') currentModel = buildFrameModel();
    else currentModel = buildCarModel();

    modelGroup.add(currentModel);

    // Mouse / Touch Drag interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) {
        const rect = container.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        camera.position.x = mouseX * 0.4;
        camera.position.y = 1.2 + mouseY * 0.3;
        camera.lookAt(0, 0, 0);
        return;
      }

      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      modelGroup.rotation.y += deltaX * 0.01;
      modelGroup.rotation.x = Math.max(-0.5, Math.min(0.5, modelGroup.rotation.x + deltaY * 0.005));

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (isRotating && !isDragging) {
        modelGroup.rotation.y += 0.008;
      }
      modelGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [activeMode, isRotating]);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-3xl overflow-hidden glass-panel border border-brand-yellow/20 group">
      {/* Three.js Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing select-none touch-none"
        title="Drag with mouse or swipe to rotate in 3D"
      />

      {/* Floating 3D Badge Overlay */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-black/85 backdrop-blur-md border border-brand-yellow/30 text-[10px] sm:text-xs font-semibold text-brand-yellow shadow-lg">
        <Sparkles className="w-3 h-3 text-brand-yellow animate-spin-slow" />
        <span>3D Studio • Real Poster Showcase</span>
      </div>

      {/* Rotation Toggle */}
      <button
        onClick={() => setIsRotating(!isRotating)}
        className="absolute top-3 right-3 z-10 p-1.5 sm:p-2 rounded-full bg-brand-black/85 backdrop-blur-md border border-slate-700 hover:border-brand-yellow text-slate-300 hover:text-brand-yellow transition-all text-xs flex items-center gap-1 shadow-lg"
        title={isRotating ? 'Pause 360° Auto-spin' : 'Resume 360° Auto-spin'}
      >
        <Rotate3d className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
        <span className="hidden md:inline">{isRotating ? 'Pause Spin' : 'Auto Spin'}</span>
      </button>

      {/* Model Selector Bar */}
      <div className="absolute bottom-2.5 inset-x-2.5 sm:bottom-4 sm:inset-x-4 z-10 flex items-center justify-between gap-1 p-1.5 sm:p-2 rounded-2xl bg-brand-black/90 backdrop-blur-md border border-brand-border shadow-2xl">
        <div className="flex items-center gap-1 flex-1 sm:flex-initial justify-between sm:justify-start">
          <button
            onClick={() => setActiveMode('camera')}
            className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
              activeMode === 'camera'
                ? 'bg-brand-yellow text-brand-black font-bold shadow-yellow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Studio Lens</span>
          </button>

          <button
            onClick={() => setActiveMode('frame')}
            className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
              activeMode === 'frame'
                ? 'bg-brand-yellow text-brand-black font-bold shadow-yellow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Real Frame</span>
          </button>

          <button
            onClick={() => setActiveMode('car')}
            className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all ${
              activeMode === 'car'
                ? 'bg-brand-yellow text-brand-black font-bold shadow-yellow-glow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Car className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Real Cars</span>
          </button>
        </div>

        <span className="text-[10px] text-slate-400 font-mono hidden lg:inline px-2">
          🖱️ Drag to rotate 360°
        </span>
      </div>
    </div>
  );
};
