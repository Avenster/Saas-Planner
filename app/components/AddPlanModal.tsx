import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent } from "./ui/dialog";

const AddPlanModal = ({ open, onClose, onSubmit }) => {
  const [planData, setPlanData] = useState({
    name: '',
    price: '',
    subcontent: '',
    users: '',
    features: ['']
  });

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...planData.features];
    newFeatures[index] = value;
    setPlanData({ ...planData, features: newFeatures });
  };

  const addFeature = () => {
    setPlanData({ ...planData, features: [...planData.features, ''] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:8000/api/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: planData.name.toUpperCase(),
          price: parseFloat(planData.price) || 0,
          subcontent: planData.subcontent,
          users: planData.users,
          features: planData.features.filter(feature => feature.trim() !== '')
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save plan');
      }

      const result = await response.json();
      if (result.success) {
        onSubmit(planData);
        setPlanData({
          name: '',
          price: '',
          subcontent: '',
          users: '',
          features: ['']
        });
        onClose();
        alert('Plan added successfully!');
      } else {
        throw new Error(result.error || 'Failed to save plan');
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      alert('Failed to save plan. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black border border-white/10 p-6 rounded-3xl max-w-md">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-white">Add New Plan</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={planData.name}
            onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
            className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
            placeholder="Name"
            required
          />

          <input
            type="number"
            value={planData.price}
            onChange={(e) => setPlanData({ ...planData, price: e.target.value })}
            className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
            placeholder="Price"
            required
          />

          <input
            type="text"
            value={planData.subcontent}
            onChange={(e) => setPlanData({ ...planData, subcontent: e.target.value })}
            className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
            placeholder="Subcontent"
            required
          />

          <input
            type="text"
            value={planData.users}
            onChange={(e) => setPlanData({ ...planData, users: e.target.value })}
            className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
            placeholder="Number of Users"
            required
          />

          {planData.features.map((feature, index) => (
            <input
              key={index}
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="w-full bg-transparent border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white/20"
              placeholder="Enter feature"
              required={index === 0}  // Make at least one feature required
            />
          ))}

          <button
            type="button"
            onClick={addFeature}
            className="w-full text-gray-400 border border-white/10 rounded-xl px-4 py-3 hover:text-white hover:border-white/20"
          >
            Add Feature
          </button>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-white hover:bg-gray-100 text-black font-medium px-8 py-2 rounded-xl transition-colors duration-200"
            >
              Add Plan
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlanModal;