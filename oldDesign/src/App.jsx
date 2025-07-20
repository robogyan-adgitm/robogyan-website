import { useState } from 'react'
import './App.css'
import Header from './components/header';
import AluminiCard from './components/alumini';
import EventCardModal from './components/eventCardModal';
import EventCard from "./components/eventCard";
import Footer from './components/footer';
import ProjectCard from "./components/footer";

function App() {

  return (

    <>
      <AluminiCard />
      <EventCardModal />
      <EventCard/>
      <Header />
      <Footer />
      <ProjectCard/>
    </>

  );
}

export default App
