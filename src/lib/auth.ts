import { User } from '@/types/chat';
import { mockUsers } from './mock-data';

const AUTH_STORAGE_KEY = 'chat-app-auth';
const USER_STORAGE_KEY = 'chat-app-user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}

// Simulate authentication delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AuthService {
  static async login(credentials: LoginCredentials): Promise<User> {
    await delay(800); // Simulate network delay
    
    // For demo purposes, we'll accept any email that matches our mock users
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) {
      throw new Error('Invalid credentials. Try: alex@example.com, sarah@example.com, emma@example.com');
    }

    // In a real app, you'd verify the password here
    if (!credentials.password || credentials.password.length < 3) {
      throw new Error('Password must be at least 3 characters');
    }

    const authenticatedUser = { ...user, isOnline: true, lastSeen: new Date() };
    
    // Store auth state
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    
    return authenticatedUser;
  }

  static async register(credentials: RegisterCredentials): Promise<User> {
    await delay(1000); // Simulate network delay
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === credentials.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      username: credentials.username,
      email: credentials.email,
      avatar: `https://placehold.co/40x40?text=New+user+avatar+for+${credentials.username.charAt(0).toUpperCase()}`,
      isOnline: true,
      lastSeen: new Date(),
      joinedAt: new Date()
    };

    // Store auth state
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    
    return newUser;
  }

  static logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  static getCurrentUser(): User | null {
    try {
      const isAuthenticated = localStorage.getItem(AUTH_STORAGE_KEY);
      const userData = localStorage.getItem(USER_STORAGE_KEY);
      
      if (isAuthenticated === 'true' && userData) {
        return JSON.parse(userData);
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
    }
    
    return null;
  }

  static isAuthenticated(): boolean {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
  }

  static updateUserStatus(isOnline: boolean): void {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        isOnline,
        lastSeen: new Date()
      };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    }
  }
}

// Utility function to format time ago
export const formatTimeAgo = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return 'just now';
};

// Utility function to format message timestamp
export const formatMessageTime = (date: Date): string => {
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};