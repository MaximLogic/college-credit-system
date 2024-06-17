import {useState} from "react";
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react'

export default function UpdateSpecialityForm({selectedSpeciality, specialities, className = '' }) {
    const [query, setQuery] = useState( selectedSpeciality ? selectedSpeciality.name : '');
    const [filteredSpecialities, setFilteredSpecialities] = useState([]);

    const handeInputClick = (e) => {
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

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value) {
            const filtered = specialities.filter(speciality =>
                speciality.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSpecialities(filtered);
        } else {
            setFilteredSpecialities(specialities);
        }
    };

    const handleSpecialityClick = (speciality) => {
        console.log(speciality);
        router.patch(
            route('profile.updateSpeciality'),
            {speciality_id: speciality.id},
            {
                preserveState: true,
                onSuccess: (page) => {
                    setQuery(speciality.name);
                    setFilteredSpecialities([]);
                },
            }
        )
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">Your Speciality</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Select your speciality.
                </p>
            </header>
            <TextInput
                id="speciality"
                className="mt-1 block w-full"
                value={query}
                onChange={handleInputChange}
                onClick={handeInputClick}
                required
                autoComplete="speciality"
            />
            {filteredSpecialities.length > 0 && (
                <ul className="border rounded p-2 mt-2 bg-white w-full max-h-48 overflow-y-auto">
                    {filteredSpecialities.map(speciality => (
                        <li
                            key={speciality.id}
                            onClick={() => handleSpecialityClick(speciality)}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                        >
                            {speciality.name}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
