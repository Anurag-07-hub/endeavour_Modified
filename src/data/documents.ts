import type { DocumentInfo } from '../context/CMSContext';

export const defaultDocuments: DocumentInfo[] = [
  {
    id: 'resume-template',
    title: 'Resume Template',
    description: 'The official resume template for Endeavour applications.',
    driveLink: '/assets/Resume-template.docx',
    isPublic: true
  },
  {
    id: 'assessment-2025',
    title: 'Assessment 2025',
    description: 'Problem statements and evaluation guidelines for the 2025 recruitment cycle.',
    driveLink: '/assets/ENDEAVOUR ASSESSMENT 2025.pdf',
    isPublic: true
  },
  {
    id: 'syllabus-2024',
    title: 'Syllabus 2024',
    description: 'Syllabus and study materials covering basic mechanics, programming, and electronics.',
    driveLink: '/assets/ENDEAVOUR SYLLABUS 2024.pdf',
    isPublic: true
  }
];
