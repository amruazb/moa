import { CvData } from './types'

export const sampleCvData: CvData = {
  fullName: 'Raihana Ummar',
  title: 'Online Madrasa Teacher',
  addressLine1: 'Kurungottu Thodi (H)',
  addressLine2: 'Elanad P.O.',
  district: 'Thrissur District, Kerala',
  pinCode: '680586',
  phone: '',
  email: '',
  summary:
    'Dedicated and compassionate educator with 5 years of online teaching experience in Madrasa subjects. Skilled in teaching Fiqh, Quran, Arabic, and Malayalam to students up to 10th standard. Known for structured lesson delivery, patient guidance, and creating a supportive learning environment that helps students grow in both knowledge and character.',
  education: [
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
  experience: [
    {
      title: 'Online Madrasa Teacher',
      organization: 'Private Online Classes',
      period: '5 Years',
      description:
        'Have 5 years of experience teaching Madrasa subjects online for students up to 10th standard. Specialize in Fiqh, Quran, Arabic, and Malayalam instruction through virtual classes. Prepare lesson plans, explain religious concepts clearly, assess student understanding, provide homework guidance, and support steady academic and spiritual development through regular parent communication.',
    },
  ],
  skills: [
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
  languages: ['Malayalam (Native)', 'Arabic (Fluent)', 'English (Basic)'],
}

export const fahmidaBasheerCvData: CvData = {
  fullName: 'Fahmida Basheer',
  title: 'Islamic Studies Teacher',
  addressLine1: 'Ernakulam, Kerala',
  addressLine2: '',
  district: 'Ernakulam District, Kerala',
  pinCode: '',
  phone: '+91 90370 73703',
  email: 'fahmidabas786@gmail.com',
  summary:
    'A dedicated and passionate Islamic Studies teacher with six years of experience in online madrasa education. Skilled in creating engaging lesson plans, fostering positive relationships with students and parents, and encouraging academic and moral development through effective teaching methods. Seeking an opportunity to contribute knowledge, communication skills, and commitment to quality Islamic education.',
  education: [
    {
      qualification: 'Hafiza',
      institution: '',
      year: '',
    },
    {
      qualification: 'Aalima (2-Year Course)',
      institution: '',
      year: '',
    },
  ],
  experience: [
    {
      title: 'Islamic Studies Teacher',
      organization: 'Deeniyath Online Madrasa',
      period: '4 Years',
      description:
        'Taught Islamic Studies and madrasa subjects through online classes with a focus on clarity, discipline, and student engagement. Prepared lesson plans, guided learners in Qur’an, Hadees, Aqeedah, Arabic, and Islamic Studies, and maintained strong communication with parents to support student progress and moral development.',
    },
    {
      title: 'Islamic Studies Teacher',
      organization: 'Nawawin Samastha EK Madrasa',
      period: '2 Years',
      description:
        'Worked as an Islamic Studies teacher and supported students through structured lessons, motivational guidance, and regular academic follow-up. Contributed to online madrasa education by preparing learning materials, encouraging student participation, and building positive learning habits.',
    },
  ],
  skills: [
    'Online Teaching',
    'Lesson Planning',
    'Effective Classroom Management',
    'Strong Communication with Students and Parents',
    'Student Motivation and Academic Guidance',
    'Preparation of Educational Videos and Learning Materials',
    'Teaching Qur\'an, Hadees, Aqeedah, Arabic, and Islamic Studies',
    'Time Management and Organization',
  ],
  languages: ['Malayalam', 'English', 'Arabic'],
}

export const cvSampleProfiles: Array<{ label: string; data: CvData }> = [
  {
    label: 'Old CV - Raihana Ummar',
    data: sampleCvData,
  },
  {
    label: 'New CV - Fahmida Basheer',
    data: fahmidaBasheerCvData,
  },
]
