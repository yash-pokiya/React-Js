import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import api from '../../api/axios';
import Spinner from '../../components/Spinner';
import AnimatedButton from '../../components/AnimatedButton';
import FloatingInput from '../../components/FloatingInput';
import FloatingSelect from '../../components/FloatingSelect';
import Modal from '../../components/Modal';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Form Fields State
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productImage, setProductImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/product/all'),
        api.get('/category/categories'),
      ]);
      setProducts(productsRes.data.product || productsRes.data.products || []);
      setCategories(categoriesRes.data.categories || []);
    } catch (err) {
      if (err !== 'No any Product found..!') {
        toast.error(err || 'Failed to fetch items');
      }
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setSelectedProductId(null);
    setProductName('');
    setDescription('');
    setPrice('');
    setStock('');
    setProductImage(null);
    if (categories.length > 0) {
      setCategoryId(categories[0].id);
    } else {
      setCategoryId('');
    }
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setIsEditing(true);
    setSelectedProductId(product.id);
    setProductName(product.product_name || '');
    setDescription(product.description || '');
    setPrice(product.price || '');
    setStock(product.stock || '');
    setProductImage(null);
    setCurrentImageUrl(product.imageUrl || product.image || '');

    const matchedCat = categories.find(
      (c) =>
        c.id === product.category_id ||
        c.category_name === product.category
    );
    setCategoryId(matchedCat ? matchedCat.id : '');
    setShowModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!productName.trim() || !description.trim() || !price || !stock || !categoryId) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      if (isEditing) {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('category', categoryId);
        if (productImage) {
          formData.append('productImage', productImage);
        }

        const response = await api.post(`/product/edit/${selectedProductId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        toast.success(response.data.msg || 'Product updated successfully!');
      } else {
        if (!productImage) {
          toast.error('Please select an image to upload for this product');
          setSubmitting(false);
          return;
        }

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('categoryId', categoryId);
        formData.append('productImage', productImage);

        const response = await api.post('/product/add', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data.msg && response.data.msg.includes('required')) {
          toast.error(response.data.msg);
          return;
        }

        toast.success(response.data.msg || 'Product created successfully!');
      }

      setShowModal(false);
      fetchProductsAndCategories();
    } catch (err) {
      toast.error(err || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const response = await api.delete(`/product/delete/${productId}`);
      toast.success(response.data.msg || 'Product deleted');
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      toast.error(err || 'Failed to delete product');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-black min-h-screen text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Manage Products
          </h1>
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1.5">
            Create, update, and delete catalog items
          </p>
        </div>

        <AnimatedButton
          onClick={openAddModal}
          className="flex items-center gap-1.5 bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-transparent shadow-lg shadow-orange-500/10"
        >
          <Plus size={14} />
          Add Product
        </AnimatedButton>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="bg-zinc-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            {products.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-900 bg-neutral-900/30 text-zinc-500 font-bold uppercase tracking-widest">
                    <th className="p-4 text-center">ID</th>
                    <th className="p-4">Name</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">Price</th>
                    <th className="p-4 text-center">Stock</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-900 font-semibold text-zinc-400">
                  {products.map((prod) => (
                    <tr key={prod.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 text-center text-zinc-650">#{prod.id}</td>
                      <td className="p-4">
                        <p className="font-bold text-white">{prod.product_name}</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1 max-w-[200px] font-normal">
                          {prod.description}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-0.5 border border-neutral-800 bg-neutral-900 text-white font-bold text-[9px] uppercase tracking-widest rounded-full">
                          {prod.category || prod.category_name || 'N/A'}
                        </span>
                      </td>
                      <td className="p-4 text-right font-bold text-white">₹{prod.price}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-0.5 border text-[9px] font-bold rounded-full ${prod.stock > 0
                            ? 'bg-neutral-900 border-neutral-800 text-white'
                            : 'bg-red-950/40 border-red-900/50 text-red-400'
                          }`}>
                          {prod.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <AnimatedButton
                            onClick={() => openEditModal(prod)}
                            className="p-1.5 border border-neutral-800 hover:border-[#F23F0C] text-zinc-500 hover:text-white rounded-lg transition-all cursor-pointer bg-neutral-900"
                            title="Edit Product"
                          >
                            <Edit size={14} />
                          </AnimatedButton>
                          <AnimatedButton
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 border border-neutral-800 hover:border-red-500/30 hover:bg-red-500/10 text-zinc-555 hover:text-red-400 rounded-lg transition-all cursor-pointer bg-neutral-900"
                            title="Delete Product"
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
              <div className="p-8 text-center text-zinc-500 font-bold">No products in the catalog</div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={isEditing ? 'Edit Product Details' : 'Add New Product'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <FloatingInput
            id="productName"
            label="Product Name *"
            required
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <FloatingInput
            id="description"
            label="Description *"
            type="textarea"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <FloatingInput
              id="price"
              label="Price (₹) *"
              type="number"
              required
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <FloatingInput
              id="stock"
              label="Stock *"
              type="number"
              required
              min={0}
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <FloatingSelect
            id="category"
            label="Category *"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.category_name,
            }))}
          />

          {/* Product Image File Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              Product Image {isEditing ? '(Optional)' : '*'}
            </label>
            <div className="relative border border-dashed border-neutral-800 rounded-xl min-h-[120px] bg-neutral-900/30 flex items-center justify-center overflow-hidden hover:border-neutral-700 transition-all duration-300">
              <input
                type="file"
                accept="image/*"
                required={!isEditing}
                onChange={(e) => setProductImage(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              
              {productImage ? (
                <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
                  <img
                    src={URL.createObjectURL(productImage)}
                    alt="Preview"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/60 opacity-0 hover:opacity-100 flex flex-col items-center justify-center p-4 text-center transition-all duration-300">
                    <p className="text-xs font-bold text-white line-clamp-1 max-w-[80%]">
                      {productImage.name}
                    </p>
                    <p className="text-[9px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
                      Click to change image
                    </p>
                  </div>
                </div>
              ) : isEditing && currentImageUrl ? (
                <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center">
                  <img
                    src={currentImageUrl}
                    alt="Current Product"
                    className="w-full h-full object-contain opacity-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-black/40 hover:bg-black/60 transition-all duration-300">
                    <Upload size={16} className="text-zinc-300 mb-2" />
                    <p className="text-[9px] text-zinc-300 uppercase tracking-wider font-semibold">
                      Click to upload new image
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center p-5 space-y-1.5 text-zinc-400 text-center">
                  <Upload size={16} className="text-zinc-500" />
                  <p className="text-xs font-semibold text-white">
                    Click or Drag image file to upload
                  </p>
                  <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                    PNG, JPG, JPEG up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

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
              {submitting ? 'Saving...' : 'Save Product'}
            </AnimatedButton>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;
