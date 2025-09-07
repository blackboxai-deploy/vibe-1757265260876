'use client';

import { create } from 'zustand';
import { ChatState, Message, User, ChatRoom, TypingIndicator } from '@/types/chat';
import { mockUsers, chatRooms, initialMessages, autoResponses } from './mock-data';
import { AuthService } from './auth';

interface ChatStore extends ChatState {
  // Actions
  setCurrentRoom: (room: ChatRoom) => void;
  sendMessage: (content: string) => void;
  addMessage: (message: Message) => void;
  setTypingIndicator: (userId: string, isTyping: boolean) => void;
  markMessagesAsRead: (roomId: string) => void;
  initializeChat: () => void;
  searchMessages: (query: string) => Message[];
  simulateUserActivity: () => void;
}

const CHAT_STORAGE_KEY = 'chat-app-messages';
const TYPING_TIMEOUT = 3000; // 3 seconds

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state
  currentUser: null,
  currentRoom: chatRooms[0], // Default to General
  messages: [],
  users: mockUsers,
  rooms: chatRooms,
  isTyping: {},
  unreadCounts: {},

  // Initialize chat store
  initializeChat: () => {
    const currentUser = AuthService.getCurrentUser();
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    
    let messages = initialMessages;
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        messages = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      } catch (error) {
        console.error('Error loading saved messages:', error);
      }
    }

    // Calculate unread counts
    const unreadCounts: { [roomId: string]: number } = {};
    chatRooms.forEach(room => {
      unreadCounts[room.id] = messages.filter(
        msg => msg.roomId === room.id && !msg.isRead && msg.userId !== currentUser?.id
      ).length;
    });

    set({
      currentUser,
      messages,
      unreadCounts
    });
  },

  // Set current room
  setCurrentRoom: (room: ChatRoom) => {
    const { markMessagesAsRead } = get();
    set({ currentRoom: room });
    markMessagesAsRead(room.id);
  },

  // Send a message
  sendMessage: (content: string) => {
    const { currentUser, currentRoom, addMessage, simulateAutoResponse } = get() as ChatStore & { simulateAutoResponse: () => void };
    
    if (!currentUser || !currentRoom || !content.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      content: content.trim(),
      timestamp: new Date(),
      roomId: currentRoom.id,
      isRead: true, // User's own messages are read
      messageType: 'text'
    };

    addMessage(message);

    // Simulate auto response after a delay
    setTimeout(() => {
      simulateAutoResponse();
    }, Math.random() * 3000 + 1000); // 1-4 seconds delay
  },

  // Add a message to the store
  addMessage: (message: Message) => {
    const { messages, currentRoom } = get();
    const newMessages = [...messages, message];
    
    // Update unread counts
    const unreadCounts = { ...get().unreadCounts };
    if (message.roomId !== currentRoom?.id && message.userId !== get().currentUser?.id) {
      unreadCounts[message.roomId] = (unreadCounts[message.roomId] || 0) + 1;
    }

    set({ 
      messages: newMessages,
      unreadCounts
    });

    // Save to localStorage
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(newMessages));
  },

  // Set typing indicator
  setTypingIndicator: (userId: string, isTyping: boolean) => {
    const typingState = { ...get().isTyping };
    
    if (isTyping) {
      typingState[userId] = true;
      // Auto-remove typing indicator after timeout
      setTimeout(() => {
        const currentTyping = { ...get().isTyping };
        delete currentTyping[userId];
        set({ isTyping: currentTyping });
      }, TYPING_TIMEOUT);
    } else {
      delete typingState[userId];
    }
    
    set({ isTyping: typingState });
  },

  // Mark messages as read
  markMessagesAsRead: (roomId: string) => {
    const { messages, currentUser } = get();
    const updatedMessages = messages.map(msg => 
      msg.roomId === roomId && msg.userId !== currentUser?.id 
        ? { ...msg, isRead: true }
        : msg
    );

    const unreadCounts = { ...get().unreadCounts };
    unreadCounts[roomId] = 0;

    set({ 
      messages: updatedMessages,
      unreadCounts
    });

    // Save to localStorage
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updatedMessages));
  },

  // Search messages
  searchMessages: (query: string) => {
    const { messages } = get();
    if (!query.trim()) return [];
    
    const searchTerm = query.toLowerCase();
    return messages.filter(msg => 
      msg.content.toLowerCase().includes(searchTerm) ||
      msg.username.toLowerCase().includes(searchTerm)
    );
  },

  // Simulate user activity (auto responses, typing indicators)
  simulateUserActivity: () => {
    const { users, currentRoom, currentUser, addMessage, setTypingIndicator } = get();
    
    if (!currentRoom || !currentUser) return;

    // Get other users (not current user)
    const otherUsers = users.filter(user => user.id !== currentUser.id && user.isOnline);
    if (otherUsers.length === 0) return;

    // Randomly select a user to simulate activity
    const randomUser = otherUsers[Math.floor(Math.random() * otherUsers.length)];

    // 30% chance to show typing indicator
    if (Math.random() < 0.3) {
      setTypingIndicator(randomUser.id, true);
      
      // Send a message after typing delay
      setTimeout(() => {
        const randomResponse = autoResponses[Math.floor(Math.random() * autoResponses.length)];
        
        const message: Message = {
          id: Date.now().toString(),
          userId: randomUser.id,
          username: randomUser.username,
          userAvatar: randomUser.avatar,
          content: randomResponse,
          timestamp: new Date(),
          roomId: currentRoom.id,
          isRead: false,
          messageType: 'text'
        };

        addMessage(message);
      }, Math.random() * 2000 + 1000); // 1-3 seconds typing time
    }
  }
}));

// Add simulateAutoResponse method
const originalStore = useChatStore.getState();
useChatStore.setState({
  ...originalStore,
  simulateAutoResponse: () => {
    const state = useChatStore.getState();
    state.simulateUserActivity();
  }
} as any);