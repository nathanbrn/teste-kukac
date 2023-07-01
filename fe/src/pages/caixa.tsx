import CardCaixa from '@/components/cardCaixa';
import BasicModal from '@/components/modal';
import { api } from '@/utils/api';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import ImageCaixa from '../assets/caixa.svg';
import Image from 'next/image';

export default function Caixa() {
  const [ price, setPrice] = useState<number>(0);
  const [ payment, setPayment] = useState<number>(0);
  const [ informations, setInformations] = useState<any>(null);
  const [isError, setIsError] = useState<boolean>(false);

  async function getchangeAmount() {
    try {
      const { data } = await api.post('/payments', {
        price,
        payment
      });

      setInformations({
        price: data.price,
        payment: data.payment,
        change: data.change,
        changeAmount: data.changeAmount
      });
    } catch (err) {
      console.log(err);
      toast.error('Ocorreu um erro ao calcular o troco');
    }
  }

  function handleError() {
    if (price > payment) {
      setIsError(true);
      toast.error('O valor do pagamento deve ser maior que o valor do preço');
    } else {
      setIsError(false);
    }
  }

  function clear() {
    setPrice(0);
    setPayment(0);
    setInformations(null);
  }

  return (
    <>
      <div className='my-4'>
        <Image src={ImageCaixa} width={200} alt='Caixa' />
      </div>

      <BasicModal>
        Você deve preencher os campos abaixo com inicialmente o valor total das suas compras, e após isso, digitar o valor que você irá pagar, para que o sistema calcule o troco e a quantidade de notas que você irá receber.
        <br/>
        <br/>
        <span className='text-blue-600'>
          <AnnouncementIcon />
          Por favor, não utilizar moedas, digitar apenas números inteiros.
          <br/>
          <br/>
          <AnnouncementIcon />
          Notas disponíveis: 100, 10, 1.
        </span>
      </BasicModal>

      <div className='max-w-xl text-justify'>
        <p></p>
      </div>

      <form className='flex flex-col gap-2 my-4'>
        <TextField
          className='text-white'
          id="standard-basic"
          label="Preço"
          variant="standard"
          value={price === 0 ? '' : price}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) {
              setPrice(value);
            }
          }}
        />
        <TextField
          className='text-white'
          id="standard-basic"
          label="Pagamento"
          variant="standard"
          value={payment === 0 ? '' : payment}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) {
              setPayment(value);
            }
          }}
        />

        <Button onClick={() => {
          handleError();
          getchangeAmount();
        }}
        variant="outlined">Calcular</Button>
        <Button onClick={clear} variant="outlined">Limpar</Button>

      </form>

      {informations && !isError ? (
        <CardCaixa
          price={informations.price}
          payment={informations.payment}
          change={informations.change}
          informations={informations}
        />
      ) : (
        <div></div>
      )}
    </>
  );
}
