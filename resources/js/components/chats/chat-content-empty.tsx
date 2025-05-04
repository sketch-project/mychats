import { MessageCircleOff } from 'lucide-react';

export default function ChatContentEmpty() {
    return (
        <div className="order-3 hidden h-screen w-full flex-1 flex-col items-center justify-center border-l border-secondary sm:flex">
            <MessageCircleOff size={60}/>
            <h5 className="text-xl font-medium mt-4">No chat selected</h5>
            <p className="text-gray-400">Let's make nice conversation</p>
        </div>
    );
}
