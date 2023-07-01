import { api } from '@/utils/api';
import { FormLabel } from '@mui/joy';
import { Box, Button, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';

const style = {
  // eslint-disable-next-line @typescript-eslint/prefer-as-const
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #111',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
  carYears: number[];
  yearsSinceFirstMotorcycle: number[];
}

export function ModalForm({ open, handleClose, carYears, yearsSinceFirstMotorcycle }: ModalFormProps) {
  const [type, setType] = useState<string>('carro');
  const [model, setModel] = useState<string>('');
  const [yearMan, setYearMan] = useState<number>(2023);
  const [amountPorts, setAmountPorts] = useState<number>(4);
  const [brand, setBrand] = useState<string>('');
  const [whells, setWhells] = useState<number>(2);
  const [passengers, setPassengers] = useState<number>(1);

  function handleChange(event: SelectChangeEvent) {
    setType(event.target.value as string);
  }

  function handleChangeYears(event: SelectChangeEvent<number>) {
    setYearMan(Number(event.target.value));
  }


  async function createRegister() {
    try {
      if (type === 'carro') {
        await api.post('/vehicles/cars', {
          model,
          yearMan,
          amountPorts,
          brand,
        });
      }

      if (type === 'moto') {
        await api.post('/vehicles/motorbikes', {
          model,
          yearMan,
          brand,
          whells,
          passengers,
        });
      }
    } catch (err) {
      toast.error('Erro ao criar veiculo');
    } finally {
      handleClose();
      clear();
    }
  }

  function clear() {
    setModel('');
    setYearMan(0);
    setAmountPorts(0);
    setBrand('');
    setWhells(0);
    setPassengers(0);
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Criar veiculo
          </Typography>
          <form className='flex flex-col gap-2 my-4'>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Tipo"
              onChange={handleChange}
            >
              <MenuItem value={'carro'}>Carro</MenuItem>
              <MenuItem value={'moto'}>Moto</MenuItem>
            </Select>

            {type === 'carro' && (
              <>
                <TextField id="standard-basic" label="Modelo" variant="standard" value={model} onChange={(e) => setModel(e.target.value)} />
                <div>
                  <FormLabel sx={{ fontSize: 16}}>Ano de fabricação</FormLabel>
                  <Select
                    sx={{ width: '100%' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={yearMan}
                    label="Ano de fabricação"
                    onChange={handleChangeYears}
                  >
                    {carYears.map((year) => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div>
                  <FormLabel sx={{ fontSize: 16}}>Número de portas</FormLabel>
                  <Select
                    sx={{ width: '100%' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={amountPorts}
                    label="Tipo"
                    onChange={(e) => setAmountPorts(Number(e.target.value))}
                  >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                  </Select>
                </div>
                <TextField id="standard-basic" label="Marca" variant="standard" value={brand} onChange={(e) => setBrand(e.target.value)}/>
              </>
            )}

            {type === 'moto' && (
              <>
                <TextField id="standard-basic" label="Modelo" variant="standard" value={model} onChange={(e) => setModel(e.target.value)}/>
                <div>
                  <FormLabel sx={{ fontSize: 16}}>Ano de fabricação</FormLabel>
                  <Select
                    sx={{ width: '100%' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={yearMan}
                    label="Ano de fabricação"
                    onChange={handleChangeYears}
                  >
                    {yearsSinceFirstMotorcycle.map((year) => (
                      <MenuItem key={year} value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </div>
                <TextField id="standard-basic" label="Marca" variant="standard" value={brand} onChange={(e) => setBrand(e.target.value)}/>
                <div>
                  <FormLabel sx={{ fontSize: 16}}>Pneus</FormLabel>
                  <Select
                    sx={{ width: '100%' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={whells}
                    label="Tipo"
                    onChange={(e) => setWhells(Number(e.target.value))}
                  >
                    <MenuItem value={2}>2</MenuItem>
                  </Select>
                </div>
                <div>
                  <FormLabel sx={{ fontSize: 16}}>Passageiros</FormLabel>
                  <Select
                    sx={{ width: '100%' }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={passengers}
                    label="Tipo"
                    onChange={(e) => setPassengers(Number(e.target.value))}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                  </Select>
                </div>
              </>
            )}

            <Button onClick={createRegister} className='mt-2' variant="outlined">Criar</Button>
            <Button onClick={clear} variant="outlined">Limpar</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
