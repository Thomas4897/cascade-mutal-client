import NavBar from "./Components/NavBar";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { addUser } from "./features/userSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUser(JSON.parse(localStorage.getItem("user"))));
  }, []);

  return <NavBar />;
}
