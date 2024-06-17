import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import TextInput from "@/Components/TextInput.jsx";
import {useEffect, useState} from "react";

export default function Index({ auth, specialities, students, links }) {
    const tableClasses = 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center';
    const paginationLinks = links.links;

    const [studentsData, setStudentsData] = useState([]);
    const [searchQuery, setSearchQuery] = useState(new URLSearchParams(window.location.search).get('search') || '');
    const [specialityFilter, setSpecialityFilter] = useState(new URLSearchParams(window.location.search).get('speciality') || '');
    const [filterFlag, setFilterFlag] = useState(false);
    const [searchFlag, setSearchFlag] = useState(false);

    useEffect(() => {
        setStudentsData(students.data);
    }, [students.data]);

    useEffect(() => {
        fetchStudents(searchQuery, specialityFilter);
    }, [searchQuery, specialityFilter]);

    const fetchStudents = async (query, filter) => {
        const currentSearch = new URLSearchParams(window.location.search).get('search');
        const currentFilter = new URLSearchParams(window.location.search).get('speciality');
        if ((query !== currentSearch && searchFlag) || (filter !== currentFilter && filterFlag)) {
            router.get(
                route('student.index'),
                {
                    search: query,
                    speciality: filter
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['students', 'links'],
                    onSuccess: (page) => {
                        setStudentsData(page.props.students.data);
                    },
                }
            );
        }
    };

    const handleSearchChange = (e) => {
        setSearchFlag(true);
        setSearchQuery(e.target.value);
    };

    const handleFilterClick = (e) => {
        setFilterFlag(true);
        setSpecialityFilter(e.target.value);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Students</h2>}
        >
            <Head title="Students" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="w-full max-w-max flex">
                        <TextInput
                            onChange={handleSearchChange}
                            type="text"
                            value={searchQuery}
                            placeholder="Search students"
                            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                        <select onChange={handleFilterClick}
                                className="ml-3 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={specialityFilter}>
                            <option value="">Select speciality</option>
                            {specialities.map((speciality, key) => (
                                <option value={speciality.id} key={key}>{speciality.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table-auto">
                            <thead>
                            <tr>
                                <th className={tableClasses}>Student</th>
                                <th className={tableClasses}>Speciality</th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentsData.map((student, key) => {
                                return (
                                    <tr key={key}>
                                        <td className={tableClasses}>{student.name}</td>
                                        <td className={tableClasses}>{student.speciality}</td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        <Pagination links={paginationLinks}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
