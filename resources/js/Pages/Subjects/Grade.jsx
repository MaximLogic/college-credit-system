import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";

export default function Grade({ auth, subject, student}) {
    const { data, setData, post, errors, processing, recentlySuccessful } = useForm({
        grade: '',
        subject_id: subject.data.id,
        student_id: student.data.id
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('grades.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Grade</h2>}
        >
            <Head title="Grade Student" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="max-w-xl p-4">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">Grade {student.data.name}</h2>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="grade" value="Enter grade"/>
                                    <TextInput
                                        id="grade"
                                        className="mt-1 block w-full"
                                        required
                                        autoComplete="grade"
                                        onChange={e => setData('grade', e.target.value)}
                                        value={data.grade}
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
