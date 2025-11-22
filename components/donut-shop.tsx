'use client'

import React, { useState } from 'react'

interface Donut {
  id: number
  name: string
  price: string
}

export default function DonutShop() {
  const [selectedDonut, setSelectedDonut] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const donuts: Donut[] = [
    { id: 1, name: 'Choco Donut', price: '50 BS' },
    { id: 2, name: 'Fresa Donut', price: '45 BS' },
    { id: 3, name: 'Vainilla Donut', price: '40 BS' },
  ]

  // Handler con tipo explícito
  const handleSelectDonut = (id: number) => {
    const donut = donuts.find(d => d.id === id)
    if (donut) setSelectedDonut(donut.name)
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tienda de Donitas</h2>

      {/* Select accesible */}
      <label htmlFor="donut-select" className="block mb-2 font-semibold">
        Selecciona tu donut:
      </label>
      <select
        id="donut-select"
        value={selectedDonut ?? ''}
        onChange={(e) => setSelectedDonut(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="" disabled>-- Elige una opción --</option>
        {donuts.map(d => (
          <option key={d.id} value={d.name}>
            {d.name} - {d.price}
          </option>
        ))}
      </select>

      <label htmlFor="quantity" className="block mb-2 font-semibold">
        Cantidad:
      </label>
      <input
        type="number"
        id="quantity"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        onClick={() => {
          if (selectedDonut) {
            alert(`Ordenaste ${quantity} ${selectedDonut}(s)`)
          } else {
            alert('Selecciona un donut primero')
          }
        }}
        className="w-full bg-primary text-white font-bold py-2 rounded hover:bg-pink-500 transition-colors"
      >
        Ordenar
      </button>
    </div>
  )
}
