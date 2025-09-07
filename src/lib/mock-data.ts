import { User, ChatRoom, Message } from '@/types/chat';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'https://placehold.co/40x40?text=Professional+headshot+of+young+Asian+developer+with+glasses',
    isOnline: true,
    lastSeen: new Date(),
    joinedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    username: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://placehold.co/40x40?text=Professional+portrait+of+blonde+woman+in+business+attire',
    isOnline: true,
    lastSeen: new Date(),
    joinedAt: new Date('2024-02-10')
  },
  {
    id: '3',
    username: 'Marcus Rodriguez',
    email: 'marcus@example.com',
    avatar: 'https://placehold.co/40x40?text=Friendly+Hispanic+man+with+beard+smiling',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    joinedAt: new Date('2024-01-20')
  },
  {
    id: '4',
    username: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: 'https://placehold.co/40x40?text=Young+professional+woman+with+curly+red+hair',
    isOnline: true,
    lastSeen: new Date(),
    joinedAt: new Date('2024-03-05')
  },
  {
    id: '5',
    username: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://placehold.co/40x40?text=Asian+software+engineer+with+casual+shirt',
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    joinedAt: new Date('2024-02-28')
  }
];

export const chatRooms: ChatRoom[] = [
  {
    id: 'general',
    name: 'General',
    description: 'General discussion and announcements',
    icon: '💬',
    memberCount: 128,
    lastActivity: new Date()
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Tech discussions, programming, and innovation',
    icon: '💻',
    memberCount: 89,
    lastActivity: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: 'random',
    name: 'Random',
    description: 'Off-topic conversations and fun stuff',
    icon: '🎲',
    memberCount: 156,
    lastActivity: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: 'help',
    name: 'Help & Support',
    description: 'Get help and support from the community',
    icon: '🆘',
    memberCount: 67,
    lastActivity: new Date(Date.now() - 1000 * 60 * 45)
  },
  {
    id: 'announcements',
    name: 'Announcements',
    description: 'Important updates and news',
    icon: '📢',
    memberCount: 234,
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 3)
  }
];

export const initialMessages: Message[] = [
  {
    id: '1',
    userId: '2',
    username: 'Sarah Johnson',
    userAvatar: 'https://placehold.co/32x32?text=Professional+portrait+of+blonde+woman+in+business+attire',
    content: 'Welcome to the General chat room! Feel free to introduce yourself.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    roomId: 'general',
    isRead: true,
    messageType: 'text'
  },
  {
    id: '2',
    userId: '1',
    username: 'Alex Chen',
    userAvatar: 'https://placehold.co/32x32?text=Professional+headshot+of+young+Asian+developer+with+glasses',
    content: 'Thanks Sarah! Excited to be here. Has anyone tried the new React 19 features?',
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    roomId: 'general',
    isRead: true,
    messageType: 'text'
  },
  {
    id: '3',
    userId: '4',
    username: 'Emma Wilson',
    userAvatar: 'https://placehold.co/32x32?text=Young+professional+woman+with+curly+red+hair',
    content: 'Yes! The new compiler is amazing. The performance improvements are noticeable.',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    roomId: 'general',
    isRead: true,
    messageType: 'text'
  },
  {
    id: '4',
    userId: '1',
    username: 'Alex Chen',
    userAvatar: 'https://placehold.co/32x32?text=Professional+headshot+of+young+Asian+developer+with+glasses',
    content: 'Anyone working on interesting side projects lately? 🚀',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    roomId: 'general',
    isRead: false,
    messageType: 'text'
  },
  {
    id: '5',
    userId: '2',
    username: 'Sarah Johnson',
    userAvatar: 'https://placehold.co/32x32?text=Professional+portrait+of+blonde+woman+in+business+attire',
    content: 'I\'m building a chat app with Next.js! Still learning the ropes though.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    roomId: 'general',
    isRead: false,
    messageType: 'text'
  },
  // Technology room messages
  {
    id: '6',
    userId: '1',
    username: 'Alex Chen',
    userAvatar: 'https://placehold.co/32x32?text=Professional+headshot+of+young+Asian+developer+with+glasses',
    content: 'What\'s everyone\'s thoughts on the new TypeScript 5.4 features?',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    roomId: 'technology',
    isRead: true,
    messageType: 'text'
  },
  {
    id: '7',
    userId: '4',
    username: 'Emma Wilson',
    userAvatar: 'https://placehold.co/32x32?text=Young+professional+woman+with+curly+red+hair',
    content: 'The improved inference is a game changer for complex generic types!',
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    roomId: 'technology',
    isRead: false,
    messageType: 'text'
  }
];

export const autoResponses = [
  "That's really interesting! Tell me more.",
  "I totally agree with that perspective.",
  "Has anyone else experienced something similar?",
  "Great point! I hadn't thought of it that way.",
  "Thanks for sharing that resource!",
  "I'm curious to hear other opinions on this.",
  "That reminds me of a project I worked on recently.",
  "Absolutely! The documentation on this is really helpful.",
  "I've been meaning to try that approach.",
  "Interesting discussion! Keep it going 👍"
];

export const systemMessages = [
  "joined the chat room",
  "left the chat room",
  "changed their status to online",
  "changed their status to away"
];