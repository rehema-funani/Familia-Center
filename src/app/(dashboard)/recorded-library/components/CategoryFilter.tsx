// src/app/(dashboard)/recorded-library/components/CategoryFilter.tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface Category {
  id: string
  name: string
  count: number
  color: string
}

interface CategoryFilterProps {
  onCategoryChange: (categories: string[]) => void
  selectedCategories: string[]
}

export default function CategoryFilter({ onCategoryChange, selectedCategories }: CategoryFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const categories: Category[] = [
    { id: 'all', name: 'All Sessions', count: 24, color: 'bg-gray-100 text-gray-700' },
    { id: 'marriage', name: 'Marriage & Couples', count: 8, color: 'bg-red-100 text-red-700' },
    { id: 'individual', name: 'Individual Therapy', count: 6, color: 'bg-blue-100 text-blue-700' },
    { id: 'family', name: 'Family Counseling', count: 4, color: 'bg-green-100 text-green-700' },
    { id: 'addiction', name: 'Addiction Recovery', count: 3, color: 'bg-purple-100 text-purple-700' },
    { id: 'grief', name: 'Grief & Loss', count: 2, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'anxiety', name: 'Anxiety & Depression', count: 5, color: 'bg-indigo-100 text-indigo-700' },
    { id: 'parenting', name: 'Parenting Skills', count: 4, color: 'bg-pink-100 text-pink-700' },
    { id: 'communication', name: 'Communication', count: 6, color: 'bg-teal-100 text-teal-700' },
  ]

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCategoryToggle = (categoryId: string) => {
    if (categoryId === 'all') {
      onCategoryChange([])
      return
    }

    const isSelected = selectedCategories.includes(categoryId)
    
    if (isSelected) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId))
    } else {
      onCategoryChange([...selectedCategories, categoryId])
    }
  }

  const clearAllFilters = () => {
    onCategoryChange([])
  }

  const isAllSelected = selectedCategories.length === 0

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filter by Category</h3>
        {selectedCategories.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearAllFilters}>
            Clear All
          </Button>
        )}
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Category List */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {filteredCategories.map((category) => {
          const isSelected = category.id === 'all' ? isAllSelected : selectedCategories.includes(category.id)
          
          return (
            <div
              key={category.id}
              className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                isSelected 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'hover:bg-gray-50 border border-gray-200'
              }`}
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${category.color.split(' ')[0]}`} />
                <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-700'}`}>
                  {category.name}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant={isSelected ? 'default' : 'outline'}>
                  {category.count}
                </Badge>
                {isSelected && (
                  <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected Categories Summary */}
      {selectedCategories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-2">Selected Categories:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map(categoryId => {
              const category = categories.find(c => c.id === categoryId)
              if (!category) return null
              
              return (
                <Badge 
                  key={categoryId}
                  variant="default"
                  className="flex items-center gap-1"
                >
                  {category.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCategoryToggle(categoryId)
                    }}
                    className="ml-1 hover:bg-blue-700 rounded-full p-0.5"
                  >
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </Badge>
              )
            })}
          </div>
        </div>
      )}

      {/* Quick Filter Options */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-2">Quick Filters:</p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCategoryChange(['marriage', 'communication'])}
            className="text-xs"
          >
            Relationship Focus
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCategoryChange(['individual', 'anxiety'])}
            className="text-xs"
          >
            Personal Growth
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCategoryChange(['family', 'parenting'])}
            className="text-xs"
          >
            Family Support
          </Button>
        </div>
      </div>
    </div>
  )
}