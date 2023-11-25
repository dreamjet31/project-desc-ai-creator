import { useState } from 'react';

import { generateText } from '../utils/generateText';
import { PROMPT_EXAMPLE } from '../constants/prompts.constant'
import { infoAlert, successAlert } from './Alert';

interface IModalProps {
  show: boolean;
  onClose: () => void;
  projectInfo: IProject[];
}


const WhitePaperModal: React.FC<IModalProps> = ({ show, onClose, projectInfo }) => {
  const [sectionListItems, setSectionListItems] = useState<string[]>([]); //sections
  const [selectedSectionIdx, setSelectedSectionIdx] = useState<number | null>(null);
  const [selectedSection, setSelectedSection] = useState<string>("");
  const [selectedSectionItem, setSelectedSectionItem] = useState<string>("");

  const [contentListItems, setContentListItems] = useState<any[]>([]); //contents
  const [selectedContentItemIdx, setSelectedContentItemIdx] = useState<number | null>(null);
  const [selectedContent, setSelectedContent] = useState<string[]>([]);
  const [spinner, setSpinner] = useState(false);

  // Initialize wpSectionFlag with false values (length: 10) using useState
  const [wpSectionFlag, setWpSectionFlag] = useState<boolean[]>(new Array(10).fill(false));

  // Initialize wpContentFlag with false values (length: 10x10) using useState
  const [wpContentFlag, setWpContentFlag] = useState<boolean[][]>(
    new Array(10).fill([]).map(() => new Array(10).fill(false))
  );


  let project_id = "";
  if (typeof window !== 'undefined') {
    project_id = window.location.href.split("/project?")[1];
  }

  /**
   * The function `handleSectionClick` toggles the selection of a section item and updates the state
   * accordingly.
   * @param {number} index - The index parameter represents the index of the section that was clicked.
   * It is used to determine which section should be selected or unselected.
   */
  const handleSectionClick = (index: number) => {
    if (wpSectionFlag[index] === true) {
      setSelectedSectionIdx(null); // Unselect the item if it's already selected
      setSelectedSection("");
      setSelectedContent([])
      // Get the current state of wpSectionFlag
      const updatedSectionFlag = [...wpSectionFlag]; // Create a new array copy
      updatedSectionFlag[index] = false;
      setWpSectionFlag(updatedSectionFlag);
    } else {
      setSelectedSectionIdx(index); // Select the clicked item
      setSelectedSection(sectionListItems[index])
      setSelectedContent(contentListItems[index])
      // Get the current state of wpSectionFlag
      const updatedSectionFlag = [...wpSectionFlag]; // Create a new array copy
      updatedSectionFlag[index] = true;
      setWpSectionFlag(updatedSectionFlag);
    }
  };

  /**
   * The function `handleContentItemClick` handles the selection and deselection of content items based
   * on the index provided.
   * @param {number} index - The index parameter represents the index of the content item that was
   * clicked.
   */
  const handleContentItemClick = (index: number) => {
    if (selectedSectionIdx !== null) {
      if (wpContentFlag[selectedSectionIdx][index] == true) {
        setSelectedContentItemIdx(null); // Unselect the item if it's already selected
        setSelectedSectionItem("")
        // Get the current state of wpSectionFlag
        const updatedContentFlag = [...wpContentFlag]; // Create a new array copy
        updatedContentFlag[selectedSectionIdx][index] = false;
        setWpContentFlag(updatedContentFlag);
      } else {
        setSelectedContentItemIdx(index); // Select the clicked item
        setSelectedSectionItem(selectedContent[index])
        // Get the current state of wpSectionFlag
        const updatedContentFlag = [...wpContentFlag]; // Create a new array copy
        updatedContentFlag[selectedSectionIdx][index] = true;
        setWpContentFlag(updatedContentFlag);
      }
    }
  };


  /**
   * The function `saveWhitepaper` saves generated whitepaper data and displays a success message.
   */
  const saveWhitepaper = () => {
    let wpData: string[] = []
    wpData.push(JSON.stringify(wpSectionFlag))
    wpData.push(JSON.stringify(wpContentFlag))
    wpData.push(JSON.stringify(sectionListItems))
    wpData.push(JSON.stringify(contentListItems))
    onClose();
    successAlert("Successfully saved!")
  };

  /**
   * The `init` function initializes various state variables with empty arrays and sets initial values
   * for `wpSectionFlag` and `wpContentFlag`.
   */
  const init = () => {
    setSectionListItems([]);
    setContentListItems([]);
    setSelectedContent([]);
    // Initialize wpSectionFlag with initial values (length: 10) using setWpSectionFlag
    setWpSectionFlag(new Array(10).fill(false));

    // Initialize wpContentFlag with false values (length: 10x10) using setWpContentFlag
    const initialContentFlag = new Array(10).fill([]).map(() => new Array(10).fill(false));
    setWpContentFlag(initialContentFlag);
  }

  // Function to generate the whitepaper
  const generateWhitepaper = () => {
    try {
      if (projectInfo && projectInfo[0]?.title && projectInfo[0]?.description) {
        init();
        const { title, description } = projectInfo[0];
        generateSectCont(title, description)
          .then(handleWhitepaperGenerationSuccess)
          .catch(handleWhitepaperGenerationError);
      }
    } catch (error) {
      console.error("Error generating whitepaper:", error);
    }
  };

  // Function to handle whitepaper generation error
  const handleWhitepaperGenerationError = (error: Error) => {
    infoAlert(`Whitepaper generation failed: ${error.message}`);
  };

  // Function to handle whitepaper generation success
  const handleWhitepaperGenerationSuccess = () => {
    infoAlert(`Whitepaper is generated successfully`);
  };

  /**
   * The function `generateSectCont` takes in a title and description, sends a prompt to generate text
   * using the Gpt API, and then processes the response to update the section and content list items.
   * @param {string} title - A string representing the title of the project.
   * @param {string} description - The `description` parameter is a string that represents the
   * description of a project. It is used in the `generateSectCont` function to generate a prompt for the
   * Gpt API.
   */
  const generateSectCont = async (title: string, description: string) => {
    console.log("calling generateSectCont")
    setSpinner(true)
    let prompt = `The title and description of project are ${title} and ${description}.\n` + PROMPT_EXAMPLE;
    try {
      // send a prompt
      const response: string | null = await generateText(prompt);
      console.log("response", response);



      let result: IResult = { sections: [], contents: [] };

      if (response !== null) {
        let data: Record<string, string[]> = JSON.parse(response);
        if (Object.entries(data).length < 5) throw new Error('The number of entries in "data" is less than 10.');
        Object.entries(data).forEach(([key, value]) => {
          const sectionKey: string = key;
          const sectionValue: string[] = value;

          result.sections.push(sectionKey);
          result.contents.push(sectionValue);

          // Perform operations using the key and value stored in 'sectionKey' and 'sectionValue' respectively
        });
      }
      console.log(result);
      setSectionListItems(result.sections);
      setContentListItems(result.contents);
    } catch (error) {
      infoAlert("Gpt api is not working well. please generate again.")
    }

    setSpinner(false)
  };


  return (
    <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${show ? '' : 'hidden'}`}>
      {/* Darkened overlay */}
      <div className={`fixed inset-0 bg-black opacity-50 ${show ? '' : 'hidden'}`}></div>

      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-8 rounded-md shadow-lg w-3/4">
          <h2 className="text-2xl font-semibold mb-3">Whitepaper Generator</h2>
          {spinner ? (
            <div className="flex items-center justify-center">
              <div className="loader ease-linear rounded-full border-t-8 border-r-8 border-b-8 border-blue-500 h-12 w-12 mr-1 animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {/* First scroll list */}
              <div className="col-span-1 h-80 overflow-y-auto">
                <h3 className="font-semibold mb-2">Section</h3>
                <ul className="overflow-y-auto h-60">
                  {sectionListItems.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleSectionClick(idx)}
                      className={`rounded-md border border-gray-300 px-4 py-2 cursor-pointer transition duration-300 ${wpSectionFlag[idx] === true ? 'bg-blue-500 text-white hover:bg-blue-700' : 'hover:bg-gray-200'}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Second scroll list */}
              <div className="col-span-1 h-80 overflow-y-auto">
                <h3 className="font-semibold mb-2">Content</h3>
                <ul className="overflow-y-auto h-60">
                  {selectedContent.map((item, idx) => (
                    <li
                      key={idx}
                      onClick={() => handleContentItemClick(idx)}
                      className={`rounded-md border border-gray-300 px-4 py-2 cursor-pointer transition duration-300 ${selectedSectionIdx !== null && wpContentFlag[selectedSectionIdx][idx] === true ? 'bg-blue-500 text-white hover:bg-blue-700' : 'hover:bg-gray-200'}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preview component */}
              <div className="col-span-1 h-80 overflow-y-auto">
                <h3 className="font-semibold mb-2">Preview</h3>
                {/* Display content selected in both lists */}
                <div className="overflow-y-auto h-60 border border-gray-300 p-3 ">
                  {wpSectionFlag.map((sectionFlag, i) => {
                    if (sectionFlag) {
                      return (
                        <div key={i}>
                          <h4 style={{ fontWeight: 'bold' }}>{sectionListItems[i]}</h4>
                          {wpContentFlag[i].map((contentFlag, j) => {
                            if (contentFlag) {
                              return <p key={j}>- {contentListItems[i][j]}</p>
                            }
                            return null; // Return null if content flag is false
                          })}
                        </div>
                      );
                    }
                    return null; // Return null if section flag is false
                  })}
                </div>
              </div>
            </div>
          )}
          {/* Buttons */}
          <div className="flex justify-end mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={generateWhitepaper}
            >
              Generate
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={saveWhitepaper}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhitePaperModal;