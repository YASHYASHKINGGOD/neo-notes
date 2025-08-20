import React, { useState } from 'react';
import { Search, Smile } from 'lucide-react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  currentIcon?: string;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose, currentIcon }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Comprehensive emojis organized by category like Notion
  const emojiCategories = {
    all: [
      // Most popular/recent - Notion favorites
      '📝', '📁', '📊', '💼', '🎯', '💡', '⚡', '🔥', '⭐', '❤️',
      '📱', '💻', '🚀', '🌟', '📈', '🎨', '🏠', '✅', '❌', '⚠️',
      '📚', '🎭', '🧠', '💎', '🌍', '📊', '🔑', '📌', '🎊', '🎉'
    ],
    smileys: [
      '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
      '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
      '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔',
      '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥',
      '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧',
      '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐'
    ],
    people: [
      '👶', '🧒', '👦', '👧', '🧑', '👨', '👩', '🧓', '👴', '👵',
      '👨‍⚕️', '👩‍⚕️', '👨‍🎓', '👩‍🎓', '👨‍⚖️', '👩‍⚖️', '👨‍🌾', '👩‍🌾', '👨‍🍳', '👩‍🍳',
      '👨‍🔧', '👩‍🔧', '👨‍🏭', '👩‍🏭', '👨‍💼', '👩‍💼', '👨‍🔬', '👩‍🔬', '👨‍💻', '👩‍💻',
      '👨‍🎤', '👩‍🎤', '👨‍🎨', '👩‍🎨', '👨‍✈️', '👩‍✈️', '👨‍🚀', '👩‍🚀', '👨‍🚒', '👩‍🚒'
    ],
    animals: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯',
      '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒',
      '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇',
      '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜',
      '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕'
    ],
    food: [
      '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈',
      '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦',
      '🥬', '🥒', '🌶️', '🫑', '🌽', '🥕', '🫒', '🧄', '🧅', '🥔',
      '🍠', '🥐', '🥖', '🍞', '🥨', '🥯', '🧀', '🥚', '🍳', '🧈',
      '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🌭', '🍔', '🍟', '🍕'
    ],
    travel: [
      '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐',
      '🚚', '🚛', '🚜', '🏍️', '🛵', '🚲', '🛴', '🛹', '🚁', '🛸',
      '✈️', '🛩️', '🛫', '🛬', '🪂', '⛵', '🚤', '🛥️', '🛳️', '⛴️',
      '🚢', '⚓', '⛽', '🚧', '🚦', '🚥', '🗺️', '🗿', '🗽', '🗼',
      '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲', '⛱️', '🏖️', '🏝️'
    ],
    objects: [
      '📱', '📲', '💻', '🖥️', '🖨️', '⌨️', '🖱️', '🖲️', '💽', '💾',
      '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞',
      '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️',
      '⏰', '⏲️', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌', '💡', '🔦',
      '🕯️', '🪔', '🧯', '🛢️', '💰', '💸', '💵', '💴', '💶', '💷',
      '🗝️', '🔑', '🔒', '🔓', '🔐', '🗂️', '📂', '🗃️', '🗄️', '📋',
      '📌', '📍', '📎', '🖇️', '📏', '📐', '✂️', '🖊️', '🖋️', '✏️'
    ],
    symbols: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
      '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️',
      '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐',
      '⭐', '🌟', '✨', '⚡', '☄️', '💫', '🔥', '🌪️', '🌈', '☀️',
      '🌙', '🌠', '🔮', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🎯',
      '🏆', '🥇', '🏅', '💎', '👑', '🔔', '🔕', '🔊', '🔉', '🔈',
      '📢', '📣', '💬', '💭', '🗯️', '💡', '🧠', '🎨', '🖌️', '🎭'
    ],
    flags: [
      '🏁', '🚩', '🎌', '🏴', '🏳️', '🏳️‍🌈', '🏳️‍⚧️', '🏴‍☠️', '🇦🇨', '🇦🇩',
      '🇦🇪', '🇦🇫', '🇦🇬', '🇦🇮', '🇦🇱', '🇦🇲', '🇦🇴', '🇦🇶', '🇦🇷', '🇦🇸',
      '🇦🇹', '🇦🇺', '🇦🇼', '🇦🇽', '🇦🇿', '🇧🇦', '🇧🇧', '🇧🇩', '🇧🇪', '🇧🇫',
      '🇧🇬', '🇧🇭', '🇧🇮', '🇧🇯', '🇧🇱', '🇧🇲', '🇧🇳', '🇧🇴', '🇧🇶', '🇧🇷'
    ]
  };

  const categories = [
    { id: 'all', name: 'All', icon: '😀' },
    { id: 'smileys', name: 'Smileys', icon: '😊' },
    { id: 'people', name: 'People', icon: '👤' },
    { id: 'animals', name: 'Animals', icon: '🐱' },
    { id: 'food', name: 'Food', icon: '🍎' },
    { id: 'travel', name: 'Travel', icon: '✈️' },
    { id: 'objects', name: 'Objects', icon: '📱' },
    { id: 'symbols', name: 'Symbols', icon: '⭐' },
    { id: 'flags', name: 'Flags', icon: '🏁' }
  ];

  const getFilteredEmojis = () => {
    const categoryEmojis = emojiCategories[selectedCategory as keyof typeof emojiCategories] || emojiCategories.all;
    
    if (!searchTerm) return categoryEmojis;
    
    const searchLower = searchTerm.toLowerCase();
    
    // Enhanced keyword matching like Notion
    return categoryEmojis.filter(emoji => {
      // Direct emoji match
      if (emoji.includes(searchTerm)) return true;
      
      // Keyword mapping for better search - Notion-style
      const keywords = {
        // Common work/productivity
        'folder': ['📁', '📂', '🗂️'],
        'file': ['📄', '📃', '📋', '📝'],
        'document': ['📝', '📄', '📃', '📋'],
        'note': ['📝', '📋', '📄', '📃'],
        'task': ['✅', '📋', '🎯', '☑️'],
        'todo': ['✅', '📋', '☑️', '📝'],
        'check': ['✅', '☑️', '✔️'],
        'star': ['⭐', '✨', '🌟', '💫', '⭐'],
        'fire': ['🔥', '💥'],
        'heart': ['❤️', '💙', '💚', '💛', '🧡', '💜', '🖤', '🤍', '🤎'],
        'money': ['💰', '💵', '💴', '💶', '💷', '💸'],
        'home': ['🏠', '🏡', '🏘️', '🏢'],
        'work': ['💼', '🏢', '💻', '🖥️'],
        'office': ['💼', '🏢', '📊', '📈'],
        'idea': ['💡', '🧠', '💭', '🤔'],
        'brain': ['🧠', '💭', '🤔'],
        'rocket': ['🚀', '🛸'],
        'car': ['🚗', '🚕', '🚙', '🏎️'],
        'plane': ['✈️', '🛩️', '🛫'],
        'phone': ['📱', '📞', '☎️'],
        'mobile': ['📱', '📲'],
        'computer': ['💻', '🖥️', '📱', '⌨️'],
        'laptop': ['💻', '⌨️'],
        'book': ['📚', '📖', '📘', '📙', '📗'],
        'library': ['📚', '📖', '🏛️'],
        'music': ['🎵', '🎶', '🎸', '🎹', '🎤', '🎧'],
        'art': ['🎨', '🖼️', '🖌️', '🎭'],
        'design': ['🎨', '🖌️', '✏️', '📐'],
        'camera': ['📷', '📸', '📹', '🎥'],
        'photo': ['📷', '📸', '🖼️'],
        'time': ['🕐', '⏰', '⏱️', '⏳', '⌛'],
        'clock': ['🕐', '⏰', '⏱️'],
        'calendar': ['📅', '📆', '🗓️'],
        'date': ['📅', '📆', '🗓️'],
        'warning': ['⚠️', '🚨', '⚡'],
        'alert': ['⚠️', '🚨', '🔔'],
        'error': ['❌', '🚫', '⛔'],
        'danger': ['❌', '🚫', '⚠️', '🚨'],
        'success': ['✅', '✔️', '🎉', '🎊'],
        'complete': ['✅', '✔️', '🏁'],
        'celebration': ['🎉', '🎊', '🥳', '🎈'],
        'party': ['🎉', '🎊', '🥳', '🎈'],
        'happy': ['😊', '😀', '😃', '😄', '😁', '🙂', '😌'],
        'sad': ['😢', '😭', '😔', '☹️', '🙁'],
        'love': ['😍', '🥰', '😘', '❤️', '💕'],
        'think': ['🤔', '💭', '🧠'],
        'thinking': ['🤔', '💭', '🧠'],
        'smile': ['😊', '🙂', '😀', '😃'],
        'laugh': ['😂', '🤣', '😆', '😁'],
        'cool': ['😎', '🤓', '😏'],
        'target': ['🎯', '🏹', '🎪'],
        'goal': ['🎯', '🏁', '🏆'],
        'trophy': ['🏆', '🥇', '🏅'],
        'medal': ['🏅', '🥇', '🥈', '🥉'],
        'crown': ['👑', '🔱'],
        'king': ['👑', '🤴'],
        'queen': ['👑', '👸'],
        'diamond': ['💎', '💍', '✨'],
        'gem': ['💎', '💍', '✨'],
        'key': ['🔑', '🗝️', '🔐'],
        'lock': ['🔒', '🔐', '🔓'],
        'pin': ['📌', '📍', '🔗'],
        'link': ['🔗', '⛓️'],
        'chain': ['⛓️', '🔗']
      };
      
      // Check if any keyword matches
      for (const [keyword, emojis] of Object.entries(keywords)) {
        if (searchLower.includes(keyword) && emojis.includes(emoji)) {
          return true;
        }
      }
      
      return false;
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="neo-container p-4 w-80 max-h-96 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold flex items-center gap-2">
            <Smile size={16} />
            Choose Icon
          </h3>
          <button
            onClick={onClose}
            className="neo-button px-2 py-1 text-xs"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neo-input text-xs w-full pl-8"
            placeholder="Search emojis..."
          />
          <Search
            size={14}
            className="absolute left-2 top-1/2 transform -translate-y-1/2"
            style={{ color: 'var(--text-muted)' }}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-1 mb-3 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`neo-button-small px-2 py-1 text-xs whitespace-nowrap ${
                selectedCategory === category.id ? 'bg-[var(--accent)] text-[var(--bg-main)]' : ''
              }`}
              title={category.name}
            >
              {category.icon}
            </button>
          ))}
        </div>

        {/* Current Selection */}
        {currentIcon && (
          <div className="mb-3 text-center">
            <div className="text-xs text-[var(--text-muted)] mb-1">Current:</div>
            <span className="text-2xl">{currentIcon}</span>
          </div>
        )}

        {/* Emoji Grid */}
        <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
          {getFilteredEmojis().map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              onClick={() => onSelect(emoji)}
              className="p-2 text-lg hover:bg-[var(--bg-tertiary)] rounded transition-colors"
              title={`Select ${emoji}`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {getFilteredEmojis().length === 0 && (
          <div className="text-center py-4 text-[var(--text-muted)] text-xs">
            No emojis found
          </div>
        )}
      </div>
    </div>
  );
};

export default EmojiPicker;