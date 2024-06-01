import { useState } from 'react'

export interface ITextView{
  value?: string
  variable?: string
  name: string
  required?: boolean
  title: string
  onChange?(e: React.FormEvent<HTMLInputElement>): void
}

export default function TextView({ 
  value = '', 
  variable = '', 
  title, 
  name, 
  required = true,
  onChange 
}: ITextView) {
  
  const [inputContent, setContent] = useState(value)
  function updateContent(e: React.FormEvent<HTMLInputElement>){
    setContent(e.currentTarget.value)
    onChange && onChange(e)
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10
    }}>
      <label style={{
        cursor: 'pointer',
        fontWeight: '600', 
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }} 
        htmlFor={variable}
      >
        <span 
          style={{ 
            width: '30%'
          }}>
            {title}
        </span>
        <input
          type="text"
          value={inputContent}
          name={name}
          style={{
            padding: '10px',
            border: `${(required && !inputContent.trim().length) ? '1px solid red' : '1px black solid'}`,
            borderRadius: '5px',
            outline: 'none',
            width: '100%',
          }}
          title={title}
          onChange={(e) => {
            updateContent(e)
          }}
        />
      </label>
    </div>
  )
}