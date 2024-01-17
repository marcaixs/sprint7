import React, { useContext, useState } from 'react';
import { NausContext, Nau } from '../context/NausContext';

const NausList: React.FC = () => {
  const { naus, selectNau, selectedNauIndex } = useContext(NausContext);
  const [expandedNauIndex, setExpandedNauIndex] = useState<number>(-1);
  const [shownNaus, setShownNaus] = useState<number>(10); // Nombre de naus a mostrar inicialment


  const handleClick = (index: number) => {
    setExpandedNauIndex(expandedNauIndex === index ? -1 : index);
    selectNau(index);
  }
  const handleViewMore = () => {
   
    if (shownNaus < naus.length) {
      setShownNaus(shownNaus + 10); // Augmentem el nombre de naus mostrades
    }
  };

  return (
    <div>
      <ul className='flex flex-col gap-4 w-3/5 mx-auto font-mono'>
        {naus.slice(0, shownNaus).map((nau: Nau, index: number) => (
          <div className='bg-neutral-900' key={nau.name} style={{ cursor: 'pointer' }}>
            <div onClick={() => handleClick(index)}>
              <h1>{nau.name}</h1>
              <p>{nau.model}</p>
              <hr />
            </div>
            {expandedNauIndex === index && selectedNauIndex === index && (
              <div className='flex gap-4'>
                <img></img>
                <div className='flex flex-col gap-2 py-4 text-xl px-2 '>
                  <h2>{nau.name.toUpperCase()}</h2>
                  <p>Modelo: {nau.model}</p>
                  <p>Costo en créditos: {nau.cost_in_credits}</p>
                  <p>Velocidad atmosférica: {nau.max_atmosphering_speed}</p>
                  <p>Fabricante: {nau.manufacturer}</p>
                  <p>Longitud: {nau.length}</p>
                  <p>Tripulación: {nau.crew}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </ul>
      
      {shownNaus < naus.length && <button onClick={handleViewMore}>View More</button>}
    </div>
  );
};

export default NausList;