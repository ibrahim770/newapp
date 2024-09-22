import React, { useState, useEffect } from 'react';

interface Resume {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  education: string;
}

interface ShortlistCriteria {
  keywords: string[];
  experienceYears: number;
  skills: string[];
  education: string;
}

const initialResumes: Resume[] = [];
const initialCriteria: ShortlistCriteria = {
  keywords: [],
  experienceYears: 0,
  skills: [],
  education: '',
};

const AppShortlister = () => {
  const [resumes, setResumes] = useState(initialResumes);
  const [criteria, setCriteria] = useState(initialCriteria);
  const [newResume, setNewResume] = useState({
    name: '',
    skills: '',
    experience: 0,
    education: '',
  });
  const [shortlistedResumes, setShortlistedResumes] = useState(initialResumes);
  const [displayShortlisted, setDisplayShortlisted] = useState(false);

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const resumeText = reader.result as string;
        const resume: Resume = {
          id: '1',
          name: newResume.name,
          skills: newResume.skills.split(','),
          experience: newResume.experience,
          education: newResume.education,
        };
        setResumes([...resumes, resume]);
      };
      reader.readAsText(file);
    }
  };

  const handleCriteriaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCriteria({ ...criteria, [name]: value });
  };

  const handleShortlist = () => {
    const shortlisted = resumes.filter((resume) => {
      const skillsMatch = resume.skills.some((skill) => criteria.skills.includes(skill));
      const experienceMatch = resume.experience >= criteria.experienceYears;
      const educationMatch = resume.education === criteria.education;
      return skillsMatch && experienceMatch && educationMatch;
    });
    setShortlistedResumes(shortlisted);
    setDisplayShortlisted(true);
  };

  const handleClear = () => {
    setResumes(initialResumes);
    setCriteria(initialCriteria);
    setNewResume({
      name: '',
      skills: '',
      experience: 0,
      education: '',
    });
    setShortlistedResumes(initialResumes);
    setDisplayShortlisted(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">App Shortlister</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Upload Resume</h2>
        <input
          type="file"
          accept=".pdf, .docx"
          onChange={handleResumeUpload}
          className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={newResume.name}
            onChange={(e) => setNewResume({ ...newResume, name: e.target.value })}
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <input
            type="text"
            value={newResume.skills}
            onChange={(e) => setNewResume({ ...newResume, skills: e.target.value })}
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700">Experience</label>
          <input
            type="number"
            value={newResume.experience}
            onChange={(e) => setNewResume({ ...newResume, experience: parseInt(e.target.value, 10) })}
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <label className="block text-sm font-medium text-gray-700">Education</label>
          <input
            type="text"
            value={newResume.education}
            onChange={(e) => setNewResume({ ...newResume, education: e.target.value })}
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Shortlist Criteria</h2>
        <label className="block text-sm font-medium text-gray-700">Keywords</label>
        <input
          type="text"
          value={criteria.keywords.join(',')}
          onChange={(e) => setCriteria({ ...criteria, keywords: e.target.value.split(',') })}
          className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <label className="block text-sm font-medium text-gray-700">Experience Years</label>
        <input
          type="number"
          value={criteria.experienceYears}
          onChange={(e) => setCriteria({ ...criteria, experienceYears: parseInt(e.target.value, 10) })}
          className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <input
          type="text"
          value={criteria.skills.join(',')}
          onChange={(e) => setCriteria({ ...criteria, skills: e.target.value.split(',') })}
          className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
        <label className="block text-sm font-medium text-gray-700">Education</label>
        <input
          type="text"
          value={criteria.education}
          onChange={(e) => setCriteria({ ...criteria, education: e.target.value })}
          className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        onClick={handleShortlist}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Shortlist
      </button>
      <button
        onClick={handleClear}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Clear
      </button>
      {displayShortlisted && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-2">Shortlisted Resumes</h2>
          <ul>
            {shortlistedResumes.map((resume) => (
              <li key={resume.id}>
                <p>
                  <strong>{resume.name}</strong>
                </p>
                <p>Skills: {resume.skills.join(',')}</p>
                <p>Experience: {resume.experience} years</p>
                <p>Education: {resume.education}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AppShortlister;
