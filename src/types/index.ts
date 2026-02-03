// Backend-ready type definitions

export interface Service {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  features: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  featuredImage: string;
  client?: string;
  location?: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: Author;
  category: string;
  tags: string[];
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

export interface ContactInfo {
  id: string;
  type: 'address' | 'phone' | 'email' | 'hours';
  title: string;
  content: string;
  icon: string;
}

export interface TempleFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}
