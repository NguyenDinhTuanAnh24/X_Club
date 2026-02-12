"use client";

import React, { useState } from 'react';
import {
    Search,
    MoreVertical,
    Phone,
    Video,
    Paperclip,
    Send,
    Image as ImageIcon, // Renamed to avoid confusion with next/image
    Smile,
    Mic
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Mock Data
const CONVERSATIONS = [
    {
        id: 1,
        name: "Phạm Thị B",
        avatar: "PB",
        color: "bg-blue-500",
        lastMessage: "Cảm ơn bạn rất nhiều! Giờ mình hiểu rõ hơn rồi 🙏",
        time: "10:30",
        unread: 2,
        active: true,
        status: "Đang hoạt động"
    },
    {
        id: 2,
        name: "Lê Văn C",
        avatar: "LC",
        color: "bg-purple-500",
        lastMessage: "Buổi họp tối nay còn không nhỉ?",
        time: "Hôm qua",
        unread: 0,
        active: false,
        status: "Offline 2h trước"
    },
    {
        id: 3,
        name: "Nhóm Alpha #03",
        avatar: "A3",
        color: "bg-orange-500",
        lastMessage: "DVE: Đã gửi tài liệu tham khảo lên drive rồi nhé mọi người",
        time: "Hôm qua",
        unread: 5,
        active: false,
        isGroup: true,
        status: "5 thành viên online"
    },
    {
        id: 4,
        name: "Mentor - Trần Thị B",
        avatar: "TB",
        color: "bg-amber-500",
        lastMessage: "Bài tập của bạn rất tốt, tôi đã chấm xong rồi",
        time: "2 ngày",
        unread: 0,
        active: false,
        status: "Offline"
    },
    {
        id: 5,
        name: "Hoàng Thị D",
        avatar: "HD",
        color: "bg-emerald-500",
        lastMessage: "Ok, cảm ơn bạn nhé!",
        time: "3 ngày",
        unread: 0,
        active: false,
        status: "Online"
    }
];

const MESSAGES = [
    {
        id: 1,
        sender: "Phạm Thị B",
        avatar: "PB",
        color: "bg-blue-500",
        text: "Chào bạn! Mình có thể hỏi về bài tập tuần này được không?",
        time: "9:45",
        isMe: false
    },
    {
        id: 2,
        sender: "Bạn",
        avatar: "ME", // ME isn't shown for sent messages in this design usually, or is implicit
        color: "bg-slate-900",
        text: "Chào bạn! Được chứ, bạn cứ hỏi nhé 😊",
        time: "9:47",
        isMe: true
    },
    {
        id: 3,
        sender: "Phạm Thị B",
        avatar: "PB",
        color: "bg-blue-500",
        text: "Phần phân tích SWOT trong bài tập, bạn có thể chia sẻ cách tiếp cận của mình không?",
        time: "9:48",
        isMe: false
    },
    {
        id: 4,
        sender: "Bạn",
        avatar: "ME",
        color: "bg-slate-900",
        text: "Mình bắt đầu bằng cách research kỹ về công ty và thị trường của họ trước. Sau đó mình liệt kê từng yếu tố trong SWOT dựa trên data thực tế.",
        time: "9:52",
        isMe: true
    },
    {
        id: 5,
        sender: "Bạn",
        avatar: "ME",
        color: "bg-slate-900",
        text: "Quan trọng là phải có số liệu cụ thể để support cho mỗi điểm nhé!",
        time: "9:52",
        isMe: true
    },
    {
        id: 6,
        sender: "Phạm Thị B",
        avatar: "PB",
        color: "bg-blue-500",
        text: "Cảm ơn bạn rất nhiều! Giờ mình hiểu rõ hơn rồi 🙏",
        time: "10:30",
        isMe: false
    }
];

export default function MessagesPage() {
    const [messageInput, setMessageInput] = useState("");
    const [messages, setMessages] = useState(MESSAGES);
    const [activeConversationId, setActiveConversationId] = useState(1);

    const activeConversation = CONVERSATIONS.find(c => c.id === activeConversationId) || CONVERSATIONS[0];

    const handleSendMessage = () => {
        if (!messageInput.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            sender: "Bạn",
            avatar: "ME",
            color: "bg-slate-900",
            text: messageInput,
            time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        };

        setMessages([...messages, newMessage]);
        setMessageInput("");
    };

    return (
        <div className="h-[calc(100vh)] flex bg-white shadow-sm overflow-hidden">
            {/* Sidebar List */}
            <div className="w-80 lg:w-[400px] border-r border-slate-200 flex flex-col bg-slate-50">
                {/* Header */}
                <div className="p-4 border-b border-slate-200 bg-white">
                    <h1 className="text-xl font-black text-slate-900 mb-4">Tin nhắn</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm cuộc trò chuyện..."
                            className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                        />
                    </div>
                </div>

                {/* Conversation List */}
                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setActiveConversationId(conv.id)}
                            className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-slate-100 hover:bg-slate-100 ${activeConversationId === conv.id ? 'bg-blue-50/80 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'
                                }`}
                        >
                            <div className="relative">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm ${conv.color}`}>
                                    {conv.avatar}
                                </div>
                                {conv.active && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className={`text-base font-bold truncate ${activeConversationId === conv.id ? 'text-blue-700' : 'text-slate-900'}`}>
                                        {conv.name}
                                    </h3>
                                    <span className="text-xs text-slate-400 font-semibold">{conv.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className={`text-sm truncate max-w-[140px] ${activeConversationId === conv.id ? 'text-blue-600 font-medium' : 'text-slate-500'}`}>
                                        {conv.lastMessage}
                                    </p>
                                    {conv.unread > 0 && (
                                        <span className="min-w-[18px] h-[18px] flex items-center justify-center bg-blue-600 text-white text-[10px] font-bold rounded-full px-1">
                                            {conv.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50 relative">
                {/* Chat Header */}
                <div className="h-16 px-6 border-b border-slate-200 bg-white flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xs ${activeConversation.color}`}>
                                {activeConversation.avatar}
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-900 text-base">{activeConversation.name}</h2>
                            <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></span>
                                {activeConversation.status}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-colors">
                            <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-full transition-colors">
                            <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col">
                    <div className="text-center">
                        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">Hôm nay</span>
                    </div>

                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-3 max-w-[85%] ${msg.isMe ? 'self-end flex-row-reverse' : 'self-start'}`}
                        >
                            {!msg.isMe && (
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px] ${msg.color} shadow-sm`}>
                                    {msg.avatar}
                                </div>
                            )}

                            {msg.isMe && (
                                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px] bg-red-500 shadow-sm border-2 border-white ring-1 ring-slate-100">
                                    NA
                                </div>
                            )}

                            <div className={`group relative`}>
                                <div
                                    className={`px-5 py-4 text-base font-medium shadow-sm leading-relaxed ${msg.isMe
                                        ? 'bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl rounded-tr-sm'
                                        : 'bg-white text-slate-700 rounded-2xl rounded-tl-sm border border-slate-100'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                                <span className={`text-xs text-slate-400 font-semibold mt-1 absolute -bottom-6 ${msg.isMe ? 'right-0' : 'left-0'} opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                        <button className="p-2 text-slate-400 hover:text-blue-600 bg-white shadow-sm rounded-xl transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <input
                            type="text"
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium text-slate-900 placeholder:text-slate-400 px-2"
                            placeholder="Nhập tin nhắn..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <Smile className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <Mic className="w-5 h-5" />
                        </button>
                        <Button
                            onClick={handleSendMessage}
                            className={`w-10 h-10 rounded-xl p-0 flex items-center justify-center bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all ${!messageInput.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                            disabled={!messageInput.trim()}
                        >
                            <Send className="w-4 h-4 text-white ml-0.5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
