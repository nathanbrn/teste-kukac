import BasicCard from '@/components/card';
import BasicModal from '@/components/modal';
import { api } from '@/utils/api';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Button, Skeleton, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ImageCeps from '../assets/ceps.svg';
import Image from 'next/image';

export default function CEPs() {
  const [cep1, setCep1] = useState<string>('');
  const [cep2, setCep2] = useState<string>('');
  const [cep3, setCep3] = useState<string>('');
  const [cep4, setCep4] = useState<string>('');
  const [cep5, setCep5] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [informations, setInformations] = useState<any>(null);

  const [cep1Valid, setCep1Valid] = useState<boolean>(true);
  const [cep2Valid, setCep2Valid] = useState<boolean>(true);
  const [cep3Valid, setCep3Valid] = useState<boolean>(true);
  const [cep4Valid, setCep4Valid] = useState<boolean>(true);
  const [cep5Valid, setCep5Valid] = useState<boolean>(true);

  async function getCeps() {
    setIsLoading(true);

    try {
      const ceps = [cep1, cep2, cep3, cep4, cep5];
      const validCeps = ceps.filter(validateCep);

      const { data } = await api.post('/ceps', {
        ceps: validCeps.map(Number),
      });

      setInformations(data);
    } catch (err) {
      toast.error('Erro ao buscar CEPs, eles precisam estar preenchidos da forma correta, siga as instruções em "MAIS INFORMAÇÕES".');
    } finally {
      setIsLoading(false);
    }
  }

  function clear() {
    setCep1('');
    setCep2('');
    setCep3('');
    setCep4('');
    setCep5('');
    setInformations(null);
    setCep1Valid(true);
    setCep2Valid(true);
    setCep3Valid(true);
    setCep4Valid(true);
    setCep5Valid(true);
  }

  function validateCep(cep: string) {
    const cepRegex = /^[0-9]{8}$/;

    return cepRegex.test(cep);
  }

  function handleCep1Change(value: string) {
    setCep1(value);
    setCep1Valid(validateCep(value));
  }

  function handleCep2Change(value: string) {
    setCep2(value);
    setCep2Valid(validateCep(value));
  }

  function handleCep3Change(value: string) {
    setCep3(value);
    setCep3Valid(validateCep(value));
  }

  function handleCep4Change(value: string) {
    setCep4(value);
    setCep4Valid(validateCep(value));
  }

  function handleCep5Change(value: string) {
    setCep5(value);
    setCep5Valid(validateCep(value));
  }

  return (
    <>
      <div className='my-4'>
        <Image src={ImageCeps} alt='CEPs' />
      </div>

      <BasicModal>
        Você deve preencher os 5 campos de CEPs abaixo para que o sistema possa mostrar informações sobre cada um deles.
        <br />
        <br />
        <br />
        <span className='text-blue-600'>
          <AnnouncementIcon /> Os 5 CEPs devem ser informados.
          <br />
          <AnnouncementIcon /> Apenas o CEP válido será considerado.
          <br />
          <AnnouncementIcon /> Apenas números inteiros, sem caracteres especiais.
          <br />
          <AnnouncementIcon /> CEPs sem informações, serão criados com um CARD vazio.
        </span>
      </BasicModal>

      <div className='max-w-xl text-justify'>
        <p></p>
      </div>

      <form className='flex flex-col gap-2 my-4'>
        <TextField
          id='standard-basic'
          label='Cep 1'
          variant='standard'
          value={cep1}
          onChange={(e) => handleCep1Change(e.target.value)}
          error={!cep1Valid}
          helperText={!cep1Valid && 'CEP inválido'}
        />
        <TextField
          id='standard-basic'
          label='Cep 2'
          variant='standard'
          value={cep2}
          onChange={(e) => handleCep2Change(e.target.value)}
          error={!cep2Valid}
          helperText={!cep2Valid && 'CEP inválido'}
        />
        <TextField
          id='standard-basic'
          label='Cep 3'
          variant='standard'
          value={cep3}
          onChange={(e) => handleCep3Change(e.target.value)}
          error={!cep3Valid}
          helperText={!cep3Valid && 'CEP inválido'}
        />
        <TextField
          id='standard-basic'
          label='Cep 4'
          variant='standard'
          value={cep4}
          onChange={(e) => handleCep4Change(e.target.value)}
          error={!cep4Valid}
          helperText={!cep4Valid && 'CEP inválido'}
        />
        <TextField
          id='standard-basic'
          label='Cep 5'
          variant='standard'
          value={cep5}
          onChange={(e) => handleCep5Change(e.target.value)}
          error={!cep5Valid}
          helperText={!cep5Valid && 'CEP inválido'}
        />

        <Button onClick={getCeps} variant='outlined'>
          Buscar
        </Button>
        <Button onClick={clear} variant='outlined'>
          Limpar
        </Button>
      </form>

      {isLoading && (
        <div className='flex gap-4 flex-wrap'>
          <Skeleton variant='rectangular' width={210} height={118} />
          <Skeleton variant='rectangular' width={210} height={118} />
          <Skeleton variant='rectangular' width={210} height={118} />
          <Skeleton variant='rectangular' width={210} height={118} />
          <Skeleton variant='rectangular' width={210} height={118} />
        </div>
      )}

      <div className='flex gap-4 flex-wrap'>
        {informations &&
          informations.map((cep: any, index: number) => (
            <BasicCard
              index={index}
              key={index}
              cep={cep.cep}
              logradouro={cep.logradouro}
              bairro={cep.bairro}
              localidade={cep.localidade}
              uf={cep.uf}
              ddd={cep.ddd}
            />
          ))}
      </div>
    </>
  );
}
