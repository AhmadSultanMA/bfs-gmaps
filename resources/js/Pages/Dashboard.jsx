import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Dashboard({ auth, locations }) {
    const [selectedLocation1, setSelectedLocation1] = useState("");
    const [selectedLocation2, setSelectedLocation2] = useState("");
    const [distance, setDistance] = useState(null);

    const graph = {};
    const calculateDistance = (location1, location2) => {
        const lat1 = location1.lat;
        const lon1 = location1.lng;
        const lat2 = location2.lat;
        const lon2 = location2.lng;
        const radius = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
                Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = radius * c;
        return distance;
    };

    locations.forEach((location) => {
        graph[location.name] = {};
        locations.forEach((otherLocation) => {
            if (location.id !== otherLocation.id) {
                graph[location.name][otherLocation.name] = calculateDistance(
                    location,
                    otherLocation
                );
            }
        });
    });

    const bfs = (start, end) => {
        const queue = [[start]];
        const visited = new Set();
        while (queue.length > 0) {
            const path = queue.shift();
            const node = path[path.length - 1];
            if (!visited.has(node)) {
                visited.add(node);
                if (node === end) {
                    return path;
                }
                for (const neighbor in graph[node]) {
                    if (!visited.has(neighbor)) {
                        queue.push([...path, neighbor]);
                    }
                }
            }
        }
        return null;
    };

    const handleCalculateDistance = () => {
        if (selectedLocation1 && selectedLocation2) {
            const path = bfs(selectedLocation1, selectedLocation2);
            if (path) {
                const distance = path.reduce((acc, node, index) => {
                    if (index > 0) {
                        acc += graph[path[index - 1]][node];
                    }
                    return acc;
                }, 0);
                setDistance(distance);
            } else {
                setDistance(null);
            }
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="w-11/12 mx-auto ">
                <div className="flex flex-wrap mb-6 mt-10 gap-3">
                    <div className="w-full md:w-5/12 px-3 mb-6 md:mb-0 mx-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Location 1
                        </label>
                        <select
                            value={selectedLocation1}
                            onChange={(e) =>
                                setSelectedLocation1(e.target.value)
                            }
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                        >
                            <option value="">Select Location</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.name}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="w-full md:w-5/12 px-3 mx-auto">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Location 2
                        </label>
                        <select
                            value={selectedLocation2}
                            onChange={(e) =>
                                setSelectedLocation2(e.target.value)
                            }
                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white"
                        >
                            <option value="">Select Location</option>
                            {locations.map((location) => (
                                <option key={location.id} value={location.name}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-9/12 lg:w-2/12 lg:mb-0 mb-10 mx-auto">
                    <button
                        onClick={handleCalculateDistance}
                        className="bg-blue-500 hover:bg-blue-700 duration-300 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Hitung Jarak
                    </button>
                </div>
                {distance !== null && (
                    <div className="w-11/12 mx-auto mt-6">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 bg-white border-b border-gray-200">
                                <h3 className="text-lg font-semibold mb-2">
                                    Jarak antara {selectedLocation1} dan{" "}
                                    {selectedLocation2} adalah:{" "}
                                    {distance.toFixed(2)} km
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Catatan: Ini adalah perkiraan jarak
                                    menggunakan BFS dan formula Haversine.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
