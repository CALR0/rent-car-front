import { useNavigate } from "react-router-dom";


export function MyButton({option}) {
  const navigate = useNavigate()

  const key = option


  function rentHandler(event) {
    switch (key) {
      case "1":
        navigate("/car-rent")
        break;
    
      default:
        navigate("/")
        break;
    }
  }

  const name = option === "1" ? "Rent a Car" :  option === "2" ? "Aceptar" : "Confirmar";

  return (
    <button type={option === "2" ? "submit" : "button"} onClick={option !== "2" ? rentHandler : undefined}> { name } </button>
  );
}