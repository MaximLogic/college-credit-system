import {Link} from "@inertiajs/react";

export default function Pagination({ links }) {
    return ( links.length > 3 &&
        <nav className="flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                            link.active ? 'bg-gray-200' : 'bg-white'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <span className="relative z-0 inline-flex shadow-sm rounded-md">
                        {links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url}
                                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                                    link.active ? 'bg-gray-200' : 'bg-white'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </span>
                </div>
            </div>
        </nav>
    );
}
