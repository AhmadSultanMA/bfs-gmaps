import MapComponent from "@/Components/MapComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard({ auth }) {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [formData, setFormData] = useState({
        nama: "",
        description: "",
        lat: null,
        lng: null,
    });

    const handleCoordinatesChange = (lat, lng) => {
        setCoordinates({ lat, lng });
        setFormData((prevState) => ({
            ...prevState,
            lat,
            lng,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Inertia.post("/locations", formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
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
            <div className="flex h-[400px] w-11/12 mx-auto mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="w-1/2 flex flex-col gap-2"
                >
                    <div className="w-9/12">
                        <p>Nama Tempat</p>
                        <input
                            type="text"
                            name="nama"
                            className="w-full"
                            value={formData.nama}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-9/12">
                        <p>Description</p>
                        <input
                            type="text"
                            name="description"
                            className="w-full"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="w-9/12 ">
                        <p>Location</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="lat"
                                className="w-1/2"
                                value={formData.lat || ""}
                            />
                            <input
                                type="text"
                                name="lng"
                                className="w-1/2"
                                value={formData.lng || ""}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-9/12 duration-300"
                    >
                        Submit
                    </button>
                </form>
                <MapComponent onCoordinatesChange={handleCoordinatesChange} />
            </div>
        </AuthenticatedLayout>
    );
}
