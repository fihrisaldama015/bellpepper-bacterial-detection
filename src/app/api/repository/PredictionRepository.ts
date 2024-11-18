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
    // Check if the response status indicates an error
    if (!response.ok) {
      // Log the error response
      const errorData = await response.json();
      console.log("🚀 ~ predictBellPepperHealthy ~ error response:", errorData);
      alert(`Error: ${errorData.error}`);
      return null;
    }

    const dataPredict = await response.json();
    console.log("🚀 ~ predictBellPepperHealthy ~ response:", dataPredict);
    return dataPredict;
  } catch (error) {
    // Handle network or unexpected errors
    console.log("🚀 ~ predictBellPepperHealthy ~ catch block error:", error);
    if (error instanceof Error) {
      alert(
        `An unexpected error occurred. Please try again. Error: ${error.message}`
      );
    }
    return null;
  }
};
