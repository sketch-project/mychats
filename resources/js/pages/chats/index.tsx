import ChatLayout from '@/layouts/chat-layout';
import ChatSidebarMini from '@/layouts/chat/chat-sidebar-mini';
import ChatSidebar from '@/components/chats/chat-sidebar';
import ChatContentEmpty from '@/components/chats/chat-content-empty';

export default function Chats() {
    return (
        <ChatLayout title="Chat">
            <ChatSidebarMini/>
            <ChatSidebar/>
            <ChatContentEmpty/>
        </ChatLayout>
    )
}
