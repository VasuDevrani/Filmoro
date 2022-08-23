import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPerson, getPersonMovies } from "../features/films";
import { movie, personData } from "../interfaces/movie";

export default function Cast() {
  const { id } = useParams();

  const [load, setLoad] = useState<boolean>(true);
  const [actorData, setActorData] = useState<personData | null>(null);
  const [works, setWorks] = useState<movie[]>([]);

  useEffect(() => {
    setLoad(true);
    const getData = async () => {
      try {
        if (typeof id === "string") {
          let data = await getPerson(id);
          setActorData(data);

          data = await getPersonMovies(id);
          setWorks(data);
          setLoad(false);
        }
      } catch (err) {
        setLoad(false);
        console.log(err);
      }
    };

    getData();
  }, [id]);

  return (
    <div className="cast">
      <h1>{actorData?.name}</h1>
    </div>
  );
}
