import { useState } from 'react'
import './css/DeliveryChecker.css'

export default function DeliveryChecker({ delivery, setDelivery }) {
  const [cep, setCep] = useState('')
  const [error, setError] = useState(null)

  const checkCep = async () => {
    if (cep.length !== 8) {
      setError('CEP deve ter 8 dígitos numéricos.')
      return
    }
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      const data = await res.json()
      if (data.erro) {
        setError('CEP inválido.')
        setDelivery(null)
      } else {
        setError(null)
        setDelivery(data)
      }
    } catch {
      setError('Erro ao consultar o CEP.')
    }
  }

  return (
    <div className="mt-6">
      <label className="font-semibold block mb-1">Consultar Frete</label>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Digite o CEP"
          value={cep}
          onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
          maxLength={8}
          className="p-2 border rounded w-40"
        />
        <button
          onClick={checkCep}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Verificar
        </button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      {delivery && (
        <div className="mt-2 text-sm text-gray-700">
          {delivery.logradouro}, {delivery.bairro}, {delivery.localidade} - {delivery.uf}
        </div>
      )}
    </div>
  )
}