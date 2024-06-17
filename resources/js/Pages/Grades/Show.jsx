import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, usePage} from '@inertiajs/react';

export default function Index({ auth, grades, subject, student }) {
    const tableClasses = 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center';
    const {props} = usePage();

    const handleDeleteClick = (e) => {
        e.preventDefault();

        router.delete(
            route('grades.destroy', {id: e.target.getAttribute('data-id')}),
            {
                preserveScroll: true,
            }
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{student.data.name} Grades from {subject.data.name}</h2>}
        >
            <Head title="Grades" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {props.flash.message &&
                        <div
                            className="mb-10 bg-white border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md"
                            role="alert">
                            <span className="block sm:inline">{props.flash.message}</span>
                        </div>
                    }
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table-auto">
                            <thead>
                            <tr>
                                <th className={tableClasses}>Grade</th>
                                <th className={tableClasses}>Date</th>
                                <th className={tableClasses}>Edited</th>
                            </tr>
                            </thead>
                            <tbody>
                            {grades && grades.data.map((grade, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className={tableClasses}>{grade.grade}</td>
                                            <td className={tableClasses}>{grade.date}</td>
                                            <td className={tableClasses}>{grade.updated}</td>
                                            {auth.user.role !== 0 &&
                                                <td className={tableClasses}>
                                                    <Link className="hover:text-black"
                                                          href={route('grades.edit', {id: grade.id})}>Edit</Link>
                                                </td>
                                            }
                                            {auth.user.role !== 0 &&
                                                <td className={tableClasses}>
                                                    <Link className="hover:text-black"
                                                          data-id={grade.id}
                                                          onClick={handleDeleteClick}>Delete</Link>
                                                </td>
                                            }
                                        </tr>
                                    );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
