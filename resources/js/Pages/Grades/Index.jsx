import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, grades }) {
    const tableClasses = 'border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Your Grades</h2>}
        >
            <Head title="Grades" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table-auto">
                            <thead>
                            <tr>
                                <th className={tableClasses}>Subject</th>
                                <th className={tableClasses}>Grade</th>
                                <th className={tableClasses}>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            {grades && grades.data.map((grade, key) => {
                                    return (
                                        <tr key={key}>
                                            <td className={tableClasses}>{grade.subject}</td>
                                            <td className={tableClasses}>{grade.grade}</td>
                                            <td className={tableClasses}>{grade.date}</td>
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
