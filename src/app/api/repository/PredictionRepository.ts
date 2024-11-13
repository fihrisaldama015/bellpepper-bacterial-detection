export const predictBellPepperHealthy = async (data: File) => {
    let formData = new FormData();
    formData.append('file', data);
    try {
        const response = await fetch(`http://127.0.0.1:5000/predict`, {
            method: 'POST',
            body: formData,
        });
        return await response.json();
    }catch (error) {
        console.log(error);
        alert(error);
        return null
    }
};