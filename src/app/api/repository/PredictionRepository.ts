export const predictBellPepperHealthy = async (data: File) => {
  let formData = new FormData();
  formData.append("file", data);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}predict`,
      {
        method: "POST",
        body: formData,
      }
    );
    return await response.json();
  } catch (error) {
    console.log(error);
    alert(error);
    return null;
  }
};
