const Component = () => {
  return (
    <div style={{ width: '100%', height: '300px', border: '1px solid' }}>
      123
      <div
        style={{
          width: '80%',
          height: '100px',
          border: '1px solid',
          marginLeft: '50px'
        }}
      >
        <span>span</span>
        123
      </div>
      <a href="#" style={{ marginLeft: '50px' }}>
        123
      </a>
    </div>
  )
}

export default function App(props) {
  console.log('props ==> ', props)
  return (
    <div className="container">
      <Component />
      App
    </div>
  )
}
