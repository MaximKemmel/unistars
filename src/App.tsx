import { Route, Routes } from "react-router-dom"

import { SignIn } from "./pages/SignIn/SignIn"

import styles from './App.module.sass';

function App() {
  return (
    <section className={styles.wrapper}>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </section>
  )
}

export default App
