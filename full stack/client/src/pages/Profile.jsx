import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { User, MapPin, Trash2, ShieldAlert, Plus, Save } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Spinner from "../components/Spinner";
import AnimatedButton from "../components/AnimatedButton";
import FloatingInput from "../components/FloatingInput";

const Profile = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("info");

  // Tab 1: Profile Info Form State
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [updatingProfile, setUpdatingProfile] = useState(false);

  // Tab 2: Addresses State
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [addressesRef] = useAutoAnimate();

  // Add Address form inside Profile tab
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [addingAddress, setAddingAddress] = useState(false);

  // Tab 3: Delete Account Confirm
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  useEffect(() => {
    if (user) {
      setFullname(user.fullname || "");
      setUsername(user.username || "");
      setEmail(user.email || "");
    }
  }, [user]);

  // Fetch latest profile details from server on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/user/profile");
        const profileUser = Array.isArray(response.data.user)
          ? response.data.user[0]
          : response.data.user;
        if (profileUser) {
          updateUserProfile(profileUser);
        }
      } catch (err) {
        console.error("Failed to fetch profile details:", err);
      }
    };
    fetchProfile();
  }, []);

  // Load addresses when switching to addresses tab
  useEffect(() => {
    if (activeTab === "addresses") {
      fetchAddresses();
    }
  }, [activeTab]);

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    try {
      const response = await api.get("/address/get-all");
      setAddresses(response.data.addresses || []);
    } catch (err) {
      setAddresses([]);
    } finally {
      setLoadingAddresses(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!fullname.trim() || !username.trim() || !email.trim()) {
      toast.error("All fields are required");
      return;
    }
    setUpdatingProfile(true);
    try {
      const response = await api.post("/user/edit-profile", {
        fullname,
        username,
        email,
      });

      if (response.data.msg && response.data.msg.includes("Require atleast")) {
        toast.error(response.data.msg);
        return;
      }

      toast.success(response.data.msg || "Profile updated successfully!");
      updateUserProfile({ fullname, username, email });
    } catch (err) {
      toast.error(err || "Failed to update profile");
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    if (!addressLine.trim() || !city.trim()) {
      toast.error("Street Address and City are required");
      return;
    }
    setAddingAddress(true);
    try {
      const response = await api.post("/address/add", {
        address: addressLine,
        city,
        state: stateName || null,
        pincode: pincode || null,
        country: country || "India",
      });
      toast.success(response.data.msg || "Address added successfully");
      setAddressLine("");
      setCity("");
      setStateName("");
      setPincode("");
      setCountry("India");
      fetchAddresses();
    } catch (err) {
      toast.error(err || "Failed to add address");
    } finally {
      setAddingAddress(false);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const response = await api.delete(`/address/delete/${addressId}`);
      toast.success(response.data.msg || "Address deleted");
      setAddresses((prev) => prev.filter((addr) => addr.id !== addressId));
    } catch (err) {
      toast.error(err || "Failed to delete address");
    }
  };

  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    try {
      const response = await api.delete("/user/delete-account");
      toast.success(response.data.msg || "Account deleted successfully");
      await logout();
      navigate("/login");
    } catch (err) {
      toast.error(err || "Failed to delete account");
      setDeletingAccount(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-28 pb-16 space-y-12 bg-surface min-h-screen text-primary">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Account Settings
        </h1>
        <p className="text-[10px] text-muted uppercase tracking-widest font-bold mt-1.5">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Navigation Tabs (Sidebar) */}
        <div className="md:col-span-1 bg-card border border-default p-4 flex flex-col gap-1 rounded-2xl">
          <AnimatedButton
            onClick={() => setActiveTab("info")}
            className={`w-full flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer text-left rounded-xl border ${
              activeTab === "info"
                ? "bg-primary  text-secondary border-[var(--color-text-primary)] shadow-lg"
                : "bg-transparent border-transparent text-[var(--color-bg)] hover:bg-[var(--color-hover-white5)]"
            }`}
          >
            <User size={14} />
            My Info
          </AnimatedButton>

          <AnimatedButton
            onClick={() => setActiveTab("addresses")}
            className={`w-full flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer text-left rounded-xl border ${
              activeTab === "addresses"
                ? "bg-primary text-[var(--color-bg)] border-[var(--color-text-primary)] shadow-lg"
                : "bg-transparent border-transparent text-secondary hover:bg-[var(--color-hover-white5)]"
            }`}
          >
            <MapPin size={14} />
            Addresses
          </AnimatedButton>

          <AnimatedButton
            onClick={() => setActiveTab("danger")}
            className={`w-full flex items-center gap-2 px-4 py-3 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer text-left rounded-xl border ${
              activeTab === "danger"
                ? "bg-red-600 text-white border-red-650 shadow-lg"
                : "bg-transparent border-transparent text-red-400 hover:bg-red-500/10 mt-2"
            }`}
          >
            <ShieldAlert size={14} />
            Danger Zone
          </AnimatedButton>
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3 bg-card border border-default p-6 sm:p-8 rounded-2xl shadow-2xl">
          {/* Tab 1: My Info */}
          {activeTab === "info" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  Personal Information
                </h2>
                <p className="text-xs text-secondary">
                  Update your contact details and full name.
                </p>
              </div>

              <form
                onSubmit={handleUpdateProfile}
                className="space-y-4 max-w-lg"
              >
                <FloatingInput
                  id="fullname"
                  label="Full Name *"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />

                <FloatingInput
                  id="username"
                  label="Username *"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <FloatingInput
                  id="email"
                  label="Email Address *"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <AnimatedButton
                  type="submit"
                  disabled={updatingProfile}
                  className="bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-lg shadow-orange-500/10 border border-transparent"
                >
                  <Save size={14} />
                  {updatingProfile ? "Saving..." : "Save Profile"}
                </AnimatedButton>
              </form>
            </div>
          )}

          {/* Tab 2: Addresses */}
          {activeTab === "addresses" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  Saved Addresses
                </h2>
                <p className="text-xs text-secondary">
                  Add and manage your shipping destinations.
                </p>
              </div>

              {loadingAddresses ? (
                <div className="py-10">
                  <Spinner />
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.length > 0 ? (
                    <div
                      ref={addressesRef}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      {addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className="border border-default p-5 flex justify-between items-start bg-surface rounded-xl"
                        >
                          <div className="text-xs space-y-1">
                            <p className="font-semibold text-primary">
                              {addr.address}
                            </p>
                            <p className="text-muted">
                              {addr.city}
                              {addr.state ? `, ${addr.state}` : ""}
                              {addr.pincode ? ` - ${addr.pincode}` : ""}
                            </p>
                            <p className="text-muted font-medium">
                              {addr.country}
                            </p>
                          </div>
                          <AnimatedButton
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="p-2 border border-default hover:border-red-500/30 hover:bg-red-500/10 text-secondary hover:text-red-400 rounded-lg transition-all duration-200 cursor-pointer bg-surface-secondary"
                            title="Delete Address"
                          >
                            <Trash2 size={14} />
                          </AnimatedButton>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-secondary bg-surface-secondary p-6 rounded-xl border border-dashed border-default text-center font-semibold">
                      No addresses saved yet. Add one below.
                    </p>
                  )}
                </div>
              )}

              {/* Add New Address Form */}
              <div className="border-t border-default pt-6 space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                  <Plus size={16} />
                  Add a New Address
                </h3>

                <form
                  onSubmit={handleAddAddress}
                  className="space-y-4 max-w-lg"
                >
                  <FloatingInput
                    id="addressLine"
                    label="Street Address *"
                    required
                    placeholder="e.g. 123 Main St"
                    value={addressLine}
                    onChange={(e) => setAddressLine(e.target.value)}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FloatingInput
                      id="city"
                      label="City *"
                      required
                      placeholder="e.g. Pune"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />

                    <FloatingInput
                      id="stateName"
                      label="State"
                      placeholder="e.g. Maharashtra"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                    />

                    <FloatingInput
                      id="pincode"
                      label="Pincode"
                      placeholder="e.g. 411001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />

                    <FloatingInput
                      id="country"
                      label="Country"
                      placeholder="e.g. India"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    />
                  </div>

                  <AnimatedButton
                    type="submit"
                    disabled={addingAddress}
                    className="bg-[#F23F0C] hover:bg-orange-600 text-white rounded-xl px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-transparent shadow-lg shadow-orange-500/10"
                  >
                    {addingAddress ? "Adding..." : "Add Address"}
                  </AnimatedButton>
                </form>
              </div>
            </div>
          )}

          {/* Tab 3: Danger Zone */}
          {activeTab === "danger" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-1 flex items-center gap-1.5">
                  <ShieldAlert size={18} />
                  Delete Account
                </h2>
                <p className="text-xs text-secondary">
                  Permanently delete your profile and account information. This
                  action is irreversible.
                </p>
              </div>

              <div className="border border-red-900/40 bg-red-950/10 p-4 text-xs text-red-400 leading-relaxed rounded-xl">
                <strong>Warning:</strong> Deleting your account will remove your
                address lists, wishlists, and cart items. Your past orders
                records will no longer associate with your profile.
              </div>

              {!confirmDelete ? (
                <AnimatedButton
                  onClick={() => setConfirmDelete(true)}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-6 py-3.5 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Delete My Account
                </AnimatedButton>
              ) : (
                <div className="space-y-4 pt-2">
                  <p className="text-xs font-bold text-primary">
                    Are you absolutely sure you want to delete your account?
                  </p>
                  <div className="flex gap-2">
                    <AnimatedButton
                      onClick={() => setConfirmDelete(false)}
                      className="px-5 py-2.5 border border-default text-secondary hover:text-primary rounded-xl text-xs font-bold cursor-pointer bg-surface-secondary"
                    >
                      No, Keep It
                    </AnimatedButton>
                    <AnimatedButton
                      onClick={handleDeleteAccount}
                      disabled={deletingAccount}
                      className="px-5 py-2.5 bg-red-650 hover:bg-red-750 text-white rounded-xl text-xs font-bold cursor-pointer disabled:opacity-50"
                    >
                      {deletingAccount
                        ? "Deleting..."
                        : "Yes, Delete Permanently"}
                    </AnimatedButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
