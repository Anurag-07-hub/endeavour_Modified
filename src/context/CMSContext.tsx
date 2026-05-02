import React, { createContext, useContext, useState, useEffect } from 'react';
import { teamMembers as initialTeamMembers } from '../data/team';
import { defaultContact } from '../data/contact';
import { defaultDocuments } from '../data/documents';

export interface Member {
  id: string;
  name: string;
  position: string;
  image?: string;
  linkedin?: string;
  email?: string;
}

export interface TeamCategory {
  category?: string;
  members?: Member[];
  // For the faculty advisor which is just a member object at the top level
  id?: string;
  name?: string;
  position?: string;
  image?: string;
  linkedin?: string;
}

export interface DeletedMember {
  category: string;
  member: Member;
  deletedAt: number;
  originalIndex: number;
}

export interface DocumentInfo {
  id: string;
  title: string;
  description: string;
  driveLink: string;
  isPublic: boolean;
}

export interface ContactPerson {
  name: string;
  phone: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  contacts?: ContactPerson[];
}

interface CMSContextType {
  team: TeamCategory[];
  setTeam: React.Dispatch<React.SetStateAction<TeamCategory[]>>;
  documents: DocumentInfo[];
  setDocuments: React.Dispatch<React.SetStateAction<DocumentInfo[]>>;
  contactInfo: ContactInfo;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInfo>>;
  deletedMembers: DeletedMember[];
  setDeletedMembers: React.Dispatch<React.SetStateAction<DeletedMember[]>>;
  saveTeam: (newTeam: TeamCategory[]) => void;
  saveDocuments: (newDocs: DocumentInfo[]) => void;
  saveContactInfo: (newContact: ContactInfo) => void;
  saveDeletedMembers: (newDeleted: DeletedMember[]) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

// Helper to add IDs to initial static data
const generateId = () => Math.random().toString(36).substr(2, 9);

const initializeTeam = (data: any[]): TeamCategory[] => {
  return data.map(group => {
    if (group.members) {
      return {
        ...group,
        members: group.members.map((m: any) => ({ ...m, id: m.id || generateId() }))
      };
    }
    return { ...group, id: group.id || generateId() };
  });
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [team, setTeamState] = useState<TeamCategory[]>([]);
  const [documents, setDocumentsState] = useState<DocumentInfo[]>(defaultDocuments);
  const [contactInfo, setContactInfoState] = useState<ContactInfo>(defaultContact);
  const [deletedMembers, setDeletedMembersState] = useState<DeletedMember[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedTeam = localStorage.getItem('endeavour_team');
    if (storedTeam) {
      try {
        setTeamState(JSON.parse(storedTeam));
      } catch (e) {
        console.error("Failed to parse team", e);
        setTeamState(initializeTeam(initialTeamMembers));
      }
    } else {
      setTeamState(initializeTeam(initialTeamMembers));
    }

    const storedDocs = localStorage.getItem('endeavour_docs');
    if (storedDocs) {
      try {
        setDocumentsState(JSON.parse(storedDocs));
      } catch (e) {}
    }

    const storedContact = localStorage.getItem('endeavour_contact');
    if (storedContact) {
      try {
        setContactInfoState(JSON.parse(storedContact));
      } catch (e) {}
    }

    const storedDeleted = localStorage.getItem('endeavour_deleted_members');
    if (storedDeleted) {
      try {
        setDeletedMembersState(JSON.parse(storedDeleted));
      } catch (e) {}
    }

    setIsLoaded(true);
  }, []);

  const saveTeam = (newTeam: TeamCategory[]) => {
    setTeamState(newTeam);
    localStorage.setItem('endeavour_team', JSON.stringify(newTeam));
  };

  const saveDocuments = (newDocs: DocumentInfo[]) => {
    setDocumentsState(newDocs);
    localStorage.setItem('endeavour_docs', JSON.stringify(newDocs));
  };

  const saveContactInfo = (newContact: ContactInfo) => {
    setContactInfoState(newContact);
    localStorage.setItem('endeavour_contact', JSON.stringify(newContact));
  };

  const saveDeletedMembers = (newDeleted: DeletedMember[]) => {
    setDeletedMembersState(newDeleted);
    localStorage.setItem('endeavour_deleted_members', JSON.stringify(newDeleted));
  };

  if (!isLoaded) return null;

  return (
    <CMSContext.Provider
      value={{
        team,
        setTeam: setTeamState,
        documents,
        setDocuments: setDocumentsState,
        contactInfo,
        setContactInfo: setContactInfoState,
        deletedMembers,
        setDeletedMembers: setDeletedMembersState,
        saveTeam,
        saveDocuments,
        saveContactInfo,
        saveDeletedMembers,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
