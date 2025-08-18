import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { X, Palette, RotateCcw } from 'lucide-react';

export interface Theme {
  name: string;
  bgMain: string;
  bgSecondary: string;
  bgTertiary: string;
  textMain: string;
  textSecondary: string;
  textMuted: string;
  borderMain: string;
  accent: string;
  accentSecondary: string;
}

export const defaultThemes: Theme[] = [
  {
    name: 'dark brutalist',
    bgMain: '#1a1a1a',
    bgSecondary: '#2d2d2d',
    bgTertiary: '#404040',
    textMain: '#f5f5f5',
    textSecondary: '#d1d1d1',
    textMuted: '#a0a0a0',
    borderMain: '#f5f5f5',
    accent: '#00ff88',
    accentSecondary: '#ff6b6b',
  },
  {
    name: 'neon cyber',
    bgMain: '#0a0a0a',
    bgSecondary: '#1a0a1a',
    bgTertiary: '#2a1a2a',
    textMain: '#ff00ff',
    textSecondary: '#cc00cc',
    textMuted: '#990099',
    borderMain: '#ff00ff',
    accent: '#00ffff',
    accentSecondary: '#ffff00',
  },
  {
    name: 'forest night',
    bgMain: '#0d1b0d',
    bgSecondary: '#1a2e1a',
    bgTertiary: '#264026',
    textMain: '#e8f5e8',
    textSecondary: '#c0e6c0',
    textMuted: '#90c690',
    borderMain: '#7dd87d',
    accent: '#32cd32',
    accentSecondary: '#ff6347',
  },
  {
    name: 'ocean depth',
    bgMain: '#0a1a2a',
    bgSecondary: '#1a2a3a',
    bgTertiary: '#2a3a4a',
    textMain: '#e8f4fd',
    textSecondary: '#c0d8ed',
    textMuted: '#90b8dd',
    borderMain: '#4a9eff',
    accent: '#00bfff',
    accentSecondary: '#ff4500',
  },
];

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({
  isOpen,
  onClose,
  currentTheme,
  onThemeChange,
}) => {
  const [activeTheme, setActiveTheme] = useState<Theme>(currentTheme);
  const [activeColorKey, setActiveColorKey] = useState<keyof Theme>('bgMain');

  if (!isOpen) return null;

  const applyTheme = (theme: Theme) => {
    setActiveTheme(theme);
    onThemeChange(theme);
  };

  const updateColor = (colorKey: keyof Theme, color: string) => {
    const updatedTheme = {
      ...activeTheme,
      [colorKey]: color,
    };
    setActiveTheme(updatedTheme);
    onThemeChange(updatedTheme);
  };

  const colorKeys: (keyof Theme)[] = [
    'bgMain',
    'bgSecondary', 
    'bgTertiary',
    'textMain',
    'textSecondary',
    'textMuted',
    'borderMain',
    'accent',
    'accentSecondary',
  ];

  const getColorLabel = (key: keyof Theme) => {
    const labels: Record<keyof Theme, string> = {
      name: 'theme name',
      bgMain: 'main background',
      bgSecondary: 'sidebar background',
      bgTertiary: 'button background',
      textMain: 'main text',
      textSecondary: 'secondary text',
      textMuted: 'muted text',
      borderMain: 'borders',
      accent: 'primary accent',
      accentSecondary: 'danger accent',
    };
    return labels[key] || key;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="neo-container w-[800px] h-[600px] flex">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b-2" style={{ borderColor: 'var(--border-main)' }}>
            <div className="flex items-center gap-2">
              <Palette size={20} />
              <h2 className="text-lg font-bold">theme customizer</h2>
            </div>
            <button onClick={onClose} className="neo-button p-2">
              <X size={16} />
            </button>
          </div>

          <div className="flex h-[500px]">
            {/* Preset Themes */}
            <div className="w-1/4 p-4 border-r-2" style={{ borderColor: 'var(--border-main)' }}>
              <h3 className="font-semibold mb-3">presets</h3>
              <div className="space-y-2">
                {defaultThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => applyTheme(theme)}
                    className="neo-button w-full text-left text-sm"
                    style={{
                      background: activeTheme.name === theme.name ? 'var(--accent)' : undefined,
                      color: activeTheme.name === theme.name ? 'var(--bg-main)' : undefined,
                    }}
                  >
                    {theme.name}
                  </button>
                ))}
                <button
                  onClick={() => applyTheme(defaultThemes[0])}
                  className="neo-button w-full text-left text-sm flex items-center gap-2"
                >
                  <RotateCcw size={14} />
                  reset
                </button>
              </div>
            </div>

            {/* Color Picker */}
            <div className="w-1/2 p-4">
              <h3 className="font-semibold mb-3">customize colors</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {colorKeys.map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveColorKey(key)}
                    className="neo-button text-xs p-2 flex flex-col items-center gap-1"
                    style={{
                      background: activeColorKey === key ? 'var(--accent)' : undefined,
                      color: activeColorKey === key ? 'var(--bg-main)' : undefined,
                    }}
                  >
                    <div
                      className="w-6 h-6 border border-black"
                      style={{ background: activeTheme[key] }}
                    />
                    {getColorLabel(key)}
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <HexColorPicker
                  color={activeTheme[activeColorKey] as string}
                  onChange={(color) => updateColor(activeColorKey, color)}
                />
              </div>
            </div>

            {/* Preview */}
            <div className="w-1/4 p-4">
              <h3 className="font-semibold mb-3">preview</h3>
              <div className="space-y-3">
                <div 
                  className="p-3 border-2"
                  style={{ 
                    background: activeTheme.bgSecondary,
                    borderColor: activeTheme.borderMain,
                    color: activeTheme.textMain 
                  }}
                >
                  <div className="text-sm font-semibold">sample note</div>
                  <div className="text-xs" style={{ color: activeTheme.textMuted }}>
                    2 hours ago
                  </div>
                  <div className="text-xs mt-1" style={{ color: activeTheme.textSecondary }}>
                    this is how your notes will look...
                  </div>
                </div>

                <button
                  className="w-full px-3 py-2 border-2 font-semibold text-sm"
                  style={{
                    background: activeTheme.bgTertiary,
                    borderColor: activeTheme.borderMain,
                    color: activeTheme.textMain,
                    boxShadow: '2px 2px 0 0 #000',
                  }}
                >
                  sample button
                </button>

                <div
                  className="px-2 py-1 text-xs"
                  style={{
                    background: activeTheme.accent,
                    color: activeTheme.bgMain,
                  }}
                >
                  active state
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;