import React, { useState, useEffect } from 'react';
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

const EditPlanModal = ({ open, onClose, onSubmit, plan }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    subcontent: '',
    features: ['']
  });

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        price: plan.price,
        subcontent: plan.subcontent,
        features: plan.features
      });
    }
  }, [plan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...formData.features, ''] });
  };

  const removeFeature = (index) => {
    const newFeatures = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: newFeatures });
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-black border border-white/20">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-2xl text-white">Edit Plan</DialogTitle>
          <DialogDescription className="text-gray-400 text-sm">
            Make changes to the plan details below.
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
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
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
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="col-span-3 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
              />
            </div>

            {/* Description Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subcontent" className="text-right text-white">
                Description
              </Label>
              <Input
                id="subcontent"
                value={formData.subcontent}
                onChange={(e) => setFormData({ ...formData, subcontent: e.target.value })}
                className="col-span-3 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
              />
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right text-white pt-2">
                Features
              </Label>
              <div className="col-span-3 space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Feature ${index + 1}`}
                      className="flex-1 bg-black border-white/20 text-white h-11 focus:border-white/40 focus:ring-0"
                    />
                    {formData.features.length > 1 && (
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
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPlanModal;