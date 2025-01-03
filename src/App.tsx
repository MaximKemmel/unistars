import { Route, Routes } from "react-router-dom"

import { Home } from "./pages/Home/Home";
import { SignIn } from "./pages/SignIn/SignIn"

import styles from './App.module.sass';

function App() {
  return (
    <section className={styles.wrapper}>
      <Routes>
        <Route path="/auth" element={<SignIn />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </section>
  )
}

export default App
