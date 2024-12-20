import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Trash2, Plus } from "lucide-react";

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

  const removeFeature = (index) => {
    const newFeatures = planData.features.filter((_, i) => i !== index);
    setPlanData({ ...planData, features: newFeatures });
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
      <DialogContent className="sm:max-w-[600px] bg-black border border-white/20">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl text-white">Add New Plan</DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Fill in the details for your new plan below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-5">
            {/* Name Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right text-white">
                Name
              </Label>
              <Input
                id="name"
                value={planData.name}
                onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
                className="col-span-3 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
                required
              />
            </div>

            {/* Price Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right text-white">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={planData.price}
                onChange={(e) => setPlanData({ ...planData, price: e.target.value })}
                className="col-span-3 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
                required
              />
            </div>

            {/* Description Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subcontent" className="text-right text-white">
                Description
              </Label>
              <Input
                id="subcontent"
                value={planData.subcontent}
                onChange={(e) => setPlanData({ ...planData, subcontent: e.target.value })}
                className="col-span-3 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
                required
              />
            </div>

            {/* Users Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="users" className="text-right text-white">
                Users
              </Label>
              <Input
                id="users"
                value={planData.users}
                onChange={(e) => setPlanData({ ...planData, users: e.target.value })}
                className="col-span-3 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
                placeholder="Number of Users"
                required
              />
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right text-white pt-2">
                Features
              </Label>
              <div className="col-span-3 space-y-3">
                {planData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
                      required={index === 0}
                    />
                    {planData.features.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removeFeature(index)}
                        className="h-11 w-11 border-white/20 hover:bg-white/10"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addFeature}
                  className="w-full h-11 bg-black hover:bg-white/10 text-white border border-white/20 mt-2"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6">
            <Button 
              type="submit"
              className="w-full sm:w-auto bg-white hover:bg-gray-100 text-black h-11 px-8"
            >
              Add Plan
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPlanModal;