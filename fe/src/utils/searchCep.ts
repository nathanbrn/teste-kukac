import { api } from '@/utils/api';

export async function searchCEP(cep: string) {
  try {
    const response = await api.get(`https://viacep.com.br/ws/${cep}/json/`);
    const data = response.data;

    if (!data.erro) {
      return { success: true, data };
    } else {
      return { success: false, message: 'CEP não encontrado' };
    }
  } catch (error) {
    return { success: false, message: 'Erro na busca do CEP' };
  }
}
