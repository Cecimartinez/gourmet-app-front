import { baseURL, setBasicHeaders } from ".";
import HistoriaMedica from "./HistoriaMedica";

const Persona = {
  getPersonalData: async (id: string) => {
    try {
      const data = await fetch(`${baseURL}persona/getPersonaById/${id}`);
      const json = await data.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  },
  getFamilyBasicData: async (id: string) => {
    try {
      const data = await fetch(
        `${baseURL}relacion/getRelacionesByIdPersona/${id}`
      );
      const json = await data.json();
      console.log(json[0].relaciones);
      return json[0]; //devuelve array, revisar.
    } catch (error) {
      console.log(error);
    }
  },
  createPersona: async (payload) => {
    try {
      const createdPerson = await fetch(`${baseURL}persona/createPersona`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: setBasicHeaders(),
      });
      const json = await createdPerson.json();
      return json;
    } catch (error) {
      console.log(error);
    }
  },
  updatePersonalData: async (id, updatePersonalDataDto, image) => {
    if (image) {
      try {
        const formData = new FormData();
        delete updatePersonalDataDto.picture;
        const payloadKeys = Object.keys(updatePersonalDataDto);

        //@ts-ignore
        formData.append("file", {
          uri: image.uri,
          name: "photo.jpg",
          type: "image/jpeg",
        });

        for (let i = 0; i < payloadKeys.length; i++) {
          const currentKey = payloadKeys[i];
          formData.append(
            currentKey,
            updatePersonalDataDto[
              currentKey as keyof typeof updatePersonalDataDto
            ]
          );
        }
        const data = await fetch(`${baseURL}persona/updatePersonaById/${id}`, {
          method: "PUT",
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
    } else {
      try {
        const data = await fetch(`${baseURL}persona/updatePersonaById/${id}`, {
          method: "PUT",
          body: JSON.stringify(updatePersonalDataDto),
          headers: setBasicHeaders(),
        });
        const json = await data.json();
        return json;
      } catch (error) {
        console.log(error);
      }
    }
  },
};

export const addRelation = async (
  userId: string,
  addRelationDto: { personaId: string; relacion: string }
) => {
  try {
    const addRelation = await fetch(
      `${baseURL}relacion/addRelacionByIdPersona/${userId}`,
      {
        method: "POST",
        headers: setBasicHeaders(),
        body: JSON.stringify(addRelationDto),
      }
    );
    const json = await addRelation.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRelation = async (relationId) => {
  try {
    const data = await fetch(
      `${baseURL}relacion/deleteRelaciones/${relationId}`,
      { method: "DELETE" }
    );
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createPersonaFamiliar = async (userId, payload, tipoRelacion) => {
  try {
    const createdPerson = await Persona.createPersona(payload);
    const createdPersonJson = await createdPerson.json();
    const addRelacionDto = {
      personaId: createdPersonJson._id,
      relacion: tipoRelacion,
    };
    const data = await addRelation(userId, addRelacionDto);
    const json = await data.json();
    return json;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default Persona;
