export type LeadSource = 'whatsapp' | 'linkedin' | 'instagram' | 'email' | 'upwork' | 'referral' | 'website' | 'other';
export type LeadTemperature = 'hot' | 'warm' | 'cold';
export type LeadStage = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
export type ProposalStatus = 'draft' | 'sent' | 'viewed' | 'accepted' | 'rejected';
export type Plan = 'free' | 'pro' | 'business';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  plan: Plan;
}

export interface Lead {
  id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  source: LeadSource;
  project: string;
  description?: string;
  estimated_value: number;
  stage: LeadStage;
  temperature: LeadTemperature;
  last_contact_at: string;
  next_follow_up_at: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Proposal {
  id: string;
  client_id: string; // lead id or client id
  project: string;
  amount: number;
  status: ProposalStatus;
  sent_date?: string;
  expiration_date?: string;
  created_at: string;
}

export interface Client {
  id: string;
  lead_id: string;
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  total_revenue: number;
  created_at: string;
}

export interface FollowUp {
  id: string;
  lead_id: string;
  action: string;
  due_date: string;
  status: 'pending' | 'completed' | 'snoozed';
}
