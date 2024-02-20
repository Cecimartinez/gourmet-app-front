import { baseURL, setBasicHeaders } from ".";

export const Estudio = {
  getEstudiosByIdPersona: async (idPersona) => {
    try {
      const data = await fetch(
        `${baseURL}estudio/getEstudiosByIdPersona/${idPersona}`
      );
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteEstudioById: async (idEstudio) => {
    try {
      const data = await fetch(`${baseURL}estudio/deleteEstudio/${idEstudio}`, {
        method: "DELETE",
      });
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateEstudioById: async (updateEstudioDto) => {
    try {
      const data = await fetch(
        `${baseURL}estudio/updateEstudioById/${updateEstudioDto._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updateEstudioDto),
          headers: setBasicHeaders(),
        }
      );
      const json = data.json();
      return json;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createEstudio: async (createEstudioDto, files) => {
    try {
      const formData = new FormData();
      const payloadKeys = Object.keys(createEstudioDto);

      if (files.length > 1) {
        files.forEach((element) => {
          //@ts-ignore
          formData.append("file", {
            uri: element.uri,
            name: "file.jpg",
            type: "image/jpeg",
          });
        });
      } else {
        //@ts-ignore
        formData.append("file", {
          uri: files.uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });
      }

      for (let i = 0; i < payloadKeys.length; i++) {
        const currentKey = payloadKeys[i];
        formData.append(
          currentKey,
          createEstudioDto[currentKey as keyof typeof createEstudioDto]
        );
      }
      const data = await fetch(`${baseURL}estudio/createEstudio/`, {
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
      throw error;
    }
  },
};
