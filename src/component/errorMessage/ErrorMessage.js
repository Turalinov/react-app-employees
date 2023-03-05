import img from './error.gif';

const ErrorMessage = () => {
  return (
    <img src={img}
         style={{
          display: "block",
          width: "250px",
          height: "250px",
          objectFit: "contain",
          margin: "30px auto",
         }}
         alt="error" />
  )
}

export default ErrorMessage;