import { Users } from 'lucide-react';
import { clsx } from 'clsx';

export default function ChatSidebar() {
    return (
        <div
            className={clsx(
                "order-1 flex-1 shrink-0 flex-col gap-2 sm:order-2 sm:flex sm:w-[320px] sm:flex-initial sm:border-l sm:border-secondary lg:w-[360px]",
                route().current("chats.show") ? "hidden" : "flex",
            )}>
            <div className="flex items-center justify-between px-2 pt-2 sm:pb-0">
                <h3 className="text-2xl font-semibold">Chats</h3>
                <button
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white"
                    onClick={() => {}}
                >
                    <Users size={14}/>
                </button>
            </div>
        </div>
    )
}
