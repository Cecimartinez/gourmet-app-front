import { baseURL, setBasicHeaders } from ".";
import * as FileSystem from "expo-file-system";

export default {
  getLastExamByIdPersona: async (id: string) => {
    try {
      const data = await fetch(
        `${baseURL}laboratorio/getAnalisisByIdPersona/${id}`
      );
      const json = await data.json();
      return json[0];
    } catch (error) {
      console.log(error);
    }
  },
};

export const uploadExam = async (uri, payload) => {
  try {
    const formData = new FormData();
    const payloadKeys = Object.keys(payload);

    //@ts-ignore
    formData.append("file", { uri, name: "photo.jpg", type: "image/jpeg" });

    for (let i = 0; i < payloadKeys.length; i++) {
      const currentKey = payloadKeys[i];
      formData.append(currentKey, payload[currentKey as keyof typeof payload]);
    }
    /* 
    const data = await FileSystem.uploadAsync(`${baseURL}laboratorio/createAnalisis`, uri, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file',

    }); */
    const data = await fetch(`${baseURL}laboratorio/createAnalisis`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    });
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const Vaccines = {
  getVaccinesByIdPersona: async (personaId) => {
    try {
      const data = await fetch(
        `${baseURL}laboratorio/getVaccinesByIdPersona/${personaId}`
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteVaccineById: async (vaccineId) => {
    try {
      const data = await fetch(
        `${baseURL}laboratorio/deleteVaccine/${vaccineId}`,
        { method: "DELETE" }
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateVaccineById: async (updateVaccineDto) => {
    try {
      const data = await fetch(
        `${baseURL}laboratorio/updateVaccineById/${updateVaccineDto._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updateVaccineDto),
          headers: setBasicHeaders(),
        }
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
