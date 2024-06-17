import {useEffect} from "react";
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import axios from "axios";

export default function UpdateUserInformationForm({userInfo, className = '' }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        firstname: userInfo.firstname || '',
        middlename: userInfo.middlename || '',
        lastname: userInfo.lastname || '',
        phone: userInfo.phone || ''
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.updateUserInfo'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">User Information</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your user information.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="firstname" value="First Name"/>
                    <TextInput
                        id="firstname"
                        className="mt-1 block w-full"
                        value={data.firstname}
                        onChange={e => setData('firstname', e.target.value)}
                        required
                        autoComplete="firstname"
                    />
                    <InputError className="mt-2" message={errors.firstname}/>
                </div>

                <div>
                    <InputLabel htmlFor="middlename" value="Middle Name"/>
                    <TextInput
                        id="middlename"
                        className="mt-1 block w-full"
                        value={data.middlename}
                        onChange={e => setData('middlename', e.target.value)}
                        required
                        autoComplete="middlename"
                    />
                    <InputError className="mt-2" message={errors.middlename}/>
                </div>

                <div>
                    <InputLabel htmlFor="lastname" value="Last Name"/>
                    <TextInput
                        id="lastname"
                        className="mt-1 block w-full"
                        value={data.lastname}
                        onChange={e => setData('lastname', e.target.value)}
                        required
                        autoComplete="lastname"
                    />
                    <InputError className="mt-2" message={errors.lastname}/>
                </div>

                <div>
                    <InputLabel htmlFor="phone" value="Phone"/>
                    <TextInput
                        id="phone"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        required
                        autoComplete="phone"
                    />
                    <InputError className="mt-2" message={errors.phone}/>
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
