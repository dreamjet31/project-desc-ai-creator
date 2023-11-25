"use client"
import { useState, useEffect } from 'react';
import LogoCreateModal from '../components/LogoCreateModal';
import ProjectsListTable from '@/components/ProjectsListTable';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

const columns = ['id', 'title', 'description', 'logoUrl'];

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [projectList, setProjectList] = useState<IProject[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * The function fetchData is an asynchronous function that fetches data from a specified API endpoint
   * and sets the project list state with the retrieved data.
   */
  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/supabase/users");
      if (data) {
        setProjectList(data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <button
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          onClick={() => {
            openModal()
          }}
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Create{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Instantly create your project title and description.</p>
        </button>
      </div>

      <ProjectsListTable projectList={projectList} setProjectList={setProjectList} columns={columns} />
      {
        showModal &&
        <LogoCreateModal show={showModal} onClose={() => {
          closeModal();
          fetchData()
        }}
        />
      }
      <Toaster />
    </main>
  );
};


export default Home;
