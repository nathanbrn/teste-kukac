import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface CardProps {
  cep: number;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  ddd: number;
  index: number;
}

export default function BasicCard({
  cep,
  logradouro,
  bairro,
  localidade,
  uf,
  ddd,
  index
}: CardProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          CEP {index + 1}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {cep}
        </Typography>
        <Typography variant="h5" component="div">
          {localidade}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {bairro}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {logradouro}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {uf}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {ddd}
        </Typography>
      </CardContent>
    </Card>
  );
}
