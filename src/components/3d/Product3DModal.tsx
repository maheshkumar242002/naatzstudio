import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { X, RotateCcw, ZoomIn, ZoomOut, ShoppingBag, Send, Check } from 'lucide-react';
import type { Product } from '../../types';

interface Product3DModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onDirectWhatsApp: (product: Product) => void;
}

export const Product3DModal: React.FC<Product3DModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectWhatsApp,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState('#FACC15');
  const [zoomLevel, setZoomLevel] = useState(4.5);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 350;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0B12);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.8, zoomLevel);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0xFACC15, 3, 10);
    fillLight.position.set(-4, 2, 3);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0x60A5FA, 1.5);
    backLight.position.set(0, 4, -5);
    scene.add(backLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(10, 20, 0xFACC15, 0x1E293B);
    gridHelper.position.y = -1.5;
    scene.add(gridHelper);

    // Main 3D Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const colorHex = parseInt(selectedColor.replace('#', '0x'));
    const textureLoader = new THREE.TextureLoader();

    // Load REAL product image texture
    const realTexture = textureLoader.load(product.image, () => {
      renderer.render(scene, camera);
    });

    if (product.model3DType === 'car') {
      // 3D Car
      const bodyGeo = new THREE.BoxGeometry(1.7, 0.5, 3.4);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.15,
        metalness: 0.85,
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.position.y = -0.2;
      modelGroup.add(body);

      const cabinGeo = new THREE.BoxGeometry(1.4, 0.45, 1.7);
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x090A0F, roughness: 0.05, metalness: 0.95 });
      const cabin = new THREE.Mesh(cabinGeo, glassMat);
      cabin.position.set(0, 0.25, -0.2);
      modelGroup.add(cabin);

      // Wheels
      const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.24, 24);
      const tireMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
      const rimMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, metalness: 0.9 });
      [
        [-0.9, -0.4, 1.1],
        [0.9, -0.4, 1.1],
        [-0.9, -0.4, -1.1],
        [0.9, -0.4, -1.1],
      ].forEach(([x, y, z]) => {
        const wGroup = new THREE.Group();
        const tire = new THREE.Mesh(wheelGeo, tireMat);
        tire.rotation.z = Math.PI / 2;
        wGroup.add(tire);
        const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.26, 16), rimMat);
        rim.rotation.z = Math.PI / 2;
        wGroup.add(rim);
        wGroup.position.set(x, y, z);
        modelGroup.add(wGroup);
      });

      // Background real photography card floating behind
      const cardGeo = new THREE.PlaneGeometry(2.4, 1.6);
      const cardMat = new THREE.MeshBasicMaterial({ map: realTexture, side: THREE.DoubleSide });
      const card = new THREE.Mesh(cardGeo, cardMat);
      card.position.set(0, 1.3, -1.2);
      modelGroup.add(card);

    } else if (product.model3DType === 'frame' || product.model3DType === 'phone') {
      // 3D Photo Frame with the REAL PHOTO mapped directly inside!
      const frameGeo = new THREE.BoxGeometry(2.5, 3.2, 0.16);
      const frameMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness: 0.35,
        metalness: 0.6,
      });
      const frame = new THREE.Mesh(frameGeo, frameMat);
      modelGroup.add(frame);

      // Inner Canvas with REAL PHOTO Texture
      const artGeo = new THREE.PlaneGeometry(2.1, 2.8);
      const artMat = new THREE.MeshBasicMaterial({
        map: realTexture,
        side: THREE.FrontSide,
      });
      const art = new THREE.Mesh(artGeo, artMat);
      art.position.z = 0.085;
      modelGroup.add(art);

      // Glass shine overlay
      const glassGeo = new THREE.PlaneGeometry(2.1, 2.8);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.15,
        roughness: 0.1,
        metalness: 0.9,
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.z = 0.09;
      modelGroup.add(glass);

    } else if (product.model3DType === 'mug') {
      // 3D Custom Ceramic Mug with REAL IMAGE WRAP
      const mugGeo = new THREE.CylinderGeometry(1.0, 0.9, 2.2, 32);
      const mugMat = new THREE.MeshStandardMaterial({
        map: realTexture,
        roughness: 0.2,
        metalness: 0.1,
      });
      const mug = new THREE.Mesh(mugGeo, mugMat);
      modelGroup.add(mug);

      // Handle
      const handleGeo = new THREE.TorusGeometry(0.7, 0.14, 16, 32, Math.PI);
      const handleMat = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.1 });
      const handle = new THREE.Mesh(handleGeo, handleMat);
      handle.position.set(1.0, 0, 0);
      handle.rotation.z = -Math.PI / 2;
      modelGroup.add(handle);

    } else if (product.model3DType === 'anime') {
      // 3D Anime Stand with REAL ANIME SHOWCASE BILLBOARD
      const standGeo = new THREE.CylinderGeometry(1.6, 1.8, 0.2, 32);
      const standMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.3 });
      const stand = new THREE.Mesh(standGeo, standMat);
      stand.position.y = -1.2;
      modelGroup.add(stand);

      // Energy Ring
      const auraRingGeo = new THREE.TorusGeometry(1.5, 0.05, 16, 48);
      const auraRingMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const auraRing = new THREE.Mesh(auraRingGeo, auraRingMat);
      auraRing.rotation.x = Math.PI / 2;
      auraRing.position.y = -1.1;
      modelGroup.add(auraRing);

      // Real Anime Poster Backing
      const posterGeo = new THREE.PlaneGeometry(2.2, 2.4);
      const posterMat = new THREE.MeshBasicMaterial({ map: realTexture, side: THREE.DoubleSide });
      const posterMesh = new THREE.Mesh(posterGeo, posterMat);
      posterMesh.position.set(0, 0.3, 0);
      modelGroup.add(posterMesh);
    }

    // Drag interaction (works for mouse and touch)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      modelGroup.rotation.y += dx * 0.012;
      modelGroup.rotation.x = Math.max(-0.6, Math.min(0.6, modelGroup.rotation.x + dy * 0.008));
      prevMouse = { x: e.clientX, y: e.clientY };
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
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        modelGroup.rotation.y += 0.005;
      }
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
  }, [product, selectedColor, zoomLevel]);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-brand-dark border border-brand-yellow/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 sm:p-2.5 rounded-full bg-brand-black/80 hover:bg-brand-yellow text-slate-300 hover:text-brand-black transition-all shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 3D Canvas Section */}
        <div className="w-full md:w-3/5 h-[240px] sm:h-[300px] md:h-auto min-h-[240px] md:min-h-[460px] relative bg-brand-black flex-shrink-0 flex items-center justify-center border-b md:border-b-0 md:border-r border-brand-border/60">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-none" />

          {/* Interactive hints */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-dark/85 backdrop-blur-md border border-brand-yellow/20 text-[11px] sm:text-xs text-brand-yellow">
            <RotateCcw className="w-3 h-3 animate-spin-slow" />
            <span>Real Image 3D Animation</span>
          </div>

          {/* Zoom controls */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 bg-brand-black/80 backdrop-blur-md border border-slate-700 rounded-xl p-0.5 sm:p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(3.0, z - 0.5))}
              className="p-1 sm:p-1.5 text-slate-300 hover:text-brand-yellow rounded-lg hover:bg-slate-800"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.min(6.5, z + 0.5))}
              className="p-1 sm:p-1.5 text-slate-300 hover:text-brand-yellow rounded-lg hover:bg-slate-800"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 z-10 text-[10px] text-slate-400 bg-black/60 px-2 py-0.5 rounded-md pointer-events-none">
            Touch / Drag to rotate 360°
          </div>
        </div>

        {/* Product Details & Actions Side */}
        <div className="w-full md:w-2/5 p-4 sm:p-6 flex flex-col justify-between overflow-y-auto bg-brand-card/95">
          <div className="space-y-3">
            <div>
              <span className="inline-block px-2.5 py-0.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/40 mb-1.5">
                {product.categoryName}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">{product.name}</h2>
              <p className="text-xs text-brand-yellow font-medium mt-0.5">{product.subtitle}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-black text-brand-yellow">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded ml-auto">
                Poster Original
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
              {product.description}
            </p>

            {/* Finish / Accent Color Switcher */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                Custom Finish / Accent Color:
              </label>
              <div className="flex items-center gap-2">
                {[
                  { name: 'Naatz Yellow', hex: '#FACC15' },
                  { name: 'Rosso Red', hex: '#EF4444' },
                  { name: 'Cyber Blue', hex: '#38BDF8' },
                  { name: 'Shadow Black', hex: '#1E293B' },
                  { name: 'Pure White', hex: '#F8FAFC' },
                ].map((col) => (
                  <button
                    key={col.hex}
                    onClick={() => setSelectedColor(col.hex)}
                    style={{ backgroundColor: col.hex }}
                    title={col.name}
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all ${
                      selectedColor === col.hex
                        ? 'border-white scale-110 shadow-lg'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-1">
              {product.features.slice(0, 3).map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow flex-shrink-0" />
                  <span className="truncate">{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-4 mt-3 border-t border-brand-border">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm transition-all border border-slate-700 hover:border-brand-yellow"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Added to Studio Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-brand-yellow" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              onClick={() => onDirectWhatsApp(product)}
              className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl bg-brand-yellow hover:bg-brand-gold text-brand-black font-extrabold text-xs sm:text-sm transition-all shadow-yellow-glow"
            >
              <Send className="w-4 h-4" />
              <span>Order via WhatsApp (987654321)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
