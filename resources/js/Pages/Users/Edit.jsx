import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import {Transition} from "@headlessui/react";
import {useState} from "react";

export default function Edit({ auth, user, selectedSpeciality, specialities }) {
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        firstname: user.firstname || '',
        middlename: user.middlename || '',
        lastname: user.lastname || '',
        phone: user.phone || '',
        role: user.role,
        speciality: selectedSpeciality ? selectedSpeciality.id : ''
    });

    const [selectedSpecialityName, setSelectedSpecialityName] = useState( selectedSpeciality ? selectedSpeciality.name : '');
    const [filteredSpecialities, setFilteredSpecialities] = useState([]);

    const handeSpecialityInputClick = (e) => {
        const value = e.target.value;

        if (value) {
            const filtered = specialities.filter(speciality =>
                speciality.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSpecialities(filtered);
        } else {
            setFilteredSpecialities(specialities);
        }
    }

    const handleSpecialityInputChange = (e) => {
        const value = e.target.value;
        setSelectedSpecialityName(value);

        if (value) {
            const filtered = specialities.filter(speciality =>
                speciality.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSpecialities(filtered);
        } else {
            setFilteredSpecialities(specialities);
        }
    };

    const handleSpecialityClick = (selectedSpeciality) => {
        setData('speciality', selectedSpeciality.id);
        setSelectedSpecialityName(selectedSpeciality.name);

        setFilteredSpecialities([]);
    }

    const submit = (e) => {
        e.preventDefault();

        patch(route('users.update', {id: user.id}));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit User</h2>}
        >
            <Head title="Edit User" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="max-w-xl p-4">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">User</h2>

                                <p className="mt-1 text-sm text-gray-600">
                                    Edit User.
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
                                        autoComplete="phone"
                                    />
                                    <InputError className="mt-2" message={errors.phone}/>
                                </div>

                                <div>
                                    <InputLabel htmlFor="role" value="Role"/>
                                    <select
                                        className="block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                        value={data.role}
                                        onChange={e => {
                                            setData('role', e.target.value);
                                        }}
                                        name="role">
                                        <option value="0">Student</option>
                                        <option value="1">Professor</option>
                                        <option value="2">Admin</option>
                                    </select>
                                </div>

                                {data.role == 0 && <div>
                                    <InputLabel htmlFor="speciality" value="Speciality"/>
                                    <TextInput
                                        id="speciality"
                                        className="mt-1 block w-full"
                                        onChange={handleSpecialityInputChange}
                                        onClick={handeSpecialityInputClick}
                                        value={selectedSpecialityName}
                                        autoComplete="speciality"
                                    />
                                    {filteredSpecialities.length > 0 && (
                                        <ul className="border rounded p-2 mt-2 bg-white w-full max-h-48 overflow-y-auto">
                                            {filteredSpecialities.map(speciality => (
                                                <li
                                                    key={speciality.id}
                                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                                    onClick={() => handleSpecialityClick(speciality)}
                                                >
                                                    {speciality.name}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>}

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
