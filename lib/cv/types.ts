export interface CvExperience {
  title: string
  organization: string
  period: string
  description: string
}

export interface CvEducation {
  qualification: string
  institution: string
  year: string
}

export interface CvContext {
  fullName: string
  title: string
  addressLine1: string
  addressLine2: string
  district: string
  pinCode: string
  phone: string
  email: string
  summary: string
  education: CvEducation[]
  experience: CvExperience[]
  skills: string[]
  languages: string[]
}

export interface CvData {
  fullName?: string
  title?: string
  addressLine1?: string
  addressLine2?: string
  district?: string
  pinCode?: string
  phone?: string
  email?: string
  summary?: string
  education?: CvEducation[]
  experience?: CvExperience[]
  skills?: string[]
  languages?: string[]
}

export function extractCvContext(data: CvData): CvContext {
  return {
    fullName: data.fullName || 'Raihana Ummar',
    title: data.title || 'Online Madrasa Teacher',
    addressLine1: data.addressLine1 || 'Kurungottu Thodi (H)',
    addressLine2: data.addressLine2 || 'Elanad P.O.',
    district: data.district || 'Thrissur District, Kerala',
    pinCode: data.pinCode || '680586',
    phone: data.phone || '',
    email: data.email || '',
    summary:
      data.summary ||
      'Dedicated and compassionate educator with 5 years of online teaching experience in Madrasa subjects. Skilled in teaching Fiqh, Quran, Arabic, and Malayalam to students up to 10th standard. Known for structured lesson delivery, patient guidance, and creating a supportive learning environment that helps students grow in both knowledge and character.',
    education: data.education?.length
      ? data.education
      : [
          {
            qualification: 'Higher Secondary (+2)',
            institution: 'Kerala State Board',
            year: '',
          },
          {
            qualification: 'Madrasa 10th Standard',
            institution: 'Madrasa Education Board',
            year: '',
          },
        ],
    experience: data.experience?.length
      ? data.experience
      : [
          {
            title: 'Online Madrasa Teacher',
            organization: 'Private Online Classes',
            period: '5 Years',
            description:
              'Have 5 years of experience teaching Madrasa subjects online for students up to 10th standard. Specialize in Fiqh, Quran, Arabic, and Malayalam instruction through virtual classes. Prepare lesson plans, explain religious concepts clearly, assess student understanding, provide homework guidance, and support steady academic and spiritual development through regular parent communication.',
          },
        ],
    skills: data.skills?.length
      ? data.skills
      : [
          'Madrasa Subject Teaching (up to 10th Standard)',
          'Arabic Language Instruction & Grammar',
          'Malayalam Language Instruction',
          'Quranic Studies & Tajweed Basics',
          'Hadith & Islamic Studies',
          'Fiqh & Islamic Moral Education (Akhlaq)',
          'Online Teaching & Virtual Classroom Management',
          'Zoom / Google Meet Live Classes',
          'Lesson Planning & Curriculum Delivery',
          'Student Assessment & Progress Tracking',
          'Homework Preparation & Review',
          'One-on-One & Small Group Tutoring',
          'Hifz (Quran Memorization) Support for Beginners',
          'Interactive Learning Activities for Children',
          'Parent Communication & Student Counselling',
          'Monthly Progress Report Preparation',
          'Student Motivation & Classroom Discipline',
        ],
    languages: data.languages?.length
      ? data.languages
      : ['Malayalam (Native)', 'Arabic (Fluent)', 'English (Basic)'],
  }
}
