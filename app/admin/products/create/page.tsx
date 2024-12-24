'use client'
import React, { useState } from 'react'
import { useCreateProduct } from '@/hooks/queries/use-products'
import { useCategories } from '@/hooks/queries/use-categories'
import { useBrands } from '@/hooks/queries/use-brands'
import { Category } from '@/types/categories'
import { Brand } from '@/types/products'
import { toast } from 'sonner'

const CreateProduct = () => {
  const createProduct = useCreateProduct()
  const { data: categories, isLoading: categoriesLoading } = useCategories()
  const { data: brands, isLoading: brandsLoading } = useBrands()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    rating: 4,
    stock: '',
    category_id: '',
    brand_id: '',
    images: [] as File[]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Convert FileList to Array and update state
      const filesArray = Array.from(e.target.files)
      setFormData(prev => ({
        ...prev,
        images: filesArray
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const submitData = new FormData()
    
    // Append all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'images') {
        submitData.append(key, value.toString())
      }
    })
    
    // Append each image file
    formData.images.forEach((image) => {
      submitData.append('images', image)
    })

    try {
      await createProduct.mutateAsync(submitData)
      toast.success('Product created successfully')
      // Handle success - maybe redirect or show success message
      console.log('Product created successfully')
    } catch (error) {
      console.error('Error creating product:', error)
    }
  }

  return (
    <div className="min-h-screen w-[100%] bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Create New Product</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Three Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* First Column */}
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Second Column */}
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  min="0"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Rating</label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  min="1"
                  max="5"
                  step="0.1"
                />
              </div>
            </div>

            {/* Third Column */}
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={categoriesLoading}
                >
                  <option value="">Select Category</option>
                  {categories?.categories?.map((category: Category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Brand</label>
                <select
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                  disabled={brandsLoading}
                >
                  <option value="">Select Brand</option>
                  {brands?.brands?.map((brand: Brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Full Width Fields */}
          <div className="space-y-6 mt-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Product Images (Max 5)
              </label>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                accept="image/*"
                multiple
                required
              />
              <p className="mt-1 text-sm text-gray-500">
                You can select up to 5 images. Maximum size per image: 5MB
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              disabled={createProduct.isPending}
            >
              {createProduct.isPending ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct