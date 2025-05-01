import { type SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import Login from '@/pages/auth/login';
import { Button } from '@/components/ui/button';

interface WelcomeProps {
    canResetPassword: boolean
}
export default function Welcome({canResetPassword}: WelcomeProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div
                className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 p-6 text-foreground sm:gap-12 sm:p-8">
                <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                    <div className="mb-1 flex h-9 w-9 gap-2 items-center justify-center rounded-md">
                        <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                        <p className="font-bold text-xl">MyChats</p>
                    </div>
                    <span className="sr-only">MyChats</span>
                </Link>

                <div className="my-auto grid grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-8 sm:w-11/12 sm:space-y-12">
                        <h1 className="text-4xl font-bold sm:text-5xl lg:text-7xl">
                            <span
                                className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                              A place for
                            </span>
                            <br />
                            <span
                                className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                              meaningful
                            </span>
                            <br />
                            <span
                                className="bg-gradient-to-r from-blue-600 via-purple-500 to-rose-500 bg-clip-text text-transparent">
                              conversations
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl">
                            Messenger helps you connect with your Facebook friends and family,
                            build your community, and deepen your interests.
                        </p>

                        {auth.user ? (
                            <div className="text-center">
                                <img
                                    src={auth.user.avatar || '/images/avatar.png'}
                                    alt={auth.user.name}
                                    className="mx-auto h-32 w-32 rounded-full border border-secondary"
                                />
                                <h1 className="font-bold mb-1">{auth.user.name}</h1>
                                <p className="text-gray-500 mb-4">{auth.user.email}</p>
                                <Button onClick={() => router.visit(route('dashboard'))}>
                                    Go To Dashboard
                                </Button>
                            </div>
                        ) : (
                            <div className="md:pe-24">
                                <Login canResetPassword={canResetPassword} asChild />
                            </div>
                        )}

                    </div>

                    <div className="mt-4 flex items-center justify-center sm:mt-0">
                        <img src="/images/landing.png" alt="vector.png" />
                    </div>
                </div>

                <div className="mt-auto flex gap-2">
                    <Link className="font-medium" href="/">
                        &copy; MyChats all rights reserved.
                    </Link>
                    <span className="flex items-center gap-1 text-secondary-foreground">
                      Built with <Heart size={16} color={"red"} fill="red" />
                    </span>
                </div>
            </div>
        </>
    );
}
