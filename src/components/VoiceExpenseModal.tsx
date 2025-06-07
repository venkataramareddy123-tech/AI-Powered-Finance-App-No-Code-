
import React, { useState, useEffect } from 'react';
import { X, Mic, MicOff, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface VoiceExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VoiceExpenseModal: React.FC<VoiceExpenseModalProps> = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');

  const startListening = () => {
    setIsListening(true);
    setTranscript('Listening...');
    
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript('Adding ₹250 to Food');
      setIsListening(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setResult('Added ₹250 to Food – Done! 🎉');
        setIsProcessing(false);
      }, 1500);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
    setTranscript('');
  };

  const confirmExpense = () => {
    // Add the expense logic here
    console.log('Voice expense confirmed');
    onClose();
    setTranscript('');
    setResult('');
    setIsProcessing(false);
  };

  const resetModal = () => {
    setTranscript('');
    setResult('');
    setIsProcessing(false);
    setIsListening(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-purple-500/20 max-w-md mx-auto animate-slide-up">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center justify-between">
            Voice Expense Entry
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Voice Visualization */}
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse scale-110' 
                : 'bg-white/10 border-2 border-white/20'
            }`}>
              {isListening ? (
                <div className="flex space-x-1">
                  <div className="w-2 h-8 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-10 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-6 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
            </div>

            {/* Transcript */}
            {transcript && (
              <div className="bg-white/10 p-4 rounded-lg border border-white/20 w-full text-center animate-fade-in">
                <p className="text-white font-medium">{transcript}</p>
              </div>
            )}

            {/* Processing */}
            {isProcessing && (
              <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 w-full text-center animate-fade-in">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="text-primary font-medium ml-2">Processing...</span>
                </div>
              </div>
            )}

            {/* Result */}
            {result && (
              <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20 w-full text-center animate-fade-in">
                <p className="text-emerald-400 font-medium">{result}</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          {!transcript && !result && (
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">Tap the mic and say something like:</p>
              <div className="space-y-1">
                <p className="text-primary text-sm">"Add 250 rupees to food"</p>
                <p className="text-primary text-sm">"Spent 50 on coffee"</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!isListening && !result && (
              <Button
                onClick={startListening}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 rounded-xl"
              >
                <Mic className="w-5 h-5 mr-2" />
                Start Listening
              </Button>
            )}

            {isListening && (
              <Button
                onClick={stopListening}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl"
              >
                <MicOff className="w-5 h-5 mr-2" />
                Stop
              </Button>
            )}

            {result && (
              <>
                <Button
                  onClick={confirmExpense}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl"
                >
                  <Check className="w-5 h-5 mr-2" />
                  Confirm
                </Button>
                <Button
                  onClick={resetModal}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 py-3 rounded-xl"
                >
                  Try Again
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VoiceExpenseModal;
