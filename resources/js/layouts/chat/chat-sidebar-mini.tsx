import { Link, router, usePage } from '@inertiajs/react';
import { Archive, ChevronsUpDown, LogOut, MessageCircle, Settings, User, Users } from 'lucide-react';
import { clsx } from 'clsx';
import BadgeNotification from '@/components/chats/badge-notification';
import { useIsMobile } from '@/hooks/use-mobile';
import type { SharedData } from '@/types';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';

export default function ChatSidebarMini() {
    const { auth } = usePage<SharedData>().props;
    const isMobile = useIsMobile();
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    return (
        <div className="order-2 mt-auto flex-row justify-between bg-background sm:order-1 sm:mt-0 sm:flex sm:flex-col sm:items-center sm:justify-center sm:p-2">
            <Link href={route('chats.index')} className={clsx(
                "relative flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
                route().current("chats.*") && "bg-secondary",
            )}>
                <MessageCircle/>
                <BadgeNotification />
            </Link>
            <Link
                href={route("contacts.index")}
                className={clsx(
                    "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
                    route().current("contacts.*") && "bg-secondary",
                )}
            >
                <Users/>
            </Link>
            <Link
                href={route("archived-chats.index")}
                className={clsx(
                    "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
                    route().current("archived_chats.*") && "bg-secondary",
                )}
            >
                <Archive/>
            </Link>

            {isMobile ? (
                <Link
                    href={route("appearance")}
                    className={clsx(
                        "flex flex-1 items-center justify-center rounded-lg p-3 transition-all hover:bg-secondary sm:flex-initial",
                        route().current("preferences.index") && "bg-secondary",
                    )}
                >
                    <img
                        src={auth.user.avatar}
                        alt="Avatar"
                        className="h-8 w-8 rounded-full border border-secondary sm:h-10 sm:w-10"
                    />
                </Link>
            ) : (
                <div className="relative flex flex-1 cursor-pointer items-center justify-center rounded-lg px-3 transition-all hover:bg-secondary sm:mt-auto sm:flex-initial sm:px-0 sm:hover:bg-transparent">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <img
                                src={auth.user.avatar}
                                alt=""
                                className="h-8 w-8 rounded-full border border-secondary sm:h-10 sm:w-10"
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            align="end"
                            side={'bottom'}
                        >
                            <DropdownMenuGroup>
                                <DropdownMenuItem asChild>
                                    <Link className="block w-full" href={route('appearance')} as="button" prefetch onClick={cleanup}>
                                        <Settings className="mr-2" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link className="block w-full" href={route('profile.edit')} as="button" prefetch onClick={cleanup}>
                                        <User className="mr-2" />
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                                    <LogOut className="mr-2" />
                                    Log out
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    )
}
