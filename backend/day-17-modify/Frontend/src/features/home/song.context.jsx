import { createContext, useState } from "react";

export const songContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState({
    url: "https://ik.imagekit.io/arwwhpdmu/cohort-2/moodify/songs/Deewaana_Deewaana__Full_Video___Tere_Ishk_Mein___Dhanush__Kriti___AR_Rahman___Aanand_LR___Bhushan_K_SXr4RRtzS.mp3",
    posterUrl:
      "https://ik.imagekit.io/arwwhpdmu/cohort-2/moodify/posters/Deewaana_Deewaana__Full_Video___Tere_Ishk_Mein___Dhanush__Kriti___AR_Rahman___Aanand_LR___Bhushan_K_uFuXC9SV1a.jpeg",
    title:
      "Deewaana Deewaana (Full Video): Tere Ishk Mein | Dhanush, Kriti | AR Rahman | Aanand LR | Bhushan K",
    mood: "happy",
  });

  const [loading, setLoading] = useState(false);

  return (
    <songContext.Provider value={{ song, setSong, loading, setLoading }}>
      {children}
    </songContext.Provider>
  );
};
