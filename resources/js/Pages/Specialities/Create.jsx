import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";

export default function Create({ auth }) {
    const tableClasses = 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center';

    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        name: ''
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('specialities.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Speciality</h2>}
        >
            <Head title="Create Speciality" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="max-w-xl p-4">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Speciality</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Create speciality.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Speciality Name"/>
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        required
                                        autoComplete="name"
                                        onChange={e => setData('name', e.target.value)}
                                        value={data.name}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton>Save</PrimaryButton>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
