import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, usePage} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import { format, parseISO } from 'date-fns';
import {useEffect, useState} from "react";
import TextInput from "@/Components/TextInput.jsx";

export default function Index({ auth, users, links }) {
    const tableClasses = 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center';
    const { props } = usePage();

    const [usersData, setUsersData] = useState([]);

    const [idQuery, setIdQuery] = useState(new URLSearchParams(window.location.search).get('id') || '');
    const [idFlag, setIdFlag] = useState(false);
    const [searchQuery, setSearchQuery] = useState(new URLSearchParams(window.location.search).get('search') || '');
    const [searchFlag, setSearchFlag] = useState(false);
    const [roleFilter, setRoleFilter] = useState(new URLSearchParams(window.location.search).get('role') || '');
    const [roleFilterFlag, setRoleFilterFlag] = useState(false);

    useEffect(() => {
        setUsersData(users.data);
    }, [users.data]);

    useEffect(() => {
        fetchUsers(idQuery, searchQuery, roleFilter);
    }, [idQuery, searchQuery, roleFilter]);

    const fetchUsers = async (id, search, role) => {
        const currentIdQuery = new URLSearchParams(window.location.search).get('id');
        const currentSearchQuery = new URLSearchParams(window.location.search).get('search');
        const currentRoleFilter = new URLSearchParams(window.location.search).get('role');
        if ((id !== currentIdQuery && idFlag) ||
            (search !== currentSearchQuery && searchFlag) ||
            (role !== currentRoleFilter && roleFilterFlag)) {
            router.get(
                route('users.index'),
                {
                    id: id,
                    search: search,
                    role: role
                },
                {
                    preserveState: true,
                    preserveScroll: true,
                    only: ['users', 'links'],
                    onSuccess: (page) => {
                        setUsersData(page.props.users.data);
                    },
                }
            );
        }
    };

    const handleDeleteUser = (e) => {
        e.preventDefault();

        router.delete(
            route('users.destroy', {
                id: e.target.getAttribute('data-id')
            })
        );
    }

    const handleIdQueryChange = (e) => {
        setIdFlag(true);
        setIdQuery(e.target.value);
    }

    const handleSearchQueryChange = (e) => {
        setSearchFlag(true);
        setSearchQuery(e.target.value);
    }

    const handleFilterClick = (e) => {
        setRoleFilterFlag(true);
        setRoleFilter(e.target.value);
    }

    const paginationLinks = links.links.map(link => {
        return {
            ...link,
            url: link.url ? `${link.url}&role=${roleFilter}` : null
        };
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Users</h2>}
        >
            <Head title="Users"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {props.flash.message &&
                        <div
                            className="mb-10 bg-white border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md"
                            role="alert">
                            <span className="block sm:inline">{props.flash.message}</span>
                        </div>
                    }
                    {props.flash.error &&
                        <div
                            className="mb-10 bg-white border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md"
                            role="alert">
                            <span className="block sm:inline">{props.flash.error}</span>
                        </div>
                    }
                    <div className="w-full max-w-max flex">
                        <TextInput
                            onChange={handleIdQueryChange}
                            type="text"
                            value={idQuery}
                            placeholder="Id"
                            className="w-20 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                        <TextInput
                            onChange={handleSearchQueryChange}
                            type="text"
                            value={searchQuery}
                            placeholder="Search user"
                            className="ml-3 w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                        <select onChange={handleFilterClick}
                                className="ml-3 block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
                                value={roleFilter}>
                            <option value="">Select Role</option>
                            <option value="0">Student</option>
                            <option value="1">Professor</option>
                            <option value="2">Admin</option>
                        </select>
                    </div>

                    <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table-auto">
                            <thead>
                            <tr>
                                <th className={tableClasses}>Id</th>
                                <th className={tableClasses}>Username</th>
                                <th className={tableClasses}>Name</th>
                                <th className={tableClasses}>Role</th>
                                <th className={tableClasses}>Created</th>
                                <th className={tableClasses}>Updated</th>
                            </tr>
                            </thead>
                            <tbody>
                            {usersData && usersData.map((user, key) => {
                                return (
                                    <tr key={key}>
                                        <td className={tableClasses}>{user.id}</td>
                                        <td className={tableClasses}>{user.username}</td>
                                        <td className={tableClasses}>{user.name}</td>
                                        <td className={tableClasses}>{user.role}</td>
                                        <td className={tableClasses}>{user.created}</td>
                                        <td className={tableClasses}>{user.updated}</td>
                                        <td className={tableClasses}>
                                            <Link className="hover:text-black"
                                                  href={route('users.edit', {id: user.id})}>Edit</Link>
                                        </td>
                                        <td className={tableClasses}>
                                            <Link className="hover:text-black"
                                                  onClick={handleDeleteUser}
                                                  data-id={user.id}>Delete</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4">
                        {links &&
                            <Pagination links={paginationLinks}/>
                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
