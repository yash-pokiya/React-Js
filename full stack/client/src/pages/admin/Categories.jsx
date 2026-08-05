import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import api from '../../api/axios';
import Spinner from '../../components/Spinner';
import AnimatedButton from '../../components/AnimatedButton';
import FloatingInput from '../../components/FloatingInput';
import Modal from '../../components/Modal';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Form Fields State
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await api.get('/category/categories');
      setCategories(response.data.categories || []);
    } catch (err) {
      toast.error(err || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setSelectedCategoryId(null);
    setCategoryName('');
    setDescription('');
    setShowModal(true);
  };

  const openEditModal = (category) => {
    setIsEditing(true);
    setSelectedCategoryId(category.id);
    setCategoryName(category.category_name || '');
    setDescription(category.description || '');
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim() || !description.trim()) {
      toast.error('Category Name and Description are required');
      return;
    }

    setSubmitting(true);
    try {
      if (isEditing) {
        const response = await api.put(`/category/update/${selectedCategoryId}`, {
          categoryName,
          description,
        });

        toast.success(response.data.msg || 'Category updated successfully!');
      } else {
        const response = await api.post('/category/create', {
          categoryName,
          description,
        });

        if (response.data.msg && response.data.msg.includes('already exist')) {
          toast.error(response.data.msg);
          return;
        }

        toast.success(response.data.msg || 'Category created successfully!');
      }

      setShowModal(false);
      fetchCategories();
    } catch (err) {
      toast.error(err || 'Failed to save category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category? It may affect existing products.')) return;
    try {
      const response = await api.delete(`/category/delete/${categoryId}`);
      toast.success(response.data.msg || 'Category deleted');
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    } catch (err) {
      toast.error(err || 'Failed to delete category');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Manage Categories
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1.5">
            Organize products into classification groups
          </p>
        </div>

        <AnimatedButton
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-transparent shadow-lg shadow-orange-500/10"
        >
          <Plus size={14} />
          Add Category
        </AnimatedButton>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="bg-zinc-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            {categories.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-900 bg-neutral-900/30 text-zinc-500 font-bold uppercase tracking-widest">
                    <th className="p-4 text-center">ID</th>
                    <th className="p-4">Category Name</th>
                    <th className="p-4">Description</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 font-semibold text-zinc-400">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-center text-zinc-650">#{cat.id}</td>
                      <td className="p-4 font-bold text-white text-sm">{cat.category_name}</td>
                      <td className="p-4 text-zinc-500 line-clamp-1 max-w-[300px] font-normal">
                        {cat.description || 'No description provided.'}
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <AnimatedButton
                            onClick={() => openEditModal(cat)}
                            className="p-1.5 border border-neutral-800 hover:border-[#F23F0C] text-zinc-500 hover:text-white rounded-lg transition-all cursor-pointer bg-neutral-900"
                            title="Edit Category"
                          >
                            <Edit size={14} />
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="p-1.5 border border-neutral-800 hover:border-red-500/30 hover:bg-red-500/10 text-zinc-555 hover:text-red-400 rounded-lg transition-all cursor-pointer bg-neutral-900"
                            title="Delete Category"
                          >
                            <Trash2 size={14} />
                          </AnimatedButton>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-zinc-500 font-bold">No categories available</div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Edit Category' : 'Create Category'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <FloatingInput
            id="categoryName"
            label="Category Name *"
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <FloatingInput
            id="description"
            label="Description *"
            type="textarea"
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2 justify-end border-t border-neutral-900 pt-4 mt-6">
            <AnimatedButton
              type="button"
              onClick={() => setShowModal(false)}
              className="px-5 py-2.5 border border-neutral-800 text-zinc-400 hover:text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer bg-neutral-900"
            >
              Cancel
            </AnimatedButton>
            <AnimatedButton
              type="submit"
              disabled={submitting}
              className="px-5 py-2.5 bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer border border-transparent shadow-lg shadow-orange-500/10"
            >
              {submitting ? 'Saving...' : 'Save Category'}
            </AnimatedButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Categories;
