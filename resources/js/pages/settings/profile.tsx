import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ChangeEvent, FormEventHandler, useRef } from 'react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Camera } from 'lucide-react';
import { Method } from '@/types/method';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Profile settings',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    _method: Method,
    name: string;
    email: string;
    avatar: File | null;
}

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;
    const avatarRef = useRef<HTMLImageElement>(null);

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        _method: "PATCH",
        name: auth.user.name,
        email: auth.user.email,
        avatar: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('profile.update'), {
            preserveScroll: true,
        });
    };

    const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setData("avatar", files[0]);

            const imageUrl = window.URL.createObjectURL(files[0]);
            avatarRef.current?.setAttribute("src", imageUrl);

            return () => {
                window.URL.revokeObjectURL(imageUrl);
            };
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Profile settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Profile information" description="Update your name and email address" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="picture relative">
                            <img
                                src={auth.user.avatar || '/images/avatar.png'}
                                alt={data.name}
                                className="mx-auto h-20 w-20 rounded-full border border-secondary"
                                ref={avatarRef}
                            />

                            <label
                                htmlFor="avatar"
                                className="bg-primary text-secondary py-1 absolute left-1/2 top-6 flex translate-x-5 cursor-pointer items-center justify-center rounded-full px-2"
                                tabIndex={0}
                            >
                                <Camera />
                                <input
                                    type="file"
                                    onChange={changeAvatar}
                                    id="avatar"
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>

                            <Input
                                id="name"
                                className="mt-1 block w-full"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email address</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="Email address"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="text-muted-foreground -mt-4 text-sm">
                                    Your email address is unverified.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Click here to resend the verification email.
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        A new verification link has been sent to your email address.
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Save</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Saved</p>
                            </Transition>
                        </div>
                    </form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
