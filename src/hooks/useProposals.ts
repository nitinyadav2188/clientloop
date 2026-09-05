import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, query, onSnapshot, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Proposal } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export function useProposals() {
  const { user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProposals([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'proposals'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Proposal);
      setProposals(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/proposals`);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addProposal = async (proposalData: Omit<Proposal, 'id' | 'userId' | 'created_at'>) => {
    if (!user) return;
    try {
      const ref = doc(collection(db, 'users', user.uid, 'proposals'));
      const newProposal: Proposal = {
        ...proposalData,
        id: ref.id,
        userId: user.uid,
        created_at: new Date().toISOString()
      };
      await setDoc(ref, newProposal);
      return ref.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/proposals`);
      throw error;
    }
  };

  const updateProposal = async (id: string, updates: Partial<Proposal>) => {
    if (!user) return;
    try {
      const ref = doc(db, 'users', user.uid, 'proposals', id);
      await updateDoc(ref, updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}/proposals/${id}`);
      throw error;
    }
  };

  const deleteProposal = async (id: string) => {
    if (!user) return;
    try {
      const ref = doc(db, 'users', user.uid, 'proposals', id);
      await deleteDoc(ref);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/proposals/${id}`);
      throw error;
    }
  };

  return { proposals, loading, addProposal, updateProposal, deleteProposal };
}
