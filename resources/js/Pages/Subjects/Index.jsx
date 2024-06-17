import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, usePage} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";
import { format, parseISO } from 'date-fns';

export default function Index({ auth, subjects, links }) {
    const tableClasses = 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center';
    const { props } = usePage();
    const paginationLinks = links ? links.links : null;

    function handleClick(e) {
        e.preventDefault();

        router.delete(
            route('subject.destroy', {id: e.target.getAttribute('data-id')})
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{auth.user.role !== 2 && 'Your '}Subjects</h2>}
        >
            <Head title="Subjects"/>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {props.flash.message &&
                        <div
                            className="mb-10 bg-white border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md"
                            role="alert">
                            <span className="block sm:inline">{props.flash.message}</span>
                        </div>
                    }

                    {auth.user.role === 1 &&
                        <Link
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            href={route('subject.create')}>
                            Create Subject
                        </Link>
                    }
                    <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table-auto">
                            <thead>
                            <tr>
                                <th className={tableClasses}>Subject</th>
                                {auth.user.role !== 1 &&
                                    <th className={tableClasses}>Professor</th>
                                }
                                <th className={tableClasses}>Created</th>
                            </tr>
                            </thead>
                            <tbody>
                            {subjects && subjects.data.map((subject, key) => {
                                return (
                                    <tr key={key}>
                                        <td className={tableClasses}>{subject.name}</td>
                                        {auth.user.role !== 1 &&
                                            <td className={tableClasses}>{subject.professor}</td>
                                        }
                                        <td className={tableClasses}>{subject.created_at}</td>
                                        {auth.user.role !== 0 &&
                                            <td className={tableClasses}>
                                                <Link className="hover:text-black"
                                                      href={route('subject.show', {id: subject.id})}>View</Link>
                                            </td>
                                        }
                                        {auth.user.role !== 0 &&
                                            <td className={tableClasses}>
                                                <Link className="hover:text-black"
                                                      href={route('subject.edit', {id: subject.id})}>Edit</Link>
                                            </td>
                                        }
                                        {auth.user.role !== 0 &&
                                            <td className={tableClasses}>
                                                <Link className="hover:text-black"
                                                      onClick={handleClick}
                                                      data-id={subject.id}>Delete</Link>
                                            </td>
                                        }
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
