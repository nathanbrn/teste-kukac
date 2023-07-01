import { ButtonFloat } from '@/components/buttonFloat';
import BasicModal from '@/components/modal';
import { ModalForm } from '@/components/modalForm';
import { Car } from '@/types/cars.types';
import { Motorbike } from '@/types/motorbikes.types';
import { api } from '@/utils/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ImageGaragem from '../assets/garagem.svg';

export default function Garagem() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  const [cars, setCars] = useState<Car[]>([]);
  const [motorbikes, setMotors] = useState<Motorbike[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const cars = await api.get('/vehicles/cars');
        const motorbikes = await api.get('/vehicles/motorbikes');

        setCars(cars.data);
        setMotors(motorbikes.data);
      } catch (err) {
        toast.error('Erro ao carregar veículos');
      }
    })();
  }, [cars, motorbikes]);

  function getCarYears(): number[] {
    const firstCarYear = 1886;
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let year = firstCarYear; year <= currentYear; year++) {
      years.push(year);
    }

    return years;
  }

  function getYearsSinceFirstMotorcycle(): number[] {
    const currentYear = new Date().getFullYear();
    const firstMotorcycleYear = 1885;
    const years: number[] = [];

    for (let year = firstMotorcycleYear; year <= currentYear; year++) {
      years.push(year);
    }

    return years;
  }

  const yearsSinceFirstMotorcycle = getYearsSinceFirstMotorcycle();
  const carYears = getCarYears();

  return (
    <>
      <div className='my-4'>
        <Image src={ImageGaragem} alt='Garagem' width={300} />
      </div>

      <BasicModal>
        Inicialmente irá conter uma lista de carros e motos, com a opção de adicionar mais veículos no botão flutuando inserido a parte inferior direita do site.
      </BasicModal>



      <div className='w-full flex tableContainer justify-around mt-4'>
        <div className='flex flex-col items-center flex-wrap'>
          <h1 className='text-lg mt-5 mb-2'>Carros:</h1>
          <hr/>
          <div className='flex gap-4 flex-wrap'>
            <TableContainer className='tableGaragemContainer'>
              <Table className='tableGaragem'>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Modelo</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Ano de fabricação</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Número de portas</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Marca</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cars.map((car:Car) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={car.id}>
                      <TableCell>
                        {car.model}
                      </TableCell>
                      <TableCell>
                        {car.yearMan}
                      </TableCell>
                      <TableCell>
                        {car.amountPorts}
                      </TableCell>
                      <TableCell>
                        {car.brand}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>

        <div className='flex flex-col items-center flex-wrap vertical-separator mb-0'></div>

        <div className='flex flex-col items-center flex-wrap gap-1'>
          <h1 className='text-lg mt-5'>Motos:</h1>
          <hr/>
          <TableContainer className='tableGaragemContainer'>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Modelo</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Ano de fabricação</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Marca</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Pneus</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Passageiros</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {motorbikes.map((motorbike:Motorbike) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={motorbike.id}>
                    <TableCell>
                      {motorbike.model}
                    </TableCell>
                    <TableCell>
                      {motorbike.yearMan}
                    </TableCell>
                    <TableCell>
                      {motorbike.brand}
                    </TableCell>
                    <TableCell>
                      {motorbike.whells}
                    </TableCell>
                    <TableCell>
                      {motorbike.passengers}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <ButtonFloat onClick={handleOpen}/>
      {open && <ModalForm carYears={carYears} yearsSinceFirstMotorcycle={yearsSinceFirstMotorcycle} open={open} handleClose={handleClose} />}
    </>
  );
}
