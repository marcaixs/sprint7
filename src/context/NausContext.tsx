import React, { ReactNode, createContext, useEffect, useState } from 'react';

export interface Nau {
  name: string;
  model: string;
  cost_in_credits: string;
  max_atmosphering_speed: string;
  manufacturer: string;
  length: string;
  crew: string;
  // Otras propiedades de la nave...
}

interface NausContextProps {
  naus: Nau[];
  selectedNauIndex: number | null;
  selectNau: (index: number) => void;
}

const defaultNausContext: NausContextProps = {
  naus: [],
  selectedNauIndex: null,
  selectNau: () => {},
};

interface ContextProviderProps{
    children: ReactNode;
}

export const NausContext = createContext<NausContextProps>(defaultNausContext);

export const NausProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [naus, setNaus] = useState<Nau[]>([]);
  const [selectedNauIndex, setSelectedNauIndex] = useState<number | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    const fetchNaus = async () => {
      try {
        const url = nextPage || 'https://swapi.dev/api/starships/';
        const response = await fetch(url);
        const data = await response.json();
        if (data.results) {
          setNaus((prevNaus) => [...prevNaus, ...data.results]);
          setNextPage(data.next);
        }
      } catch (error) {
        console.error('Error fetching naus:', error);
      }
    };

    fetchNaus();
  }, [nextPage]);

  const selectNau = (index: number) => {
    setSelectedNauIndex(index);
  };

  const loadMoreNaus = () => {
    if (nextPage !== null) {
      setNextPage(nextPage); // This should trigger the useEffect to fetch more naus
    }
  };

  const contextValue: NausContextProps = {
    naus,
    selectedNauIndex,
    selectNau,
  };

  return (
    <NausContext.Provider value={contextValue}>
      {children}
      {nextPage && <button onClick={loadMoreNaus}>View More</button>}
    </NausContext.Provider>
  );
};