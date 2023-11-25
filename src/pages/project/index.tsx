"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import WhitePaperModal from '../../components/WhitePaperModal';
import MarketingContentModal from '../../components/MarketingContentModal';
import axios from 'axios';

const ProjectDetail: React.FC = () => {
  /* check if the `window` object is defined. If it is, it retrieves the `project_id` from the URL by splitting the URL
  string at "/project?" and taking the second part of the split. This is done to extract the project
  ID from the URL query parameters. If the `window` object is not defined, the `project_id` remains an empty string. */
  let project_id = "";
  if (typeof window !== 'undefined') {
    project_id = window.location.href.split("/project?")[1];
  }
  const [showWPModal, setShowWPModal] = useState(false);
  const [showMCModal, setShowMCModal] = useState(false);
  const [projectInfo, setProjectInfo] = useState<IProject[]>([]);

  /* The `useEffect` hook is used to perform side effects in a functional component. In this case, it is
  used to fetch data from an API endpoint when the `project_id` variable changes. */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/supabase/users/" + parseInt(project_id));
        setProjectInfo(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    if (project_id !== "") {
      fetchData();
    }
    
  }, [project_id]);

  const openWPModal = () => {
    setShowWPModal(true);
  };

  const closeWPModal = () => {
    setShowWPModal(false);
  };

  const openMCModal = () => {
    setShowMCModal(true);
  };

  const closeMCModal = () => {
    setShowMCModal(false);
  };

  return (
    <main className='p-24'>
      <Link href="/" className='rounded-[5px] py-2 px-4 bg-[#232353] text-white'>Back</Link>
      <div className="flex min-h-screen flex-col text-left gap-4 mt-[10px]">
        <div className='text-[48px]'>{projectInfo && projectInfo.length > 0 && projectInfo[0]['title']}</div>
        <div>
          <h1 className='text-[32px]'>Description:</h1>
          <div>{projectInfo && projectInfo.length > 0 && projectInfo[0]['description']}</div>
        </div>
        <div>
          <button
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            onClick={openWPModal}
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Create Whitepaper:{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Instantly create your Whitepaper.</p>
          </button>
        </div>
        <div>
          <button
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            onClick={openMCModal}
          >
            <h2 className="mb-3 text-2xl font-semibold">
              Create Marketing Content:{' '}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Instantly create your Marketing Content.</p>
          </button>
        </div>
      </div>
      <WhitePaperModal show={showWPModal} onClose={closeWPModal} projectInfo={projectInfo} />
      <MarketingContentModal show={showMCModal} onClose={closeMCModal} />
    </main>
  );
};

export default ProjectDetail;
