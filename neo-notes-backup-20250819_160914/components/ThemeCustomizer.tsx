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
  iconColor: string;
  buttonTextColor: string;
  highlightColor: string;
  linkColor: string;
  tagColor: string;
  fontFamily: string;
}

export const defaultThemes: Theme[] = [
  {
    name: 'clean office',
    bgMain: '#fafafa',
    bgSecondary: '#f4f4f5',
    bgTertiary: '#e4e4e7',
    textMain: '#27272a',
    textSecondary: '#52525b',
    textMuted: '#71717a',
    borderMain: '#d4d4d8',
    accent: '#3b82f6',
    accentSecondary: '#ef4444',
    iconColor: '#52525b',
    buttonTextColor: '#27272a',
    highlightColor: '#fef08a',
    linkColor: '#2563eb',
    tagColor: '#8b5cf6',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  {
    name: 'modern dark',
    bgMain: '#0c0c0c',
    bgSecondary: '#171717',
    bgTertiary: '#262626',
    textMain: '#fafafa',
    textSecondary: '#d4d4d8',
    textMuted: '#a1a1aa',
    borderMain: '#404040',
    accent: '#10b981',
    accentSecondary: '#f59e0b',
    iconColor: '#d4d4d8',
    buttonTextColor: '#fafafa',
    highlightColor: '#fde047',
    linkColor: '#3b82f6',
    tagColor: '#8b5cf6',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  {
    name: 'warm beige',
    bgMain: '#fdf6e3',
    bgSecondary: '#f7f0d7',
    bgTertiary: '#ede1c7',
    textMain: '#3c3c3c',
    textSecondary: '#586e75',
    textMuted: '#93a1a1',
    borderMain: '#d3c7aa',
    accent: '#859900',
    accentSecondary: '#dc322f',
    iconColor: '#586e75',
    buttonTextColor: '#3c3c3c',
    highlightColor: '#b58900',
    linkColor: '#268bd2',
    tagColor: '#d33682',
    fontFamily: 'Georgia, serif',
  },
  {
    name: 'soft lavender',
    bgMain: '#f8f7ff',
    bgSecondary: '#f1f0fe',
    bgTertiary: '#e7e5ff',
    textMain: '#2e2c5f',
    textSecondary: '#4c4980',
    textMuted: '#6b6b9e',
    borderMain: '#c7c4f0',
    accent: '#6366f1',
    accentSecondary: '#ec4899',
    iconColor: '#4c4980',
    buttonTextColor: '#2e2c5f',
    highlightColor: '#ddd6fe',
    linkColor: '#4338ca',
    tagColor: '#be185d',
    fontFamily: 'Poppins, sans-serif',
  },
  {
    name: 'forest green',
    bgMain: '#f6fdf9',
    bgSecondary: '#ecfdf5',
    bgTertiary: '#d1fae5',
    textMain: '#064e3b',
    textSecondary: '#047857',
    textMuted: '#059669',
    borderMain: '#a7f3d0',
    accent: '#10b981',
    accentSecondary: '#f59e0b',
    iconColor: '#047857',
    buttonTextColor: '#064e3b',
    highlightColor: '#fef3c7',
    linkColor: '#0891b2',
    tagColor: '#7c3aed',
    fontFamily: 'Source Sans Pro, sans-serif',
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
    'iconColor',
    'buttonTextColor',
    'highlightColor',
    'linkColor',
    'tagColor',
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
      iconColor: 'icons',
      buttonTextColor: 'button text',
      highlightColor: 'highlights',
      linkColor: 'links',
      tagColor: 'tags',
      fontFamily: 'font family',
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

            {/* Color Picker & Font Selection */}
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

              <div className="flex justify-center mb-4">
                <HexColorPicker
                  color={activeTheme[activeColorKey] as string}
                  onChange={(color) => updateColor(activeColorKey, color)}
                />
              </div>

              {/* Font Selection */}
              <div className="mb-4">
                <h4 className="font-semibold mb-2 text-sm">font family</h4>
                <select
                  value={activeTheme.fontFamily}
                  onChange={(e) => updateColor('fontFamily', e.target.value)}
                  className="neo-input w-full text-sm"
                >
                  <option value="Inter, system-ui, sans-serif">Inter</option>
                  <option value="Roboto, sans-serif">Roboto</option>
                  <option value="Poppins, sans-serif">Poppins</option>
                  <option value="Open Sans, sans-serif">Open Sans</option>
                  <option value="Lato, sans-serif">Lato</option>
                  <option value="Montserrat, sans-serif">Montserrat</option>
                  <option value="Source Sans Pro, sans-serif">Source Sans Pro</option>
                  <option value="JetBrains Mono, monospace">JetBrains Mono</option>
                  <option value="Fira Code, monospace">Fira Code</option>
                  <option value="SF Mono, Monaco, monospace">SF Mono</option>
                  <option value="Georgia, serif">Georgia</option>
                  <option value="Times New Roman, serif">Times New Roman</option>
                  <option value="Playfair Display, serif">Playfair Display</option>
                </select>
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