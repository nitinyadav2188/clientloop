import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SetupProfile() {
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.displayName || '');
  const [industry, setIndustry] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        id: user.uid,
        email: user.email || '',
        name: name,
        avatar: user.photoURL || '',
        plan: 'free',
        industry: industry,
        currency: currency,
      });

      await refreshProfile();
      navigate('/app');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl">
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">Create Profile</h1>
        <p className="text-muted-foreground font-medium mb-8">Set up your workspace profile to get started.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input 
              id="name"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="John Doe"
              className="h-12 border-2 border-border focus:border-primary focus:ring-0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry / Profession</Label>
            <Input 
              id="industry"
              value={industry} 
              onChange={(e) => setIndustry(e.target.value)} 
              placeholder="e.g. Web Development, Design, Consulting"
              className="h-12 border-2 border-border focus:border-primary focus:ring-0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Primary Currency</Label>
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="flex w-full h-12 rounded-md border-2 border-border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:border-primary focus-visible:ring-0"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
              <option value="AUD">AUD ($)</option>
              <option value="CAD">CAD ($)</option>
            </select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-bold" 
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? 'Creating...' : 'Continue to Dashboard'}
          </Button>
        </form>
      </div>
    </div>
  );
}
