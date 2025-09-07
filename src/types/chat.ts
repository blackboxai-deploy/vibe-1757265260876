export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: Date;
  joinedAt: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  icon: string;
  memberCount: number;
  lastActivity: Date;
}

export interface Message {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
  roomId: string;
  isRead: boolean;
  messageType: 'text' | 'system' | 'emoji';
}

export interface ChatState {
  currentUser: User | null;
  currentRoom: ChatRoom | null;
  messages: Message[];
  users: User[];
  rooms: ChatRoom[];
  isTyping: { [userId: string]: boolean };
  unreadCounts: { [roomId: string]: number };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface TypingIndicator {
  userId: string;
  username: string;
  roomId: string;
  timestamp: Date;
}

export interface MessageFormData {
  content: string;
  roomId: string;
}