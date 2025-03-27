
// Mock data for courses
export const coursesList = [
  {
    id: '1',
    title: 'Introduction to React Development',
    description: 'Learn the fundamentals of React, including components, state, and props',
    imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2',
    author: 'Jane Smith',
    duration: '2h 30m',
    level: 'Beginner',
    progress: 0,
    enrollmentStatus: 'Not Started',
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Advanced JavaScript Patterns',
    description: 'Master advanced JavaScript concepts like closures, prototypes, and async patterns',
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479',
    author: 'John Doe',
    duration: '4h 15m',
    level: 'Advanced',
    progress: 35,
    enrollmentStatus: 'In Progress',
    isBookmarked: true,
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    description: 'Understand the fundamentals of user experience and interface design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5',
    author: 'Emily Chen',
    duration: '3h 45m',
    level: 'Intermediate',
    progress: 100,
    enrollmentStatus: 'Completed',
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    description: 'Build scalable backend services with Node.js, Express, and MongoDB',
    imageUrl: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f',
    author: 'Michael Johnson',
    duration: '5h 20m',
    level: 'Intermediate',
    progress: 60,
    enrollmentStatus: 'In Progress',
    isBookmarked: false,
  },
  {
    id: '5',
    title: 'Docker & Kubernetes Fundamentals',
    description: 'Learn container technologies for modern application deployment',
    imageUrl: 'https://images.unsplash.com/photo-1605745341112-85968b19335b',
    author: 'Sarah Williams',
    duration: '4h 10m',
    level: 'Advanced',
    progress: 25,
    enrollmentStatus: 'In Progress',
    isBookmarked: true,
  },
  {
    id: '6',
    title: 'Machine Learning Basics',
    description: 'Introduction to machine learning algorithms and practical applications',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    author: 'David Park',
    duration: '6h 30m',
    level: 'Intermediate',
    progress: 0,
    enrollmentStatus: 'Not Started',
    isBookmarked: false,
  },
  {
    id: '7',
    title: 'Data Visualization with D3.js',
    description: 'Create interactive data visualizations for the web',
    imageUrl: 'https://images.unsplash.com/photo-1553095066-5014bc7b7f2d',
    author: 'Lisa Chen',
    duration: '3h 45m',
    level: 'Intermediate',
    progress: 45,
    enrollmentStatus: 'In Progress',
    isBookmarked: false,
  },
  {
    id: '8',
    title: 'AWS Cloud Practitioner',
    description: 'Essential training for cloud computing with Amazon Web Services',
    imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8',
    author: 'Mark Anderson',
    duration: '5h 15m',
    level: 'Beginner',
    progress: 80,
    enrollmentStatus: 'In Progress',
    isBookmarked: true,
  },
  {
    id: '9',
    title: 'Python for Data Science',
    description: 'Learn Python programming focused on data analysis and visualization',
    imageUrl: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9',
    author: 'Rachel Kim',
    duration: '4h 50m',
    level: 'Beginner',
    progress: 100,
    enrollmentStatus: 'Completed',
    isBookmarked: false,
  },
  {
    id: '10',
    title: 'Responsive Web Design',
    description: 'Create websites that work on any device and screen size',
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8',
    author: 'Thomas White',
    duration: '2h 55m',
    level: 'Beginner',
    progress: 20,
    enrollmentStatus: 'In Progress',
    isBookmarked: false,
  },
  {
    id: '11',
    title: 'GraphQL API Development',
    description: 'Build flexible and efficient APIs using GraphQL',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
    author: 'Olivia Martinez',
    duration: '3h 40m',
    level: 'Advanced',
    progress: 0,
    enrollmentStatus: 'Not Started',
    isBookmarked: false,
  },
  {
    id: '12',
    title: 'iOS App Development with Swift',
    description: 'Create native iOS applications using Swift and Xcode',
    imageUrl: 'https://images.unsplash.com/photo-1566241440091-ec10de8db2e1',
    author: 'Daniel Lee',
    duration: '6h 15m',
    level: 'Intermediate',
    progress: 30,
    enrollmentStatus: 'In Progress',
    isBookmarked: true,
  }
];

// Mock data for trending courses
export const trendingCourses = coursesList.slice(0, 5);

// Mock data for recommended courses
export const recommendedCourses = coursesList.slice(3, 8);

// Mock data for popular courses
export const popularCourses = coursesList.slice(6, 11);

// Mock data for recently added courses
export const recentCourses = coursesList.slice(1, 6);
