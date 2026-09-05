import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, query, onSnapshot, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Lead } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { v4 as uuidv4 } from 'uuid';

export function useLeads() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLeads([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'leads'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Lead);
      setLeads(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/leads`);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addLead = async (leadData: Omit<Lead, 'id' | 'userId' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Not authenticated');
    
    const id = uuidv4();
    const newLead: Lead = {
      ...leadData,
      id,
      userId: user.uid,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'users', user.uid, 'leads', id), newLead as any);
      return newLead;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/leads/${id}`);
    }
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    if (!user) throw new Error('Not authenticated');
    
    try {
      const leadRef = doc(db, 'users', user.uid, 'leads', id);
      await updateDoc(leadRef, {
        ...updates,
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}/leads/${id}`);
    }
  };

  const deleteLead = async (id: string) => {
    if (!user) throw new Error('Not authenticated');
    
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'leads', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/leads/${id}`);
    }
  };

  return { leads, loading, addLead, updateLead, deleteLead };
}
