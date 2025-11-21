'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './TagsFilterSection.module.css'

interface TagOption {
  id: string
  name: string
  count?: number
}

interface TagsFilterSectionProps {
  title: string
  options: TagOption[]
  selectedValues: string[]
  onToggle: (tagId: string) => void
  onAddCustomTag: (tagId: string) => void
  showCount?: number
  className?: string
}

/**
 * TagsFilterSection Component
 *
 * Displays a filterable section for tags with:
 * - Popular tags shown as clickable chips
 * - Search/type-ahead input for finding or adding custom tags
 * - Multi-select with AND logic
 */
export function TagsFilterSection({
  title,
  options,
  selectedValues,
  onToggle,
  onAddCustomTag,
  showCount = 5,
  className = '',
}: TagsFilterSectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Popular tags to show as chips (first N tags not already selected)
  const popularTags = options.slice(0, showCount)

  // Filter options based on search query (excluding already selected)
  const filteredOptions = searchQuery
    ? options.filter(
        (opt) =>
          opt.name.toLowerCase().includes(searchQuery.toLowerCase()) && !selectedValues.includes(opt.id)
      )
    : []

  // Check if the search query is a new custom tag (not in options)
  const isCustomTag =
    searchQuery.trim() &&
    !options.some((opt) => opt.name.toLowerCase() === searchQuery.toLowerCase().trim())

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setIsDropdownOpen(true)
  }

  const handleSelectOption = (tagId: string) => {
    onToggle(tagId)
    setSearchQuery('')
    setIsDropdownOpen(false)
  }

  const handleAddCustom = () => {
    if (searchQuery.trim()) {
      const customTagId = searchQuery.trim().toLowerCase().replace(/\s+/g, '-')
      onAddCustomTag(customTagId)
      setSearchQuery('')
      setIsDropdownOpen(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredOptions.length > 0) {
        handleSelectOption(filteredOptions[0].id)
      } else if (isCustomTag) {
        handleAddCustom()
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <div className={`${styles.section} ${className}`}>
      <h3 className={styles.title}>{title}</h3>

      {/* Selected Tags */}
      {selectedValues.length > 0 && (
        <div className={styles.selectedTags}>
          {selectedValues.map((tagId) => {
            const tag = options.find((t) => t.id === tagId)
            const displayName = tag ? tag.name : tagId.replace(/-/g, ' ')
            return (
              <button
                key={tagId}
                className={styles.selectedTag}
                onClick={() => onToggle(tagId)}
                type="button"
                aria-label={`Remove ${displayName} tag`}
              >
                {displayName}
                <span className={styles.removeIcon}>x</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Popular Tags Chips */}
      <div className={styles.popularTags}>
        {popularTags
          .filter((tag) => !selectedValues.includes(tag.id))
          .map((tag) => (
            <button
              key={tag.id}
              className={styles.tagChip}
              onClick={() => onToggle(tag.id)}
              type="button"
            >
              {tag.name}
              {tag.count !== undefined && <span className={styles.tagCount}>({tag.count})</span>}
            </button>
          ))}
      </div>

      {/* Search Input */}
      <div className={styles.searchWrapper}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Type to search or add tags..."
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          className={styles.searchInput}
        />

        {/* Dropdown */}
        {isDropdownOpen && (searchQuery.trim() || filteredOptions.length > 0) && (
          <div ref={dropdownRef} className={styles.dropdown}>
            {filteredOptions.map((option) => (
              <button
                key={option.id}
                className={styles.dropdownItem}
                onClick={() => handleSelectOption(option.id)}
                type="button"
              >
                {option.name}
                {option.count !== undefined && (
                  <span className={styles.dropdownCount}>({option.count})</span>
                )}
              </button>
            ))}

            {isCustomTag && (
              <button className={styles.dropdownItemCustom} onClick={handleAddCustom} type="button">
                <span className={styles.addIcon}>+</span>
                Add &quot;{searchQuery.trim()}&quot;
              </button>
            )}

            {filteredOptions.length === 0 && !isCustomTag && searchQuery.trim() && (
              <div className={styles.noResults}>No matching tags found</div>
            )}
          </div>
        )}
      </div>

      {selectedValues.length > 0 && (
        <div className={styles.filterNote}>Showing RTIs with ALL selected tags</div>
      )}
    </div>
  )
}
