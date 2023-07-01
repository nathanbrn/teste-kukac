import BasicModal from '@/components/modal';
import { api } from '@/utils/api';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ImagePalindromos from '../assets/palindromos.svg';

export default function Palindromos() {
  const [palindromes, setPalindromes] = useState<string[]>();
  const [ start, setStart] = useState<number>(0);
  const [ end, setEnd] = useState<number>(0);

  async function getPalindromes() {

    if (start > end) {
      toast.error('O valor inicial deve ser menor que o valor final');
      return;
    }

    try {
      const { data } = await api.post('/palindromes', {
        start,
        end
      });

      setPalindromes(data);
    } catch (err) {
      toast.error('Erro ao buscar palíndromos');
    }
  }

  function clear() {
    setStart(0);
    setEnd(0);
    setPalindromes(undefined);
  }


  return (
    <>
      <div className='my-4'>
        <Image src={ImagePalindromos} width={250} alt='palindromos' />
      </div>

      <BasicModal>
      Nos campos seguintes, você poderá digitar dois números para formar um intervalo, o inicial e o final, com isso procuraremos os números palíndromos dentro deste intervalo.<br/> <br/>
        <span className='text-blue-500'><AnnouncementIcon />Por favor, digitar apenas números inteiros.</span>
      </BasicModal>

      <div className='max-w-xl text-justify'>
        <p></p>
      </div>

      <form className='flex flex-col gap-2 my-4'>
        <TextField
          className='text-white'
          id="standard-basic"
          label="Inicial"
          variant="standard"
          value={start === 0 ? '' : start}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) {
              setStart(value);
            }
          }}
        />
        <TextField
          className='text-white'
          id="standard-basic"
          label="Final"
          variant="standard"
          value={end === 0 ? '' : end}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) {
              setEnd(value);
            }
          }}
        />

        <Button onClick={getPalindromes} variant="outlined">Calcular</Button>
        <Button onClick={clear} variant="outlined">Limpar</Button>

      </form>

      {palindromes && (
        <div className='p-2 border w-fit flex flex-col item-center'>
          <h2 className='text-lg text-center font-semibold mt-1 mb-4 text-blue-500'>Palíndromos encontrados:</h2>
          <p>{palindromes.map((num, index) => (
            <Button variant='text' key={index} className='mr-2'>{num}</Button>
          ))}</p>
        </div>
      )}
    </>
  );
}
