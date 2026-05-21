import { supabase, isSupabaseConfigured } from './supabaseClient';
import { MOCK_USERS, INITIAL_CASES, INITIAL_HEARINGS, INITIAL_DOCS } from '../data/mockData';

// Helper to initialize localStorage for offline fallback mode
const getLocalStorageData = (key, defaultData) => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(data);
};

const setLocalStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const dbService = {
  // Check if using Supabase
  isOnline: () => isSupabaseConfigured,

  // Users
  getUsers: async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('users').select('*');
      if (!error && data && data.length > 0) return data;
      console.warn('Supabase users fetch failed or empty, falling back to Mock:', error ? error.message : 'No users');
    }
    return getLocalStorageData('justiflow_users', MOCK_USERS);
  },

  // Cases
  getCases: async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('cases').select('*').order('filingDate', { ascending: false });
      if (!error && data && data.length > 0) return data;
      console.warn('Supabase cases fetch failed or empty, falling back to LocalStorage:', error ? error.message : 'No cases');
    }
    return getLocalStorageData('justiflow_cases', INITIAL_CASES);
  },

  createCase: async (newCase) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('cases').insert([newCase]).select();
      if (!error) return data[0];
      console.warn('Supabase case insertion failed, using LocalStorage:', error.message);
    }
    const currentCases = getLocalStorageData('justiflow_cases', INITIAL_CASES);
    const updated = [newCase, ...currentCases];
    setLocalStorageData('justiflow_cases', updated);
    return newCase;
  },

  updateCase: async (caseId, updates) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('cases').update(updates).eq('id', caseId).select();
      if (!error) return data[0];
      console.warn('Supabase case update failed, using LocalStorage:', error.message);
    }
    const currentCases = getLocalStorageData('justiflow_cases', INITIAL_CASES);
    const updated = currentCases.map(c => (c.id === caseId ? { ...c, ...updates } : c));
    setLocalStorageData('justiflow_cases', updated);
    return updated.find(c => c.id === caseId);
  },

  // Hearings
  getHearings: async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('hearings').select('*');
      if (!error && data && data.length > 0) return data;
      console.warn('Supabase hearings fetch failed or empty, using LocalStorage:', error ? error.message : 'No hearings');
    }
    return getLocalStorageData('justiflow_hearings', INITIAL_HEARINGS);
  },

  createHearing: async (newHearing) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('hearings').insert([newHearing]).select();
      if (!error) return data[0];
      console.warn('Supabase hearing insertion failed, using LocalStorage:', error.message);
    }
    const currentHearings = getLocalStorageData('justiflow_hearings', INITIAL_HEARINGS);
    const updated = [...currentHearings, newHearing];
    setLocalStorageData('justiflow_hearings', updated);
    return newHearing;
  },

  // Documents
  getDocuments: async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('documents').select('*');
      if (!error && data && data.length > 0) return data;
      console.warn('Supabase documents fetch failed or empty, using LocalStorage:', error ? error.message : 'No documents');
    }
    return getLocalStorageData('justiflow_documents', INITIAL_DOCS);
  },

  createDocument: async (newDoc) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('documents').insert([newDoc]).select();
      if (!error) return data[0];
      console.warn('Supabase document insertion failed, using LocalStorage:', error.message);
    }
    const currentDocs = getLocalStorageData('justiflow_documents', INITIAL_DOCS);
    const updated = [newDoc, ...currentDocs];
    setLocalStorageData('justiflow_documents', updated);
    return newDoc;
  },

  // Utility to seed local data into Supabase
  seedSupabase: async () => {
    if (!isSupabaseConfigured) return { success: false, message: 'Supabase is not configured yet.' };

    try {
      // 1. Seed users
      const { error: userErr } = await supabase.from('users').upsert(MOCK_USERS);
      if (userErr) throw new Error('Seeding users failed: ' + userErr.message);

      // 2. Seed cases
      const { error: caseErr } = await supabase.from('cases').upsert(INITIAL_CASES);
      if (caseErr) throw new Error('Seeding cases failed: ' + caseErr.message);

      // 3. Seed hearings
      const { error: hearingErr } = await supabase.from('hearings').upsert(INITIAL_HEARINGS);
      if (hearingErr) throw new Error('Seeding hearings failed: ' + hearingErr.message);

      // 4. Seed docs
      const { error: docErr } = await supabase.from('documents').upsert(INITIAL_DOCS);
      if (docErr) throw new Error('Seeding documents failed: ' + docErr.message);

      return { success: true, message: 'Successfully seeded demo tables in Supabase!' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
};
