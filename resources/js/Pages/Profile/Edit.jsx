import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateUserInformationForm from './Partials/UpdateUserInformationForm.jsx';
import UpdateSpecialityForm from "@/Pages/Profile/Partials/UpdateSpecialityForm.jsx";
import {Head, usePage} from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status, speciality, specialities }) {
    const { props } = usePage();

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {props.flash.message &&
                        <div
                            className="mb-10 bg-white border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md"
                            role="alert">
                            <span className="block sm:inline">{props.flash.message}</span>
                        </div>
                    }
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdateUserInformationForm
                            userInfo={auth.user}
                            className="max-w-xl"
                        />
                    </div>

                    {auth.user.role === 0 &&
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateSpecialityForm
                                selectedSpeciality={speciality}
                                specialities={specialities}
                                className="max-w-xl"
                            />
                        </div>
                    }

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl"/>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                    <DeleteUserForm className="max-w-xl"/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
