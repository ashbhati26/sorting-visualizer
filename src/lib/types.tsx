// Defines the possible sorting algorithm types  
export type SortingAlgorithmType =  
  | "bubble" 
  | "insertion"
  | "selection" 
  | "merge" 
  | "quick";  

export type AlgorithmInfo = {  
  title: string;         // Name of the algorithm  
  description: string;   // Brief explanation of the algorithm  
  worstCase: string;     // Worst-case time complexity  
  averageCase: string;   // Average-case time complexity  
  bestCase: string;      // Best-case time complexity  
};  

// Defines an object type that maps each sorting algorithm to its metadata  
export type SortingAlgorithmsData = {  
  [key in SortingAlgorithmType]: AlgorithmInfo;  
};  

// Defines the speed levels for sorting animations  
export type AnimateSpeedType = "slow" | "medium" | "fast" | "lightning";  

// Represents an option in a dropdown/select menu  
export type SelectOptionsType = {  
  label: string; // Display text for the option  
  value: string; // Actual value associated with the option  
};  

// Represents an array of animation steps  
// Each step contains an array of numbers and a boolean flag for state  
export type AnimationArrayType = [number[], boolean][];  
