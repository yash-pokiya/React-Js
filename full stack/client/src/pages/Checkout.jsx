import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, CheckCircle } from 'lucide-react';
import api from '../api/axios';
import Spinner from '../components/Spinner';
import AnimatedButton from '../components/AnimatedButton';
import FloatingInput from '../components/FloatingInput';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const checkoutItems = location.state?.checkoutItems || [];

  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Add Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('India');
  const [addingAddress, setAddingAddress] = useState(false);

  useEffect(() => {
    if (checkoutItems.length === 0) {
      toast.error('No items to checkout');
      navigate('/cart');
      return;
    }
    fetchAddresses();
  }, [checkoutItems, navigate]);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/address/get-all');
      const addressList = response.data.addresses || [];
      setAddresses(addressList);
      if (addressList.length > 0) {
        setSelectedAddressId(addressList[0].id);
      }
    } catch (err) {
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!addressLine.trim() || !city.trim()) {
      toast.error('Address and City are required');
      return;
    }
    setAddingAddress(true);
    try {
      const response = await api.post('/address/add', {
        address: addressLine,
        city,
        state: stateName || null,
        pincode: pincode || null,
        country: country || 'India',
      });
      toast.success(response.data.msg || 'Address saved successfully!');

      setAddressLine('');
      setCity('');
      setStateName('');
      setPincode('');
      setCountry('India');
      setShowAddAddress(false);

      await fetchAddresses();
    } catch (err) {
      toast.error(err || 'Failed to add address');
    } finally {
      setAddingAddress(false);
    }
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select a shipping address');
      return;
    }
    setPlacingOrder(true);
    try {
      for (const item of checkoutItems) {
        const id = item.productId || item.id;
        await api.post(`/order/create/${id}`, {
          quantity: item.quantity,
        });
      }

      try {
        await api.delete('/cart/clear');
        checkoutItems.forEach((item) => {
          const id = item.productId || item.id;
          localStorage.removeItem(`cart_qty_guest_${id}`);
          if (location.state?.checkoutItems) {
            localStorage.removeItem(`cart_qty_user_${id}`);
          }
        });
        window.dispatchEvent(new Event('cart-updated'));
      } catch (e) {
        // Ignored
      }

      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error(err || 'Failed to place order');
    } finally {
      setPlacingOrder(false);
    }
  };

  const subtotal = checkoutItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return (
    <div className="py-32 flex justify-center items-center">
      <Spinner size="lg" />
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-surface min-h-screen text-primary">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Checkout
        </h1>
        <p className="text-[10px] text-muted uppercase tracking-widest font-bold mt-1.5">
          Finalize your order details
        </p>
      </div>

      {/* Progress step */}
      <div className="flex items-center gap-6 text-xs font-bold tracking-wider uppercase border-b border-default pb-4">
        <span className={step === 1 ? 'text-primary border-b-2 border-[#F23F0C] pb-4 -mb-[18px]' : 'text-muted'}>
          1. Shipping
        </span>
        <span className="text-muted">/</span>
        <span className={step === 2 ? 'text-primary border-b-2 border-[#F23F0C] pb-4 -mb-[18px]' : 'text-muted'}>
          2. Payment &amp; Review
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Section: Steps */}
        <div className="lg:col-span-2 space-y-8">
          {step === 1 ? (
            <div className="bg-card border border-default p-6 rounded-2xl space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                  Select Shipping Address
                </h2>
                {!showAddAddress && (
                  <AnimatedButton
                    onClick={() => setShowAddAddress(true)}
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:text-secondary underline underline-offset-4 bg-transparent cursor-pointer"
                  >
                    <Plus size={14} />
                    Add New Address
                  </AnimatedButton>
                )}
              </div>

              {/* Add Address Form */}
              {showAddAddress && (
                <form onSubmit={handleAddAddress} className="border border-default p-6 bg-surface-secondary rounded-xl space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <FloatingInput
                        id="addressLine"
                        label="Street Address *"
                        required
                        value={addressLine}
                        onChange={(e) => setAddressLine(e.target.value)}
                      />
                    </div>
                    <div>
                      <FloatingInput
                        id="city"
                        label="City *"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div>
                      <FloatingInput
                        id="stateName"
                        label="State / Region"
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                      />
                    </div>
                    <div>
                      <FloatingInput
                        id="pincode"
                        label="Pincode / ZIP"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                      />
                    </div>
                    <div>
                      <FloatingInput
                        id="country"
                        label="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <AnimatedButton
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="px-4 py-2 border border-default text-secondary hover:text-primary rounded-xl text-xs font-bold cursor-pointer bg-surface-secondary"
                    >
                      Cancel
                    </AnimatedButton>
                    <AnimatedButton
                      type="submit"
                      disabled={addingAddress}
                      className="px-4 py-2 bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
                    >
                      {addingAddress ? 'Saving...' : 'Save Address'}
                    </AnimatedButton>
                  </div>
                </form>
              )}

              {/* Addresses List */}
              {addresses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <label
                      key={addr.id}
                      className={`border p-4 flex gap-3 cursor-pointer transition-all rounded-xl ${selectedAddressId === addr.id
                          ? 'border-[#F23F0C] bg-[#F23F0C]/10'
                          : 'border-default bg-surface hover:border-[var(--color-border-hover)]'
                        }`}
                    >
                      <input
                        type="radio"
                        name="shippingAddress"
                        className="mt-1 accent-[#F23F0C]"
                        checked={selectedAddressId === addr.id}
                        onChange={() => setSelectedAddressId(addr.id)}
                      />
                      <div className="text-xs space-y-1">
                        <p className="font-semibold text-primary">{addr.address}</p>
                        <p className="text-muted">
                          {addr.city}
                          {addr.state ? `, ${addr.state}` : ''}
                          {addr.pincode ? ` - ${addr.pincode}` : ''}
                        </p>
                        <p className="text-muted font-medium">{addr.country}</p>
                      </div>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 border border-dashed border-default rounded-xl">
                  <p className="text-xs text-secondary font-medium mb-4">
                    No addresses saved yet. Please add a shipping address.
                  </p>
                  {!showAddAddress && (
                    <AnimatedButton
                      onClick={() => setShowAddAddress(true)}
                      className="bg-[#F23F0C] hover:bg-orange-600 text-white rounded-full px-6 py-2.5 font-bold text-xs transition-colors cursor-pointer uppercase tracking-wider"
                    >
                      Add Address
                    </AnimatedButton>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-default">
                <AnimatedButton
                  onClick={() => {
                    if (!selectedAddressId) {
                      toast.error('Please select a shipping address');
                      return;
                    }
                    setStep(2);
                  }}
                  className="bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Continue to Payment
                </AnimatedButton>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Payment Section */}
              <div className="bg-card border border-default rounded-2xl p-6 space-y-4">
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-secondary">
                  Payment Method
                </h2>
                <div className="border border-[#F23F0C] bg-[#F23F0C]/10 rounded-xl p-5 flex items-start gap-4">
                  <CheckCircle className="text-[#F23F0C] flex-shrink-0 mt-0.5" size={18} />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-primary">Cash on Delivery (COD)</p>
                    <p className="text-secondary leading-relaxed">
                      Pay securely at your doorstep on delivery. No advance payment needed.
                    </p>
                  </div>
                </div>
              </div>

              {/* Back / Submit Footer */}
              <div className="flex justify-between items-center">
                <AnimatedButton
                  onClick={() => setStep(1)}
                  className="px-6 py-3.5 border border-default text-secondary hover:text-primary rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer bg-surface-secondary"
                >
                  Back to Shipping
                </AnimatedButton>
                <AnimatedButton
                  onClick={handlePlaceOrder}
                  disabled={placingOrder}
                  className="bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl px-8 py-3.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  {placingOrder ? 'Placing Order...' : 'Confirm & Place Order'}
                </AnimatedButton>
              </div>
            </div>
          )}
        </div>

        {/* Right Section: Order items summary */}
        <div className="bg-card border border-default rounded-2xl p-6 space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary">
            Order Summary
          </h3>

          <div className="divide-y divide-[var(--color-border)] max-h-[240px] overflow-y-auto pr-1">
            {checkoutItems.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center py-3 text-xs">
                <div className="space-y-1 max-w-[70%]">
                  <p className="font-semibold text-primary line-clamp-1">
                    {item.product_name || item.productName}
                  </p>
                  <p className="text-muted text-[10px]">
                    Qty: {item.quantity} x ₹{item.price}
                  </p>
                </div>
                <span className="font-bold text-primary text-right">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="divide-y divide-[var(--color-border)] text-xs font-semibold text-secondary pt-4 border-t border-default space-y-3">
            <div className="flex justify-between py-1">
              <span>Items Subtotal</span>
              <span className="text-primary font-bold">₹{subtotal}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping Fee</span>
              <span className="text-primary font-bold">FREE</span>
            </div>
            <div className="flex justify-between py-3 text-sm font-bold text-primary">
              <span>Total Amount</span>
              <span>₹{subtotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
