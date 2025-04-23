// components/PinModal.tsx
"use client";

import React, { useState } from 'react';
import Security from '../components/PinModal';

import { Eye, EyeOff } from 'lucide-react';

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'confirm' | 'create';
  onSubmit: (pin: string) => void;
}

const PinModal: React.FC<PinModalProps> = ({ isOpen, onClose, type, onSubmit }) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(pin);
    setPin('');
  };

  const togglePinVisibility = () => {
    setShowPin(!showPin);
  };

  const modalTitle = type === 'confirm' ? 'Enter your six-digit PIN' : 'Confirm your six-digit PIN';
  const buttonText = type === 'confirm' ? 'Confirm PIN' : 'Create PIN';
  const headerText = type === 'confirm' ? 'Confirm PIN' : 'Create PIN';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-75 p-5 w-full h-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <h2 className="text-gray-400 text-sm mb-2">{headerText}</h2>
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-center text-lg font-medium mb-4">{modalTitle}</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter Password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={togglePinVisibility}
                  >
                    {showPin ? (
                      <EyeOff size={20} className="text-gray-400" />
                    ) : (
                      <Eye size={20} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-900"
              >
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinModal;