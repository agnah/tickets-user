import { useForm } from 'react-hook-form'
import Select from '@components/Form/Input/Select'
import { useState, useRef } from 'react'
import InputForm from '@components/Form/Input/InputForm'
import Button from '../partials/Button/Button'
import DatalistChangeInput from '@components/Form/Input/DatalistCangeInput'
import solicitantes from '../../../public/assets/solicitantes.json'
import TextArea from '@components/Form/Input/TextArea'
import { useNavigate } from 'react-router'
import useAuth from '@servicios/UseAuth'
import { areas } from '@constantes/constAreas'
import DragAndDrop from '../Form/dragAndDrop'
import './TicketCreateForm.css'

const REGEX_EMAIL = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/

const optionListSelect = ['CSTIMI', 'GDE', 'Computos', 'CID']
const optionCstimi = ['Soporte', 'Telefonia']
const datalistSolicitante = solicitantes.map(s => s.nombre)

const TicketCreateForm = ({ prioridad }) => {
  const { user } = useAuth()
  const dragAndDropRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const navigate = useNavigate()

  const getFilterResult = (filter) => {
    const { MESA_DE_ENTRADA, CSTIMI } = areas
    const opcionesCompartidas = {
      label: 'Área asignada',
      name: 'area_asignada',
      placeholder: 'Selecciona un área',
      register,
      errors,
      classCol: 'col-md-4 col-lg-4',
      options: {
        required: 'Campo obligatorio'
      },
      classInput: 'area_input'
    }
    if (filter.includes(MESA_DE_ENTRADA)) {
      return (
        <Select
          {...opcionesCompartidas}
          optionList={optionListSelect}
        />
      )
    } else if (filter.includes(CSTIMI)) {
      return (
        <Select
          {...opcionesCompartidas}
          optionList={optionCstimi}
        />
      )
    } else {
      return (
        <label htmlFor="area" className="col-md-4 col-lg-4">
          Sector:
          <p name="area" id="area" className="form-group item-form">
            {filter}
          </p>
        </label>
      )
    }
  }

  const onSubmit = (data) => {
    const dragAndDropData = dragAndDropRef.current.getData()
    const formData = { ...data, dragAndDropData, prioridad }
    console.log('Datos a enviar:', formData)
  }

  const [solicitanteEmail, setSolicitanteEmail] = useState(null)

  const onChangeSolicitante = (e) => {
    const solicitante = e.target.value
    const solicitanteSeleccionado = solicitantes.find(s => s.nombre === solicitante)
    console.log({ solicitante, solicitanteSeleccionado })
    if (solicitanteSeleccionado) setSolicitanteEmail(solicitanteSeleccionado.email)
  }

  const redirectTickets = () => {
    navigate('/tickets')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <div className="row">
        <>
          <DatalistChangeInput
            idList="datalistSolicitante"
            label="Solicitante"
            name="solicitante"
            placeholder=""
            optionList={datalistSolicitante}
            register={register}
            errors={errors}
            classCol="col-md-3 align-items-start datalist-input"
            options={{
              required: 'Campo obligatorio'
            }}
            onChangeSolicitante={onChangeSolicitante}
          />
        </>
        <InputForm
          label="Email"
          type="email"
          name="email"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-4 col-lg-4 form-group item-form"
          inputMode="email"
          options={{
            required: 'Campo obligatorio',
            pattern: {
              value: REGEX_EMAIL,
              message: 'El e-mail tiene que ser valido'
            }
          }}
          value={solicitanteEmail}
        />
        <InputForm
          label="Teléfono"
          type="text"
          name="telefono"
          placeholder=""
          register={register}
          errors={errors}
          classCol="col-md-2 col-lg-2 form-group item-form"
          inputMode="tel"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <InputForm
          label="N° GDE"
          type="text"
          name="gde"
          placeholder=""
          register={register}
          errors={''}
          classCol="col-2 form-group item-form"
        />
      </div>
      <div className="col-12 d-flex justify-content-between">
        <Select
          label="Sede"
          name="sede"
          placeholder="Selecciona una sede"
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-3 align-items-start"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Área"
          name="area"
          placeholder="Selecciona un área"
          optionList={optionListSelect}
          register={register}
          errors={errors}
          classCol="col-md-3 align-items-start"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <Select
          label="Piso"
          name="piso"
          placeholder=""
          optionList={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          register={register}
          errors={errors}
          classCol="col-1 align-items-start"
          options={{
            required: 'Campo obligatorio'
          }}
        />
        <InputForm
          label="Referencia"
          type="text"
          name="referencia"
          placeholder=""
          register={register}
          errors={''}
          classCol="col-5 form-group item-form"
        />
      </div>
      <hr />
      <div className="row">
        <TextArea
          label="Motivo"
          name="motivo"
          rows="20"
          register={register}
          errors={errors}
          classCol="col-6 form-group item-form"
          options={{
            required: 'Campo obligatorio'
          }}
          placeholder="Motivo por el cual precisa asistencia."
        />
        {getFilterResult(user.sector)}
      </div>
      <label className='label-dragAndDrop'>Archivos
        <DragAndDrop
          ref={dragAndDropRef}
          register={register}
          errors={errors}
        />
      </label>
      <div className='d-flex justify-content-end'>
        <Button type="reset" classBoton="btn-action btn-danger" texto="Cancelar" onClick={redirectTickets} />
        <Button type="submit" classBoton="btn-action btn-success" texto="Crear" />
      </div>
    </form>
  )
}

export default TicketCreateForm
