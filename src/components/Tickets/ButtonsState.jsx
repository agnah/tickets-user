import './ButtonsState.css'
import React, { useContext } from 'react'
import Button from '../partials/Button/Button'
import { Link } from 'react-router-dom'
import { FiltrosContext } from '../tabla/contextTabla'

const ButtonsState = ({ valores, user }) => {
  const { pendientes, asignados, curso, totales } = valores
  const { handleSeleccionadosChange, handlePrioridadChange, handleFiltroUserChange } = useContext(FiltrosContext)
  const cambiarSeleccionado = (e) => {
    const value = e.target.value
    value === '' ? handleSeleccionadosChange([]) : handleSeleccionadosChange([value])
    handlePrioridadChange('')
    value === 'marketing' ? handleFiltroUserChange('') : handleFiltroUserChange(user.nombre.toLowerCase())
  }
  return (
    <div class="container">
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-open"
          classIcon=""
          texto="Tickets Nuevos"
          classBadge="badge"
          cantidad={pendientes}
          value="marketing"
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-progress"
          classIcon=""
          texto="Tickets Asignados"
          classBadge="badge"
          cantidad={asignados}
          value='services'
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-pending"
          classIcon=""
          texto="Tickets en Curso"
          classBadge="badge"
          cantidad={curso}
          value="support"
          onClick={cambiarSeleccionado}
        />
      </Link>
      <Link
        to="/tickets">
        <Button
          type=""
          classBoton="btn btn-badge btn-asigned"
          classIcon=""
          texto="Tickets Totales"
          classBadge="badge"
          cantidad={totales}
          value=""
          onClick={cambiarSeleccionado}
        />
      </Link>
    </div>
  )
}

export default ButtonsState
