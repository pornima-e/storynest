import React from "react";

const contributors = [
    {
        name: "Pornima E",
        avatar: "https://github.com/pornima-e.png",
        github: "https://github.com/pornima-e",
    },
    {
        name: "Shakthi Shamruth",
        avatar: "https://github.com/shakthishamruth.png",
        github: "https://github.com/shakthishamruth",
    },
];

export default function ContributorsPage() {
    return (
        <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-green-50 to-green-200 py-10">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg border border-green-200">
                <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Contributors</h1>
                <ul className="flex flex-col gap-6">
                    {contributors.map((person) => (
                        <li key={person.name}>
                            <a
                                href={person.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-6 p-4 bg-green-100 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-200 transition group no-underline"
                                title={`${person.name}'s GitHub`}
                            >
                                <img
                                    src={person.avatar}
                                    alt={person.name}
                                    className="w-14 h-14 rounded-full border-2 border-green-400 object-cover group-hover:scale-105 transition"
                                />
                                <span className="text-xl font-medium text-green-900">{person.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
