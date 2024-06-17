import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, usePage} from '@inertiajs/react';
import Pagination from "@/Components/Pagination.jsx";

export default function Show({ auth, subject, students, links }) {
    const tableClasses = 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center';
    const { props } = usePage();
    const paginationLinks = links ? links.links : null;

    const handleSuspendClick = (e) => {
        e.preventDefault();

        router.delete(
            route('subject.suspendStudent', {id: subject.data.id}),
            {
                preserveScroll: true,
                data: {
                    studentId: e.target.getAttribute('data-id')
                },
            }
        );
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{subject.data.name} Students</h2>}
        >
            <Head title={subject.data.name} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {props.flash.message &&
                        <div
                            className="mb-10 bg-white border border-green-400 text-green-700 px-4 py-3 rounded-md shadow-md"
                            role="alert">
                            <span className="block sm:inline">{props.flash.message}</span>
                        </div>
                    }
                    {auth.user.role !== 0 &&
                        <Link
                            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            href={route('subject.nonRegisteredStudents', {id: subject.data.id})}>
                            Add student
                        </Link>
                    }
                    <div className="mt-5 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table-auto">
                            <thead>
                            <tr>
                                <th className={tableClasses}>Student</th>
                                <th className={tableClasses}>Speciality</th>
                            </tr>
                            </thead>
                            <tbody>
                            {students.data.map((student, key) => {
                                return (
                                    <tr key={key}>
                                        <td className={tableClasses}>{student.name}</td>
                                        <td className={tableClasses}>{student.speciality}</td>
                                        {auth.user.role === 1 &&
                                            <td className={tableClasses}>
                                                <Link className="hover:text-black"
                                                      href={route('subject.grade', {
                                                              subject_id: subject.data.id,
                                                              student_id: student.id
                                                          }
                                                      )}
                                                >Grade</Link>
                                            </td>
                                        }
                                        <td className={tableClasses}>
                                            <Link className="hover:text-black"
                                                  href={route('grades.show', {
                                                      subject_id: subject.data.id,
                                                      student_id: student.id
                                                  })}
                                            >Grades</Link>
                                        </td>
                                        <td className={tableClasses}>
                                            <Link className="hover:text-black" onClick={handleSuspendClick}
                                                  data-id={student.id}
                                            >Suspend</Link>
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
