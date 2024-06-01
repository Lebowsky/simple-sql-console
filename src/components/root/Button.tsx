interface ButtonProps {
  children: React.ReactNode
  onClick?(): void
  btnType?: string
}

export default function Button({ children, onClick, btnType }: ButtonProps) {
  const style = {
    background: "linear-gradient(-45deg, #21B9E1, #E71F53, #FBAF2E)",
    border: "none",
    padding: '10px 20px',
    borderRadius: '300px',
    cursor: 'pointer',
    fontWeight: 500,
    margin: '1px 5px',
    color: '#fff',
  }

  return (
    <button style={style} onClick={onClick} type="submit">
      {children}
    </button>
  )
}

interface ButtonGroupProps {
  children: React.ReactNode
}
export function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div style={{ marginBottom: '10px' }}>{children}</div>
  )
}