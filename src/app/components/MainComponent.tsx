import DropZone from "@/app/components/DropZoneComponent";

const Main = () => {
    return (
        <main className="flex flex-col gap-2 items-center justify-center h-full text-center">
            <h1 className="text-3xl font-bold">Bellpeper Healthy Detection</h1>
            <p className="mb-12 text-sm font-light">Penerapan Deep Learning Pada Klasifikasi Tanaman Paprika Berdasarkan Citra Daun Menggunakan Metode CNN</p>
            <DropZone/>
        </main>
    )
}

export default Main;