
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Plus, 
  Edit2, 
  Trash2,
  Save,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PaymentCard {
  id: string;
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cardType: string;
}

const PaymentCards: React.FC = () => {
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cardType: 'Visa'
  });

  const handleAddCard = () => {
    if (!newCard.cardNumber || !newCard.cardHolderName || !newCard.expiryDate) {
      toast({
        title: "Missing information",
        description: "Please fill in all card details",
        variant: "destructive"
      });
      return;
    }

    const card: PaymentCard = {
      id: Date.now().toString(),
      ...newCard
    };

    setCards([...cards, card]);
    setNewCard({
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      cardType: 'Visa'
    });
    setIsAddingCard(false);
    
    toast({
      title: "Card added successfully",
      description: "Your payment card has been added"
    });
  };

  const handleDeleteCard = (cardId: string) => {
    setCards(cards.filter(card => card.id !== cardId));
    toast({
      title: "Card removed",
      description: "Payment card has been removed"
    });
  };

  const maskCardNumber = (cardNumber: string) => {
    return `**** **** **** ${cardNumber.slice(-4)}`;
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Payment Cards
          </CardTitle>
          {!isAddingCard && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddingCard(true)}
              className="border-emerald-400/20 text-emerald-400 hover:bg-emerald-400/10"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Card
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Card Form */}
        {isAddingCard && (
          <div className="bg-white/5 p-4 rounded-lg border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white font-medium">Add New Card</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAddingCard(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="cardNumber" className="text-white">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={newCard.cardNumber}
                  onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                  className="bg-slate-800 border-white/20 text-white placeholder:text-gray-400 focus:border-primary"
                />
              </div>
              
              <div>
                <Label htmlFor="cardHolderName" className="text-white">Card Holder Name</Label>
                <Input
                  id="cardHolderName"
                  value={newCard.cardHolderName}
                  onChange={(e) => setNewCard(prev => ({ ...prev, cardHolderName: e.target.value }))}
                  placeholder="John Doe"
                  className="bg-slate-800 border-white/20 text-white placeholder:text-gray-400 focus:border-primary"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-white">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: e.target.value }))}
                    placeholder="MM/YY"
                    className="bg-slate-800 border-white/20 text-white placeholder:text-gray-400 focus:border-primary"
                  />
                </div>
                
                <div>
                  <Label htmlFor="cardType" className="text-white">Card Type</Label>
                  <select
                    id="cardType"
                    value={newCard.cardType}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cardType: e.target.value }))}
                    className="w-full bg-slate-800 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Visa" className="bg-slate-800 text-white">Visa</option>
                    <option value="Mastercard" className="bg-slate-800 text-white">Mastercard</option>
                    <option value="American Express" className="bg-slate-800 text-white">American Express</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleAddCard}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <Save className="w-4 h-4 mr-1" />
                Add Card
              </Button>
            </div>
          </div>
        )}

        {/* Existing Cards */}
        {cards.length === 0 && !isAddingCard ? (
          <div className="text-center py-8">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400">No payment cards added yet</p>
            <Button
              variant="outline"
              onClick={() => setIsAddingCard(true)}
              className="mt-4 border-white/20 text-white hover:bg-white/10"
            >
              Add Your First Card
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {cards.map((card) => (
              <div key={card.id} className="bg-white/5 p-4 rounded-lg border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{card.cardType}</p>
                      <p className="text-gray-400 text-sm">{maskCardNumber(card.cardNumber)}</p>
                      <p className="text-gray-400 text-xs">{card.cardHolderName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingCardId(card.id)}
                      className="text-gray-400 hover:text-white"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentCards;
