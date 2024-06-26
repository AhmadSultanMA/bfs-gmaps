import MapComponent from "@/Components/MapComponent";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function CreateRute({ auth }) {
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [formData, setFormData] = useState({
        nama: "",
        description: "",
        lat: "",
        lng: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // State untuk menentukan apakah sedang melakukan submit

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
        setIsSubmitting(true); // Menandakan bahwa proses submit dimulai
        Inertia.post("/locations", formData).then(() => {
            setIsSubmitting(false); // Setelah submit selesai, kembalikan ke false
        });
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
                    Buat Rute Baru
                </h2>
            }
        >
            <Head title="Buat Rute Baru" />
            <div className="lg:flex h-[400px] w-11/12 mx-auto mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="lg:w-1/2 w-9/12 mx-auto flex flex-col gap-2"
                >
                    <div className="lg:w-9/12">
                        <p>Nama Tempat</p>
                        <input
                            type="text"
                            name="nama"
                            className="w-full"
                            value={formData.nama}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="lg:w-9/12">
                        <p>Description</p>
                        <input
                            type="text"
                            name="description"
                            className="w-full"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="lg:w-9/12 ">
                        <p>Location</p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                name="lat"
                                className="w-1/2"
                                value={formData.lat || ""}
                                readOnly
                            />
                            <input
                                type="text"
                                name="lng"
                                className="w-1/2"
                                value={formData.lng || ""}
                                readOnly
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:w-9/12 duration-300 lg:mb-0 mb-10 ${
                            isSubmitting ? "cursor-not-allowed opacity-50" : ""
                        }`}
                        disabled={isSubmitting}
                    >
                        Submit
                    </button>
                </form>
                <MapComponent onCoordinatesChange={handleCoordinatesChange} />
            </div>
        </AuthenticatedLayout>
    );
}
