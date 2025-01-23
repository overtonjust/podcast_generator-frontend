// Dependencies
import React from 'react';

const App = () => {
  return (
    <form>
        <h2>Podcast Generator</h2>
        <div>
          <button>Upload Audio</button> 
          <button>Enter Transcript</button>
        </div>
        <textarea name="" id="">Paste your transcript here...</textarea>
        <button type="submit">Generate Podcast</button>
    </form>
  );

};

export default App;