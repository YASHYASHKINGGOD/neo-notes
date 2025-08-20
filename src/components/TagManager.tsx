import React, { useState } from 'react';
import { X, Hash, Plus } from 'lucide-react';

interface TagManagerProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  availableTags?: string[];
  className?: string;
}

const TagManager: React.FC<TagManagerProps> = ({
  tags,
  onTagsChange,
  availableTags = [],
  className = '',
}) => {
  const [newTag, setNewTag] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showInput, setShowInput] = useState(false);

  // Get unique suggestions that aren't already added
  const suggestions = availableTags
    .filter(tag => 
      !tags.includes(tag) && 
      tag.toLowerCase().includes(newTag.toLowerCase())
    )
    .slice(0, 5);

  const addTag = (tagText: string) => {
    const trimmedTag = tagText.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag]);
      setNewTag('');
      setShowSuggestions(false);
      setShowInput(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(newTag);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setNewTag('');
      setShowInput(false);
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
    // Focus the input after showing it
    setTimeout(() => {
      const input = document.querySelector('.tag-input') as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }, 0);
  };

  return (
    <div className={`tag-manager ${className}`}>
      {/* Existing Tags */}
      <div className="flex flex-wrap gap-1 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded border-2"
            style={{
              backgroundColor: 'var(--tag-color)',
              borderColor: 'var(--border-main)',
              color: 'var(--bg-main)',
            }}
          >
            <Hash size={10} />
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="hover:opacity-75"
              title="Remove tag"
            >
              <X size={10} />
            </button>
          </span>
        ))}
      </div>

      {/* Add New Tag */}
      <div className="relative">
        {!showInput ? (
          /* Add Tag Button */
          <button
            onClick={handleShowInput}
            className="neo-button-small flex items-center gap-1 px-2 py-1 text-xs"
            style={{
              background: 'var(--bg-tertiary)',
              border: '1px dashed var(--border-main)',
              color: 'var(--text-muted)',
            }}
            title="Add new tag"
          >
            <Plus size={12} />
            add tag
          </button>
        ) : (
          /* Tag Input */
          <div className="flex items-center gap-1">
            <div className="relative" style={{ width: '140px' }}>
              <input
                type="text"
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value);
                  setShowSuggestions(e.target.value.length > 0);
                }}
                onKeyDown={handleKeyPress}
                onFocus={() => setShowSuggestions(newTag.length > 0)}
                onBlur={() => {
                  // Hide input if empty after losing focus
                  setTimeout(() => {
                    if (!newTag.trim() && !showSuggestions) {
                      setShowInput(false);
                    }
                  }, 200);
                }}
                className="tag-input neo-input text-xs w-full pl-6"
                placeholder="Enter tag name..."
                autoFocus
              />
              <Hash 
                size={12} 
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              />
            </div>
            <button
              onClick={() => addTag(newTag)}
              disabled={!newTag.trim()}
              className="neo-button px-2 py-1 text-xs"
              title="Add tag"
            >
              <Plus size={12} />
            </button>
            <button
              onClick={() => {
                setShowInput(false);
                setNewTag('');
                setShowSuggestions(false);
              }}
              className="neo-button px-2 py-1 text-xs"
              title="Cancel"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <X size={12} />
            </button>
          </div>
        )}

        {/* Suggestions Dropdown */}
        {showInput && showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-8 left-0 z-50 neo-container p-1 min-w-[140px]">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addTag(suggestion)}
                className="w-full text-left p-2 text-xs hover:bg-[var(--bg-tertiary)] rounded flex items-center gap-2"
              >
                <Hash size={10} style={{ color: 'var(--text-muted)' }} />
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagManager;