import { v4 as uuidv4 } from 'uuid';
import { Lead, Proposal, Client, User, FollowUp } from '../types';

const INITIAL_USER: User = {
  id: 'user-1',
  email: 'nitin@example.com',
  name: 'Nitin Yadav',
  plan: 'free',
};

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rahul Sharma',
    company: 'TechCorp',
    email: 'rahul@techcorp.in',
    source: 'linkedin',
    project: 'Website Redesign',
    estimated_value: 45000,
    stage: 'proposal',
    temperature: 'hot',
    last_contact_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    next_follow_up_at: new Date().toISOString(),
    status: 'active',
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead-2',
    name: 'Sarah Jenkins',
    source: 'whatsapp',
    project: 'Mobile App UI',
    estimated_value: 80000,
    stage: 'contacted',
    temperature: 'warm',
    last_contact_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    next_follow_up_at: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active',
    created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

class Store {
  getUser(): User {
    const user = localStorage.getItem('clientloop_user');
    return user ? JSON.parse(user) : INITIAL_USER;
  }
  
  setUser(user: User) {
    localStorage.setItem('clientloop_user', JSON.stringify(user));
  }

  getLeads(): Lead[] {
    const leads = localStorage.getItem('clientloop_leads');
    if (!leads) {
      localStorage.setItem('clientloop_leads', JSON.stringify(MOCK_LEADS));
      return MOCK_LEADS;
    }
    return JSON.parse(leads);
  }

  saveLead(lead: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Lead {
    const leads = this.getLeads();
    const newLead: Lead = {
      ...lead,
      id: uuidv4(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    leads.push(newLead);
    localStorage.setItem('clientloop_leads', JSON.stringify(leads));
    return newLead;
  }

  updateLead(id: string, updates: Partial<Lead>): Lead {
    const leads = this.getLeads();
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Lead not found');
    
    leads[index] = { ...leads[index], ...updates, updated_at: new Date().toISOString() };
    localStorage.setItem('clientloop_leads', JSON.stringify(leads));
    return leads[index];
  }
  
  deleteLead(id: string) {
    const leads = this.getLeads();
    const filtered = leads.filter(l => l.id !== id);
    localStorage.setItem('clientloop_leads', JSON.stringify(filtered));
  }

  getFollowUps(): FollowUp[] {
    const follows = localStorage.getItem('clientloop_followups');
    return follows ? JSON.parse(follows) : [];
  }
}

export const store = new Store();
