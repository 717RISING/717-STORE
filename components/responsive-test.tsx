"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Smartphone, Tablet, Monitor, Wifi, WifiOff } from 'lucide-react';

interface DeviceInfo {
  width: number
  height: number
  deviceType: string
  orientation: string
  pixelRatio: number
  userAgent: string
  isOnline: boolean
  touchSupport: boolean
}

const devicePresets = [
  { name: 'Responsive', width: '100%', height: '100%' },
  { name: 'iPhone 14 Pro', width: '393px', height: '852px' },
  { name: 'iPhone SE', width: '375px', height: '667px' },
  { name: 'iPad Air', width: '820px', height: '1180px' },
  { name: 'Samsung Galaxy S23', width: '360px', height: '780px' },
  { name: 'Desktop (1366x768)', width: '1366px', height: '768px' },
  { name: 'Desktop (1920x1080)', width: '1920px', height: '1080px' },
];

export function ResponsiveTest() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);
  const [orientation, setOrientation] = useState('');
  const [breakpoint, setBreakpoint] = useState('');
  const [customWidth, setCustomWidth] = useState('');
  const [customHeight, setCustomHeight] = useState('');
  const [selectedDevice, setSelectedDevice] = useState('Responsive');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState('');
  const [device, setDevice] = useState('current');

  const breakpoints = {
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
  };

  useEffect(() => {
    updateDimensions();
    updateDeviceInfo();
    
    const handleResize = () => {
      updateDimensions();
      updateDeviceInfo();
    }
    const handleOnline = () => updateDeviceInfo();
    const handleOffline = () => updateDeviceInfo();

    window.addEventListener('resize', handleResize);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    }
  }, []);

  useEffect(() => {
    // Set the iframe source to the current page's origin
    // This allows testing the current application within the iframe
    if (typeof window !== 'undefined') {
      setIframeSrc(window.location.origin);
    }
  }, []);

  useEffect(() => {
    const preset = devicePresets.find(p => p.name === selectedDevice);
    if (preset) {
      setCustomWidth(preset.width);
      setCustomHeight(preset.height);
    }
  }, [selectedDevice]);

  useEffect(() => {
    if (device === 'current') {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    } else {
      const [w, h] = device.split('x').map(Number);
      setWidth(w);
      setHeight(h);
    }
  }, [device]);

  const updateDeviceInfo = () => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let deviceType = 'Desktop';
    if (width < 768) deviceType = 'Mobile';
    else if (width < 1024) deviceType = 'Tablet';

    const orientation = width > height ? 'Horizontal' : 'Vertical';
    
    setOrientation(orientation);
  }

  const updateDimensions = () => {
    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setOrientation(window.innerWidth > window.innerHeight ? 'Horizontal' : 'Vertical');

      let bpName = '';
      for (const [key, value] of Object.entries(breakpoints)) {
        if (window.innerWidth < value) {
          bpName = key;
          break;
        }
      }
      if (bpName === '') bpName = '2xl';
      setBreakpoint(bpName);
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'Mobile':
        return <Smartphone className="h-5 w-5" />;
      case 'Tablet':
        return <Tablet className="h-5 w-5" />;
      default:
        return <Monitor className="h-5 w-5" />;
    }
  }

  const handleApplyCustomSize = () => {
    // No-op, as customWidth/Height are already updated by input fields
    // This button is mostly for visual confirmation or if more complex logic was needed
  };

  const handleDeviceChange = (value: string) => {
    setDevice(value);
  }

  const bpInfo = getBreakpointInfo(width);

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-3xl font-bold mb-8">Prueba de Responsividad</h1>

      <Card className="w-full max-w-md mb-8 p-6">
        <CardHeader>
          <CardTitle>Dimensiones Actuales</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-semibold">{width}px x {height}px</p>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mb-8 p-6">
        <CardHeader>
          <CardTitle>Simular Dispositivo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="device-select">Seleccionar Dispositivo</Label>
            <Select value={device} onValueChange={handleDeviceChange}>
              <SelectTrigger id="device-select">
                <SelectValue placeholder="Selecciona un dispositivo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Actual ({window.innerWidth}x{window.innerHeight})</SelectItem>
                <SelectItem value="375x667">Móvil (iPhone 8 - 375x667)</SelectItem>
                <SelectItem value="768x1024">Tablet (iPad - 768x1024)</SelectItem>
                <SelectItem value="1024x768">Tablet Horizontal (iPad - 1024x768)</SelectItem>
                <SelectItem value="1280x800">Laptop (1280x800)</SelectItem>
                <SelectItem value="1920x1080">Escritorio (1920x1080)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div
        className={cn(
          "relative border-8 border-gray-800 dark:border-gray-200 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out",
          selectedDevice !== 'Responsive' && 'p-2 bg-gray-900 dark:bg-gray-100' // Add padding for device frame
        )}
        style={{
          width: selectedDevice === 'Responsive' ? '100%' : customWidth,
          height: selectedDevice === 'Responsive' ? '80vh' : customHeight,
          maxWidth: '100%', // Ensure it doesn't overflow parent
          maxHeight: '90vh', // Ensure it doesn't overflow viewport
        }}
      >
        {selectedDevice !== 'Responsive' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 bg-gray-700 dark:bg-gray-300 rounded-b-lg z-10" />
        )}
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title="Device Simulator"
          className="w-full h-full bg-white dark:bg-gray-900"
          style={{
            border: 'none',
            transformOrigin: 'top left',
            // For responsive, iframe takes full size. For fixed, it's contained.
            width: selectedDevice === 'Responsive' ? '100%' : '100%',
            height: selectedDevice === 'Responsive' ? '100%' : '100%',
          }}
        />
        {selectedDevice !== 'Responsive' && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-gray-700 dark:bg-gray-300 rounded-full z-10" />
        )}
      </div>

      <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            {getDeviceIcon('Mobile')}
            Información del Dispositivo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Tipo:</span>
                <span>{'Mobile'}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Dimensiones:</span>
                <span>{width} × {height}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Orientación:</span>
                <span>{orientation}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Pixel Ratio:</span>
                <span>{window.devicePixelRatio || 1}x</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Conexión:</span>
                <div className="flex items-center gap-1">
                  {navigator.onLine ? (
                    <>
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-4 w-4 text-red-500" />
                      <span className="text-red-500">Offline</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Touch:</span>
                <span>{'ontouchstart' in window ? "Soportado" : "No soportado"}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Breakpoint:</span>
                <span className={`${bpInfo.color} text-white`}>
                  {bpInfo.name}
                </span>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <span className="font-medium">User Agent:</span>
            <p className="text-xs text-gray-600 mt-1 break-all">
              {navigator.userAgent}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <Button className="bg-[#4A1518] hover:bg-[#6B1E22] text-white">Botón de Prueba</Button>
            <Input placeholder="Campo de entrada" className="bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" />
          </div>

          <div className="p-4 border border-dashed border-gray-400 dark:border-gray-600 rounded-md mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contenido de Prueba</h3>
            <p>
              Este es un párrafo de texto para probar cómo se ajusta el contenido en diferentes tamaños de pantalla.
              Asegúrate de que el texto sea legible y que los elementos no se superpongan.
            </p>
            <ul className="list-disc list-inside mt-2">
              <li>Elemento de lista 1</li>
              <li>Elemento de lista 2</li>
              <li>Elemento de lista 3</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Breakpoint Visualization */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Breakpoints de Tailwind CSS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'xs', min: 0, max: 639, color: 'bg-red-500' },
              { name: 'sm', min: 640, max: 767, color: 'bg-orange-500' },
              { name: 'md', min: 768, max: 1023, color: 'bg-yellow-500' },
              { name: 'lg', min: 1024, max: 1279, color: 'bg-green-500' },
              { name: 'xl', min: 1280, max: 1535, color: 'bg-blue-500' },
              { name: '2xl', min: 1536, max: Infinity, color: 'bg-purple-500' }
            ].map((bp) => (
              <div 
                key={bp.name}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  width >= bp.min && width <= bp.max
                    ? `${bp.color} text-white`
                    : 'bg-gray-100'
                }`}
              >
                <span className="font-medium">{bp.name}</span>
                <span className="text-sm">
                  {bp.min}px - {bp.max === Infinity ? '∞' : `${bp.max}px`}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Test Actions */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Acciones de Prueba</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => updateDeviceInfo()}>
              Actualizar Info
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Recargar Página
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  document.documentElement.requestFullscreen();
                }
              }}
            >
              Toggle Fullscreen
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const getBreakpointInfo = (width: number) => {
  const breakpoints = {
    'xs': 640,
    'sm': 768,
    'md': 1024,
    'lg': 1280,
    'xl': 1536,
  };

  let bpName = '';
  for (const [key, value] of Object.entries(breakpoints)) {
    if (width < value) {
      bpName = key;
      break;
    }
  }
  if (bpName === '') bpName = '2xl';

  return { name: bpName, color: `bg-${bpName}-500` };
}

export default ResponsiveTest;
