import { useState, useEffect } from 'react';
import { db, handleFirestoreError, OperationType } from '@/lib/firebase';
import { collection, query, onSnapshot, setDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Client } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export function useClients() {
  const { user } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setClients([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'users', user.uid, 'clients'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data() as Client);
      setClients(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/clients`);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  const addClient = async (clientData: Omit<Client, 'id' | 'userId' | 'created_at'>) => {
    if (!user) return;
    try {
      const ref = doc(collection(db, 'users', user.uid, 'clients'));
      const newClient: Client = {
        ...clientData,
        id: ref.id,
        userId: user.uid,
        created_at: new Date().toISOString()
      };
      await setDoc(ref, newClient);
      return ref.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `users/${user.uid}/clients`);
      throw error;
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    if (!user) return;
    try {
      const ref = doc(db, 'users', user.uid, 'clients', id);
      await updateDoc(ref, updates);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}/clients/${id}`);
      throw error;
    }
  };

  const deleteClient = async (id: string) => {
    if (!user) return;
    try {
      const ref = doc(db, 'users', user.uid, 'clients', id);
      await deleteDoc(ref);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/clients/${id}`);
      throw error;
    }
  };

  return { clients, loading, addClient, updateClient, deleteClient };
}
