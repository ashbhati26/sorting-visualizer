"use client";

import Button from "@/components/Button";
import { Select } from "@/components/Select";
import ShinyText from "@/components/ShinyText";
import { Slider } from "@/components/Slider";
import { useSortingAlgorithmContext } from "@/context/Visulizer";
import { SortingAlgorithmType } from "@/lib/types";
import {
  algorithmOptions,
  generateAnimationArray,
  sortingAlgorithmsData,
} from "@/lib/utils";

export default function Home() {
  const {
    arrayToSort,
    isSorting,
    setAnimationSpeed,
    animationSpeed,
    selectedAlgorithm,
    setSelectedAlgorithm,
    requiresReset,
    resetArrayAndAnimation,
    runAnimation,
  } = useSortingAlgorithmContext();

  // Handle algorithm selection change
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
  };

  // Handle play/reset button click
  const handlePlay = () => {
    if (requiresReset) {
      resetArrayAndAnimation();
      return;
    }
    
    // Generate sorting animation based on the selected algorithm
    generateAnimationArray(
      selectedAlgorithm,
      isSorting,
      arrayToSort,
      runAnimation
    );
  };

  return (
    <main className="absolute top-0 md:py-1 h-screen w-screen z-[-2] bg-[#010101] font-raleway text-lg overflow-hidden">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex flex-col max-w-[1020px] w-full lg:px-0 px-4"
        >
          {/* Header section with title and controls */}
          <div className="h-[66px] relative flex items-center md:justify-between justify-center w-full">
            <ShinyText
              text="Sorting Visualizer"
              disabled={false}
              speed={3}
              className="text-2xl hidden md:flex font-krona"
            />

            {/* Control panel containing slider, select dropdown, and play/reset button */}
            <div className="flex items-center justify-center gap-4 md:p-1 p-2">
              <Slider
                isDisabled={isSorting} // Disable slider when sorting is in progress
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
              <Select
                options={algorithmOptions}
                defaultValue={selectedAlgorithm}
                onChange={handleSelectChange}
                isDisabled={isSorting} // Disable selection when sorting is in progress
              />
              <div
                className="flex items-center justify-center"
                onClick={handlePlay}
              >
                {/* Show Reset button if reset is required, else show Play button */}
                {requiresReset ? (
                  <Button name="Reset" textColor="#d3d3d3" bgColor="#cb0303" />
                ) : (
                  <Button name="Play" textColor="#d3d3d3" bgColor="#cb0303" />
                )}
              </div>
            </div>

            {/* Information section about the selected algorithm */}
            <div className="sm:flex absolute top-[180%] left-0 w-full">
              <div className="flex w-full text-gray-400 p-4 rounded md:border gap-6">
                {/* Algorithm details section */}
                <div className="hidden sm:flex flex-col items-start justify-start w-3/4">
                  <h3 className="text-lg">
                    {sortingAlgorithmsData[selectedAlgorithm].title}
                  </h3>
                  <p className="text-sm text-grey-500 pt-2">
                    {sortingAlgorithmsData[selectedAlgorithm].description}
                  </p>
                </div>

                {/* Time Complexity details */}
                <div className="flex flex-col items-center justify-center w-full md:w-1/4 gap-2">
                  <h3 className="text-lg">Time Complexity</h3>
                  <div className="flex flex-col gap-2">
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Worst Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].worstCase}
                      </span>
                    </p>
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Average Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].averageCase}
                      </span>
                    </p>
                    <p className="flex w-full text-sm text-gray-500">
                      <span className="w-28">Best Case:</span>
                      <span>
                        {sortingAlgorithmsData[selectedAlgorithm].bestCase}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sorting Visualization Area */}
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute md:bottom-[32px] bottom-[28px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {/* Mapping through arrayToSort to render bars for visualization */}
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
