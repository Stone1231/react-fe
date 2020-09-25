import React, { useState } from "react";
import HomeService from "services/HomeService";

export default function IntroducingJSX(props) {
  const [backend, setBackend] = useState("");
  (async () => {
    let res = await HomeService.get();
    setBackend(res.data);
  })();

  return <React.StrictMode>{backend}</React.StrictMode>;
}
