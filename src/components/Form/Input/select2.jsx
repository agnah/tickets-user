import './Select.css'

const Select = (props) => {
  const {
    label,
    name,
    placeholder,
    register,
    errors,
    optionList,
    classCol,
    onChangeInput,
    ...attributes
  } = props

  const isError = errors[name]?.message
  const placeholderText = isError ? errors[name]?.message : placeholder
  const classes = isError ? `${classCol} has-error` : `${classCol}`

  return (
    <div className={`select-container d-flex flex-column ${classes}`}>
      <div className="label-container">
        <label className="label-form" htmlFor={name}>
          {label}
        </label>
      </div>
      <div className="w-100 form-group item-form select-box">
        <select
          name={name}
          {...attributes}
          {...register(name, attributes.options)}
          onChange={onChangeInput}
          className={`detalle-input w-100 ${isError ? 'help-block error error-style w-100' : ''}`}
        >
          <option value="">{placeholderText}</option>
          {optionList.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="select-icon">
          <img
            src="../public/img/caret-down-solid.svg"
            className="fa-solid fa-caret-down"
            alt="caret-down"
          ></img>
        </div>
      </div>
    </div>
  )
}
export default Select
